import { apiFetch } from './httpClient'
import type { Plan } from '@/types/domain'

export const plansService = {
  listPlans() {
    return apiFetch<Plan[]>('/plans', { auth: false })
  },
}
