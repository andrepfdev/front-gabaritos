<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import SubscriptionStatusCard from '@/components/billing/SubscriptionStatusCard.vue'
import PaymentHistoryList from '@/components/billing/PaymentHistoryList.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import FormError from '@/components/common/FormError.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { useAuthStore } from '@/stores/auth'
import { useBillingStore } from '@/stores/billing'
import { useToastFeedback } from '@/composables/useToastFeedback'

const props = defineProps<{ userId: string }>()

const authStore = useAuthStore()
const billingStore = useBillingStore()
const confirm = useConfirm()
const toast = useToastFeedback()

const cancelLoading = ref(false)

async function loadBilling() {
  await billingStore.fetchBilling(props.userId)
  await billingStore.fetchPayments().catch(() => undefined)
}

onMounted(async () => {
  await loadBilling().catch(() => undefined)

  // Retorno recente de checkout Stripe: o webhook pode levar alguns instantes.
  // Faz 1 retry automático se a assinatura ainda não aparecer ativa.
  if (billingStore.billing && !billingStore.billing.isActive) {
    setTimeout(() => {
      loadBilling().catch(() => undefined)
    }, 2000)
  }
})

function confirmCancel() {
  confirm.require({
    message: 'Tem certeza que deseja cancelar sua assinatura?',
    header: 'Cancelar assinatura',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim, cancelar',
    rejectLabel: 'Voltar',
    accept: async () => {
      cancelLoading.value = true
      try {
        await billingStore.cancelSubscription(props.userId)
        toast.success('Assinatura cancelada.')
      } catch (e) {
        toast.fail(e instanceof Error ? e.message : 'Não foi possível cancelar')
      } finally {
        cancelLoading.value = false
      }
    },
  })
}
</script>

<template>
  <main class="gab-container gab-page account-page">
    <div class="account-page__identity">
      <UserAvatar :name="authStore.user?.name" />
      <div>
        <h1>Olá, {{ authStore.user?.name ?? 'de novo' }}</h1>
        <p v-if="authStore.user?.email" class="account-page__email">{{ authStore.user.email }}</p>
      </div>
    </div>

    <LoadingState v-if="billingStore.status === 'loading' && !billingStore.billing" label="Carregando sua conta…" />
    <FormError v-else-if="billingStore.status === 'error'" :message="billingStore.error" />

    <template v-else-if="billingStore.billing">
      <SubscriptionStatusCard
        :billing="billingStore.billing"
        :cancel-loading="cancelLoading"
        @cancel="confirmCancel"
        @refresh="loadBilling"
      />

      <PaymentHistoryList :payments="billingStore.payments" />
    </template>
  </main>
</template>

<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.account-page__identity {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.account-page__identity h1 {
  margin: 0;
}

.account-page__email {
  margin: 0.15rem 0 0;
  color: var(--gab-text-muted);
  font-size: 0.9rem;
}
</style>
