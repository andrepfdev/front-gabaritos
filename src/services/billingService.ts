import { apiFetch } from './httpClient'
import type { SubscribeBillingRequest, SubscribeBillingResponse } from '@/types/api'
import type { BillingSnapshot } from '@/types/domain'

export const billingService = {
  getBilling(userId: string) {
    return apiFetch<BillingSnapshot>(`/billing/${userId}`)
  },
  subscribeBilling(userId: string, data: SubscribeBillingRequest) {
    return apiFetch<SubscribeBillingResponse>(`/billing/${userId}/subscribe`, { method: 'POST', body: data })
  },
}
