import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import { usersService } from '@/services/usersService'
import type { User } from '@/types/domain'

const ACCESS_TOKEN_KEY = 'gabaritos_access_token'
const REFRESH_TOKEN_KEY = 'gabaritos_refresh_token'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const status = ref<'idle' | 'loading' | 'error'>('idle')
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)
  const userId = computed(() => user.value?.id ?? null)

  function setTokens(tokens: { accessToken: string; refreshToken: string }) {
    accessToken.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
  }

  function clearTokens() {
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  /** Lê tokens salvos e tenta recarregar o usuário. Deve rodar antes do app montar. */
  async function hydrate() {
    const savedAccess = localStorage.getItem(ACCESS_TOKEN_KEY)
    const savedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!savedAccess || !savedRefresh) return
    accessToken.value = savedAccess
    refreshToken.value = savedRefresh
    try {
      await fetchMe()
    } catch {
      // apiFetch já tenta refresh em 401; se ainda assim falhar, apenas desloga
      clearTokens()
      user.value = null
    }
  }

  async function login(email: string, password: string) {
    status.value = 'loading'
    error.value = null
    try {
      const tokens = await authService.login({ email, password })
      setTokens(tokens)
      await fetchMe()
      status.value = 'idle'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e.message : 'Falha ao entrar'
      throw e
    }
  }

  async function register(name: string, email: string, password: string) {
    status.value = 'loading'
    error.value = null
    try {
      const res = await authService.register({ name, email, password })
      setTokens(res)
      user.value = res.user
      status.value = 'idle'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e.message : 'Falha ao registrar'
      throw e
    }
  }

  async function forgotPassword(email: string) {
    await authService.forgotPassword({ email })
  }

  async function fetchMe() {
    user.value = await usersService.getMe()
  }

  async function updateProfile(partial: { name?: string }) {
    user.value = await usersService.updateMe(partial)
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    await usersService.changePassword({ currentPassword, newPassword })
  }

  async function refreshTokens() {
    if (!refreshToken.value) throw new Error('Sem refresh token disponível')
    const tokens = await authService.refresh({ refreshToken: refreshToken.value })
    setTokens(tokens)
  }

  function logout() {
    clearTokens()
    user.value = null
    status.value = 'idle'
    error.value = null
  }

  return {
    user,
    accessToken,
    refreshToken,
    status,
    error,
    isAuthenticated,
    userId,
    hydrate,
    login,
    register,
    forgotPassword,
    fetchMe,
    updateProfile,
    changePassword,
    refreshTokens,
    logout,
  }
})
