import { useAuthStore } from '@/stores/auth'
import type { ApiErrorBody } from '@/types/api'

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(status: number, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  /** Envia Authorization: Bearer <token>. Default true. */
  auth?: boolean
  /** Uso interno: evita loop infinito de refresh. */
  _retry?: boolean
}

let refreshPromise: Promise<boolean> | null = null

async function parseBody(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) return undefined
  const text = await res.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true, _retry = false } = options
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const authStore = useAuthStore()

  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth && authStore.accessToken) {
    headers.Authorization = `Bearer ${authStore.accessToken}`
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401 && auth && !_retry) {
    const refreshed = await runSharedRefresh(authStore)
    if (refreshed) {
      return apiFetch<T>(path, { ...options, _retry: true })
    }
    authStore.logout()
  }

  const parsed = await parseBody(res)

  if (!res.ok) {
    const errorBody = parsed as ApiErrorBody | undefined
    const message = errorBody?.message ?? errorBody?.error ?? `Erro na requisição (${res.status})`
    throw new ApiError(res.status, message, parsed)
  }

  return parsed as T
}

function runSharedRefresh(authStore: ReturnType<typeof useAuthStore>): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = authStore
      .refreshTokens()
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}
