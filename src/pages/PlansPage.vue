<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PlanCard from '@/components/plans/PlanCard.vue'
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

// O plano "mais vantajoso" é o de maior desconto informado pela própria API
// na descrição (ex.: "— 30% de desconto vs. mensal") — nada inventado aqui.
const recommendedPlanId = computed(() => {
  let bestId: string | null = null
  let bestDiscount = 0
  for (const plan of plansStore.plans) {
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

onMounted(() => {
  plansStore.fetchPlans().catch(() => undefined)
})

async function handleSubscribe(planId: string) {
  if (!authStore.isAuthenticated || !authStore.userId) {
    router.push({ name: 'login', query: { redirect: '/planos' } })
    return
  }

  subscribeError.value = null
  subscribingPlanId.value = planId
  try {
    const returnUrl = `${window.location.origin}/conta/${authStore.userId}`
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

    <div v-else class="gab-grid gab-grid--3 plans-page__grid">
      <PlanCard
        v-for="plan in plansStore.plans"
        :key="plan.id"
        :plan="plan"
        :loading="subscribingPlanId === plan.id"
        :recommended="plan.id === recommendedPlanId"
        @subscribe="handleSubscribe"
      />
    </div>
  </main>
</template>

<style scoped>
.plans-page__subtitle {
  color: var(--gab-text-muted);
  margin: 0.25rem 0 2rem;
}

.plans-page__grid {
  align-items: stretch;
}
</style>
