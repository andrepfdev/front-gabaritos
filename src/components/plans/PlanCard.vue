<script setup lang="ts">
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { Plan } from '@/types/domain'

defineProps<{
  plan: Plan
  loading?: boolean
  isCurrent?: boolean
}>()

const emit = defineEmits<{ subscribe: [planId: string] }>()

function formatPrice(price: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(price)
}
</script>

<template>
  <article class="plan-card gab-card">
    <Tag v-if="isCurrent" value="Seu plano atual" severity="success" class="plan-card__badge" />
    <h3 class="plan-card__name">{{ plan.name }}</h3>
    <p v-if="plan.description" class="plan-card__description">{{ plan.description }}</p>
    <p class="plan-card__price">
      {{ formatPrice(plan.price, plan.currency) }}
      <span v-if="plan.interval" class="plan-card__interval">/{{ plan.interval }}</span>
    </p>
    <Button
      :label="isCurrent ? 'Plano ativo' : 'Assinar'"
      class="plan-card__cta"
      :disabled="isCurrent"
      :loading="loading"
      @click="emit('subscribe', plan.id)"
    />
  </article>
</template>

<style scoped>
.plan-card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
}

.plan-card__badge {
  align-self: flex-start;
}

.plan-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.plan-card__description {
  color: var(--gab-text-muted);
  margin: 0;
  font-size: 0.95rem;
}

.plan-card__price {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0.4rem 0;
}

.plan-card__interval {
  font-size: 1rem;
  font-weight: 500;
  color: var(--gab-text-muted);
}

.plan-card__cta {
  width: 100%;
  margin-top: 0.5rem;
}
</style>
