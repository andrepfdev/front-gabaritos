<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import type { Plan } from '@/types/domain'
import { highlightInstallmentPrice } from '@/utils/highlightInstallmentPrice'

const props = defineProps<{
  plan: Plan
  loading?: boolean
  isCurrent?: boolean
}>()

const emit = defineEmits<{ subscribe: [planId: string] }>()

const descriptionHtml = computed(() => (props.plan.description ? highlightInstallmentPrice(props.plan.description) : ''))

function formatPrice(price: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(price)
}
</script>

<template>
  <article class="founder-card gab-card">
    <div class="founder-card__body">
      <div class="founder-card__header">
        <div class="founder-card__icon" aria-hidden="true"><i class="pi pi-graduation-cap" /></div>
        <span class="gab-pill-badge founder-card__badge" style="margin-left: -0.5rem !important;">Oferta de fundador</span>
      </div>

      <h3 class="founder-card__name">{{ plan.name }}</h3>
      <p v-if="plan.description" class="founder-card__description" v-html="descriptionHtml" />
    </div>

    <div class="founder-card__action">
      <p class="founder-card__price">{{ formatPrice(plan.price, plan.currency) }}</p>
      <Button
        :label="isCurrent ? 'Plano ativo' : 'Assinar'"
        class="founder-card__cta"
        :disabled="isCurrent"
        :loading="loading"
        @click="emit('subscribe', plan.id)"
      />
    </div>
  </article>
</template>

<style scoped>
.founder-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: var(--gab-radius-lg);
  background-color: var(--gab-accent-soft);
  /* Mesmo riscadinho fraco do card de CTA da landing — dá um ar de "oferta
     especial" sem introduzir uma paleta nova. */
  background-image: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, var(--gab-accent) 6%, transparent) 0 1px,
    transparent 1px 16px
  );
}

.founder-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.founder-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.founder-card__badge {
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
}

.founder-card__icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  /* O fundo do card já é --gab-accent-soft, então o ícone usa --gab-surface
     pra manter contraste — mesmo formato/tamanho/cor de ícone dos outros
     cards, só que "invertido" pra continuar visível aqui. */
  background: var(--gab-surface);
  color: var(--gab-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.founder-card__name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.founder-card__description {
  margin: 0;
  color: var(--gab-text-muted);
  line-height: 1.5;
}

.founder-card__action {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.founder-card__price {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
  white-space: nowrap;
}

.founder-card__cta {
  /* No mobile, preço e botão dividem a linha — o botão cresce pra ocupar o
     espaço que sobra em vez de ficar espremido no tamanho do texto. */
  flex: 1;
  min-width: 8rem;
}

@media (min-width: 768px) {
  .founder-card {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2.25rem;
  }

  .founder-card__body {
    flex: 1;
    min-width: 0;
    padding-right: 2rem;
  }

  .founder-card__action {
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
    gap: 0.75rem;
  }

  .founder-card__cta {
    flex: none;
    min-width: 10rem;
  }
}
</style>
