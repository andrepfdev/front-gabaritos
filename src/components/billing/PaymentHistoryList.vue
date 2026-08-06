<script setup lang="ts">
import Tag from 'primevue/tag'
import type { Payment } from '@/types/domain'
import { paymentStatusLabel } from '@/utils/statusLabels'

defineProps<{ payments: Payment[] }>()

function formatPrice(amount: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(amount)
}

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(iso))
}

function statusSeverity(status: string) {
  const normalized = status.toLowerCase()
  if (['paid', 'succeeded', 'active'].includes(normalized)) return 'success'
  if (['failed', 'canceled'].includes(normalized)) return 'danger'
  return 'warn'
}
</script>

<template>
  <section>
    <h2 class="payment-history__title">Histórico de pagamentos</h2>

    <p v-if="payments.length === 0" class="payment-history__empty">
      Nenhum pagamento por aqui ainda.
    </p>

    <div v-else class="gab-grid gab-grid--2 payment-history__grid">
      <article v-for="payment in payments" :key="payment.id" class="gab-card payment-history__item">
        <div class="payment-history__row">
          <span class="payment-history__amount">{{ formatPrice(payment.amount, payment.currency) }}</span>
          <Tag :value="paymentStatusLabel(payment.status)" :severity="statusSeverity(payment.status)" />
        </div>
        <span v-if="payment.createdAt" class="payment-history__date">{{ formatDate(payment.createdAt) }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.payment-history__title {
  font-size: 1.15rem;
  margin: 0 0 1rem;
}

.payment-history__empty {
  color: var(--gab-text-muted);
}

.payment-history__item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.payment-history__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.payment-history__amount {
  font-weight: 700;
  font-size: 1.05rem;
}

.payment-history__date {
  color: var(--gab-text-muted);
  font-size: 0.85rem;
}
</style>
