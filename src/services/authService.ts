import { apiFetch } from './httpClient'
import type {
  AuthTokens,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshRequest,
  RegisterRequest,
  RegisterResponse,
} from '@/types/api'

export const authService = {
  register(data: RegisterRequest) {
    return apiFetch<RegisterResponse>('/auth/register', { method: 'POST', body: data, auth: false })
  },
  login(data: LoginRequest) {
    return apiFetch<AuthTokens>('/auth/login', { method: 'POST', body: data, auth: false })
  },
  refresh(data: RefreshRequest) {
    return apiFetch<AuthTokens>('/auth/refresh', { method: 'POST', body: data, auth: false })
  },
  forgotPassword(data: ForgotPasswordRequest) {
    return apiFetch<void>('/auth/forgot-password', { method: 'POST', body: data, auth: false })
  },
}
