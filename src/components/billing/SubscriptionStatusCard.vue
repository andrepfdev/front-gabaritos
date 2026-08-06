<script setup lang="ts">
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { BillingSnapshot } from '@/types/domain'

defineProps<{
  billing: BillingSnapshot
  cancelLoading?: boolean
}>()

const emit = defineEmits<{ cancel: []; refresh: [] }>()
</script>

<template>
  <section class="gab-card status-card">
    <div class="status-card__header">
      <h2>Sua assinatura</h2>
      <Tag :value="billing.isActive ? 'Ativa' : 'Inativa'" :severity="billing.isActive ? 'success' : 'warn'" />
    </div>

    <p v-if="billing.subscription" class="status-card__plan">
      Plano: <strong>{{ billing.subscription.planId }}</strong> &middot; status:
      {{ billing.subscription.status }}
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
