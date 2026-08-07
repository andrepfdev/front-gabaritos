<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { Plan } from '@/types/domain'
import { highlightInstallmentPrice } from '@/utils/highlightInstallmentPrice'

const props = defineProps<{
  plan: Plan
  loading?: boolean
  isCurrent?: boolean
  recommended?: boolean
}>()

const emit = defineEmits<{ subscribe: [planId: string] }>()

const intervalLabels: Record<string, string> = {
  MONTHLY: 'mês',
  SEMIANNUAL: 'semestre',
  YEARLY: 'ano',
  BIENNIAL: '2 anos',
}

const intervalIcons: Record<string, string> = {
  MONTHLY: 'pi pi-calendar',
  SEMIANNUAL: 'pi pi-calendar-clock',
  YEARLY: 'pi pi-calendar-plus',
  BIENNIAL: 'pi pi-verified',
}

const intervalLabel = computed(() => {
  const interval = props.plan.interval
  if (!interval) return null
  return intervalLabels[interval] ?? interval.toLowerCase()
})

const intervalIcon = computed(() => intervalIcons[props.plan.interval ?? ''] ?? 'pi pi-calendar')

const descriptionHtml = computed(() => (props.plan.description ? highlightInstallmentPrice(props.plan.description) : ''))

function formatPrice(price: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(price)
}
</script>

<template>
  <article class="plan-card gab-card" :class="{ 'plan-card--recommended': recommended }">
    <div v-if="isCurrent || recommended" class="plan-card__badge-row">
      <Tag v-if="isCurrent" value="Seu plano atual" severity="success" />
      <span v-else-if="recommended" class="gab-pill-badge plan-card__recommended-badge">
        <i class="pi pi-star-fill" aria-hidden="true" />
        Mais vantajoso
      </span>
    </div>

    <div class="plan-card__icon" aria-hidden="true"><i :class="intervalIcon" /></div>

    <h3 class="plan-card__name">{{ plan.name }}</h3>

    <p class="plan-card__price">
      {{ formatPrice(plan.price, plan.currency) }}
      <span v-if="intervalLabel" class="plan-card__interval">/{{ intervalLabel }}</span>
    </p>

    <p v-if="plan.description" class="plan-card__description" v-html="descriptionHtml" />

    <div class="plan-card__spacer" />

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
  height: 100%;
  border: 1px solid transparent;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.plan-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.plan-card--recommended {
  border-color: var(--gab-accent);
}

.plan-card__icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: var(--gab-accent-soft);
  color: var(--gab-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.plan-card__badge-row {
  /* Flutua sobre a borda de cima do card, em vez de ocupar espaço no fluxo
     normal — assim todo card começa no mesmo lugar (ícone), com ou sem
     badge, e o selo vira um "ribbon" sobre a borda. */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 1;
}

.plan-card__recommended-badge {
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
}

.plan-card__recommended-badge i {
  font-size: 0.7rem;
}

.plan-card__name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.plan-card__price {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0.2rem 0 0;
}

.plan-card__interval {
  font-size: 1rem;
  font-weight: 500;
  color: var(--gab-text-muted);
}

.plan-card__description {
  color: var(--gab-text-muted);
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.45;
}

.plan-card__spacer {
  flex: 1;
  min-height: 0.5rem;
}

.plan-card__cta {
  width: 100%;
}
</style>
