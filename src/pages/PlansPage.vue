<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PlanCard from '@/components/plans/PlanCard.vue'
import FounderPlanCard from '@/components/plans/FounderPlanCard.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import FormError from '@/components/common/FormError.vue'
import { usePlansStore } from '@/stores/plans'
import { useAuthStore } from '@/stores/auth'
import { useBillingStore } from '@/stores/billing'
import { useToastFeedback } from '@/composables/useToastFeedback'

const plansStore = usePlansStore()
const authStore = useAuthStore()
const billingStore = useBillingStore()
const router = useRouter()
const toast = useToastFeedback()

// Planos recorrentes "padrão" ficam no grid de 3 colunas; qualquer plano com
// um interval fora desse conjunto (ex.: BIENNIAL do "Professor Patrocinador")
// é tratado como oferta especial e renderizado à parte, num card largo.
const STANDARD_INTERVALS = ['MONTHLY', 'SEMIANNUAL', 'YEARLY']
const standardPlans = computed(() => plansStore.plans.filter((plan) => STANDARD_INTERVALS.includes(plan.interval ?? '')))
const specialPlans = computed(() => plansStore.plans.filter((plan) => !STANDARD_INTERVALS.includes(plan.interval ?? '')))

// O plano "mais vantajoso" é o de maior desconto informado pela própria API
// na descrição (ex.: "— 30% de desconto vs. mensal") — nada inventado aqui.
const recommendedPlanId = computed(() => {
  let bestId: string | null = null
  let bestDiscount = 0
  for (const plan of standardPlans.value) {
    const match = plan.description?.match(/(\d+)%\s*de desconto/i)
    const discount = match ? Number(match[1]) : 0
    if (discount > bestDiscount) {
      bestDiscount = discount
      bestId = plan.id
    }
  }
  return bestId
})

const subscribingPlanId = ref<string | null>(null)
const subscribeError = ref<string | null>(null)

const JSON_LD_ID = 'plans-json-ld'

// Injeta o JSON-LD de preços a partir dos dados reais da API — nunca fixo no
// HTML, pra não ficar desatualizado se os preços mudarem (ver index.html).
function injectPlansJsonLd() {
  if (plansStore.plans.length === 0) return

  const prices = plansStore.plans.map((plan) => plan.price)
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ProvaZero',
    applicationCategory: 'EducationalApplication',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: plansStore.plans[0]?.currency ?? 'BRL',
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: plansStore.plans.length,
    },
  }

  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = JSON_LD_ID
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(payload)
}

onMounted(() => {
  plansStore
    .fetchPlans()
    .then(injectPlansJsonLd)
    .catch(() => undefined)
})

onBeforeUnmount(() => {
  document.getElementById(JSON_LD_ID)?.remove()
})

async function handleSubscribe(planId: string) {
  if (!authStore.isAuthenticated || !authStore.userId) {
    router.push({ name: 'login', query: { redirect: '/planos' } })
    return
  }

  subscribeError.value = null
  subscribingPlanId.value = planId
  try {
    const returnUrl = `${window.location.origin}/conta/${authStore.userId}?checkout=success`
    const { url } = await billingStore.subscribe(authStore.userId, planId, returnUrl)
    window.location.href = url
  } catch (e) {
    subscribeError.value = e instanceof Error ? e.message : 'Não foi possível iniciar o checkout'
    toast.fail(subscribeError.value)
  } finally {
    subscribingPlanId.value = null
  }
}
</script>

<template>
  <main class="gab-container gab-page">
    <h1>Planos</h1>
    <p class="plans-page__subtitle">Escolha o plano ideal e libere a correção automática de gabaritos.</p>

    <FormError :message="subscribeError" />

    <LoadingState v-if="plansStore.status === 'loading' && plansStore.plans.length === 0" label="Carregando planos…" />
    <FormError v-else-if="plansStore.status === 'error'" :message="plansStore.error" />

    <template v-else>
      <div class="plans-page__content">
        <div class="gab-grid gab-grid--3 plans-page__grid">
          <PlanCard
            v-for="plan in standardPlans"
            :key="plan.id"
            :plan="plan"
            :loading="subscribingPlanId === plan.id"
            :recommended="plan.id === recommendedPlanId"
            @subscribe="handleSubscribe"
          />
        </div>

        <div v-if="specialPlans.length > 0" class="plans-page__special">
          <FounderPlanCard
            v-for="plan in specialPlans"
            :key="plan.id"
            :plan="plan"
            :loading="subscribingPlanId === plan.id"
            @subscribe="handleSubscribe"
          />
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.plans-page__subtitle {
  color: var(--gab-text-muted);
  margin: 0.25rem 0 2rem;
}

.plans-page__content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.plans-page__grid {
  align-items: stretch;
}

.plans-page__special {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Abaixo de 1024px (largura em que o grid ainda é 1 coluna, ver .gab-grid--3
   em main.css) a oferta especial vem primeiro — é a "melhor tacada" e não
   deve ficar escondida no fim do scroll no mobile. No desktop, com os 3
   planos lado a lado, ela volta pro lugar natural: depois do grid. */
.plans-page__special {
  order: -1;
}

@media (min-width: 1024px) {
  .plans-page__special {
    order: 1;
  }

  .plans-page__grid {
    order: 0;
  }
}
</style>
