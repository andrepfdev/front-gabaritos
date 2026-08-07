<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { BillingSnapshot } from '@/types/domain'
import { subscriptionStatusLabel } from '@/utils/statusLabels'

const props = defineProps<{
  billing: BillingSnapshot
  cancelLoading?: boolean
}>()

const emit = defineEmits<{ cancel: []; refresh: [] }>()

const planName = computed(() => {
  const planId = props.billing.subscription?.planId
  if (!planId) return null
  return props.billing.plans.find((plan) => plan.id === planId)?.name ?? planId
})

const statusLabel = computed(() => {
  const status = props.billing.subscription?.status
  return status ? subscriptionStatusLabel(status) : null
})

const headerTag = computed(() => {
  const subscription = props.billing.subscription
  if (!subscription) return { value: 'Sem assinatura', severity: 'secondary' as const }
  if (props.billing.isActive) return { value: 'Ativa', severity: 'success' as const }
  if (subscription.status.toUpperCase() === 'PENDING') {
    return { value: 'Pagamento pendente', severity: 'warn' as const }
  }
  return { value: 'Inativa', severity: 'warn' as const }
})
</script>

<template>
  <section class="gab-card status-card">
    <div class="status-card__header">
      <h2>Sua assinatura</h2>
      <Tag :value="headerTag.value" :severity="headerTag.severity" />
    </div>

    <p v-if="billing.subscription" class="status-card__plan">
      Plano: <strong>{{ planName }}</strong> &middot; status: {{ statusLabel }}
    </p>
    <p v-else class="status-card__empty">Você ainda não tem uma assinatura.</p>

    <div class="status-card__actions">
      <Button label="Atualizar status" severity="secondary" outlined @click="emit('refresh')" />
      <Button
        v-if="billing.isActive"
        label="Cancelar assinatura"
        severity="danger"
        outlined
        :loading="cancelLoading"
        @click="emit('cancel')"
      />
    </div>
  </section>
</template>

<style scoped>
.status-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.status-card__header h2 {
  margin: 0;
  font-size: 1.15rem;
}

.status-card__plan,
.status-card__empty {
  color: var(--gab-text-muted);
  margin: 0;
}

.status-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
