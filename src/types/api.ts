import type { User } from './domain'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse extends AuthTokens {
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RefreshRequest {
  refreshToken: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface UpdateProfileRequest {
  name?: string
}

export interface CreateSubscriptionRequest {
  planId: string
}

export interface CreateSubscriptionResponse {
  subscriptionId: string
}

export interface SubscribeBillingRequest {
  planId: string
  returnUrl: string
}

export interface SubscribeBillingResponse {
  subscriptionId: string
  url: string
}

export interface ApiErrorBody {
  message?: string
  error?: string
  [key: string]: unknown
}
