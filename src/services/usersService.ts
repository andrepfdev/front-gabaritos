import { apiFetch } from './httpClient'
import type { ChangePasswordRequest, UpdateProfileRequest } from '@/types/api'
import type { User } from '@/types/domain'

export const usersService = {
  getMe() {
    return apiFetch<User>('/users/me')
  },
  updateMe(data: UpdateProfileRequest) {
    return apiFetch<User>('/users/me', { method: 'PATCH', body: data })
  },
  changePassword(data: ChangePasswordRequest) {
    return apiFetch<void>('/users/me/password', { method: 'POST', body: data })
  },
}
