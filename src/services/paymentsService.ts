import { apiFetch } from './httpClient'
import type { Payment } from '@/types/domain'

export const paymentsService = {
  getMyPayments() {
    return apiFetch<Payment[]>('/payments/me')
  },
}
