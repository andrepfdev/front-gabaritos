import { apiFetch } from './httpClient'
import type { CreateSubscriptionRequest, CreateSubscriptionResponse } from '@/types/api'
import type { Subscription } from '@/types/domain'

export const subscriptionsService = {
  createSubscription(data: CreateSubscriptionRequest) {
    return apiFetch<CreateSubscriptionResponse>('/subscriptions', { method: 'POST', body: data })
  },
  getMySubscription() {
    return apiFetch<Subscription>('/subscriptions/me')
  },
  cancelMySubscription() {
    return apiFetch<void>('/subscriptions/me', { method: 'DELETE' })
  },
}
