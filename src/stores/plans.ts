import { ref } from 'vue'
import { defineStore } from 'pinia'
import { plansService } from '@/services/plansService'
import type { Plan } from '@/types/domain'

export const usePlansStore = defineStore('plans', () => {
  const plans = ref<Plan[]>([])
  const status = ref<'idle' | 'loading' | 'error'>('idle')
  const error = ref<string | null>(null)

  async function fetchPlans(force = false) {
    if (!force && plans.value.length > 0) return
    status.value = 'loading'
    error.value = null
    try {
      plans.value = await plansService.listPlans()
      status.value = 'idle'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e.message : 'Falha ao carregar planos'
      throw e
    }
  }

  return { plans, status, error, fetchPlans }
})
