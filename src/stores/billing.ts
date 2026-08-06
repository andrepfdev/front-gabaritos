import { ref } from 'vue'
import { defineStore } from 'pinia'
import { billingService } from '@/services/billingService'
import { subscriptionsService } from '@/services/subscriptionsService'
import { paymentsService } from '@/services/paymentsService'
import type { BillingSnapshot, Payment } from '@/types/domain'

export const useBillingStore = defineStore('billing', () => {
  const billing = ref<BillingSnapshot | null>(null)
  const payments = ref<Payment[]>([])
  const status = ref<'idle' | 'loading' | 'error'>('idle')
  const error = ref<string | null>(null)

  async function fetchBilling(userId: string) {
    status.value = 'loading'
    error.value = null
    try {
      billing.value = await billingService.getBilling(userId)
      status.value = 'idle'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e.message : 'Falha ao carregar assinatura'
      throw e
    }
  }

  /** Retorna {subscriptionId, url}; quem chama decide o redirect. */
  async function subscribe(userId: string, planId: string, returnUrl: string) {
    return billingService.subscribeBilling(userId, { planId, returnUrl })
  }

  async function cancelSubscription(userId: string) {
    await subscriptionsService.cancelMySubscription()
    await fetchBilling(userId)
  }

  async function fetchPayments() {
    payments.value = await paymentsService.getMyPayments()
  }

  return { billing, payments, status, error, fetchBilling, subscribe, cancelSubscription, fetchPayments }
})
