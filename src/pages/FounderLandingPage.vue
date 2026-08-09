<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
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

const YOUTUBE_ID = 'YMaGiCi9YR0'
const YOUTUBE_EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}` +
  '?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1' +
  '&cc_load_policy=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1'

const founderPlan = computed(() =>
  plansStore.plans.find((p) => !['MONTHLY', 'SEMIANNUAL', 'YEARLY'].includes(p.interval ?? '')),
)

const subscribing = ref(false)
const subscribeError = ref<string | null>(null)

onMounted(() => {
  plansStore.fetchPlans().catch(() => undefined)
})

async function handleSubscribe(planId: string) {
  if (!authStore.isAuthenticated || !authStore.userId) {
    router.push({ name: 'login', query: { redirect: '/fundador' } })
    return
  }

  subscribeError.value = null
  subscribing.value = true
  try {
    const returnUrl = `${window.location.origin}/conta/${authStore.userId}?checkout=success`
    const { url } = await billingStore.subscribe(authStore.userId, planId, returnUrl)
    window.location.href = url
  } catch (e) {
    subscribeError.value = e instanceof Error ? e.message : 'Não foi possível iniciar o checkout'
    toast.fail(subscribeError.value)
  } finally {
    subscribing.value = false
  }
}

const benefits = [
  {
    icon: 'pi pi-camera',
    title: 'Correção automática',
    text: 'Aponte a câmera pro cartão-resposta e receba a correção na hora.',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Resultado em segundos',
    text: 'Sem planilha, sem espera. O gabarito sai na hora.',
  },
  {
    icon: 'pi pi-list',
    title: 'Detalhamento por questão',
    text: 'Veja exatamente onde a turma errou — questão por questão.',
  },
  {
    icon: 'pi pi-inbox',
    text: 'Sem limite de provas corrigidas.',
    title: 'Ilimitado',
  },
]
</script>

<template>
  <main class="founder-page">
    <section class="founder-page__hero gab-container">
      <div class="founder-page__hero-text">
        <span class="gab-pill-badge">
          <i class="pi pi-graduation-cap" aria-hidden="true" />
          Oferta de fundador
        </span>
        <h1 class="founder-page__title">
          Seja um dos primeiros.<br />
          <span class="founder-page__title--accent">Pague menos, pra sempre.</span>
        </h1>
        <p class="founder-page__subtitle">
          Vagas limitadas para o plano de fundador do ProvaZero. Acesso por
          <strong>2 anos</strong> por apenas <strong>R$ 99,27</strong> — o equivalente a
          <strong>R$ 4,13/mês</strong>.
        </p>
      </div>

      <div class="founder-page__video-wrap">
        <iframe
          class="founder-page__video"
          :src="YOUTUBE_EMBED_URL"
          title="ProvaZero — Corrija provas em segundos"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        />
      </div>

      <Button
        label="Garantir minha vaga"
        size="large"
        class="founder-page__hero-cta"
        @click="$el.closest('main').querySelector('#fundador-plano')?.scrollIntoView({ behavior: 'smooth' })"
      />
    </section>

    <section class="founder-page__benefits gab-container">
      <h2 class="founder-page__section-title">O que você ganha</h2>
      <div class="founder-page__benefits-grid">
        <div v-for="benefit in benefits" :key="benefit.title" class="founder-page__benefit">
          <div class="founder-page__benefit-icon">
            <i :class="benefit.icon" aria-hidden="true" />
          </div>
          <div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="fundador-plano" class="founder-page__plan gab-container">
      <h2 class="founder-page__section-title">Garanta sua vaga</h2>
      <p class="founder-page__plan-subtitle">
        Esta oferta é por tempo limitado. Quando as vagas acabarem, o preço volta ao normal.
      </p>

      <FormError :message="subscribeError" />

      <LoadingState v-if="plansStore.status === 'loading' && !founderPlan" label="Carregando plano…" />
      <FounderPlanCard
        v-else-if="founderPlan"
        :plan="founderPlan"
        :loading="subscribing"
        @subscribe="handleSubscribe"
      />
    </section>

    <section class="founder-page__urgency gab-container">
      <div class="founder-page__urgency-card">
        <i class="pi pi-clock" aria-hidden="true" />
        <p>
          <strong>Esta oferta não vai durar pra sempre.</strong>
          O preço de fundador é uma cortesia para quem acredita no projeto desde o início.
          Depois que as vagas fecharem, o plano volta ao valor regular.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.founder-page {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding-block: 2rem 4rem;
}

/* ── Hero ─────────────────────────────────────────────── */

.founder-page__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.founder-page__hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 40ch;
}

.founder-page__title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.01em;
}

.founder-page__title--accent {
  color: var(--gab-accent);
}

.founder-page__subtitle {
  color: var(--gab-text-muted);
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
  max-width: 50ch;
}

.founder-page__video-wrap {
  width: 100%;
  max-width: 42rem;
  border-radius: var(--gab-radius-lg);
  overflow: hidden;
  box-shadow: var(--gab-shadow);
  background: #000;
}

.founder-page__video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.founder-page__hero-cta {
  display: block;
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
}

.founder-page__hero-cta :deep(.p-button-content) {
  gap: 0.5rem;
}

/* ── Benefícios ───────────────────────────────────────── */

.founder-page__section-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
}

.founder-page__benefits {
  display: flex;
  flex-direction: column;
}

.founder-page__benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.founder-page__benefit {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--gab-surface);
  border-radius: var(--gab-radius-md);
  box-shadow: var(--gab-shadow);
}

.founder-page__benefit-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: var(--gab-accent-soft);
  color: var(--gab-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1rem;
}

.founder-page__benefit h3 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.founder-page__benefit p {
  margin: 0;
  color: var(--gab-text-muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ── Plano ────────────────────────────────────────────── */

.founder-page__plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.founder-page__plan-subtitle {
  color: var(--gab-text-muted);
  margin: -0.5rem 0 1.5rem;
  font-size: 0.95rem;
}

.founder-page__plan > :deep(.founder-card) {
  max-width: 42rem;
  width: 100%;
  text-align: left;
}

/* ── Urgência ─────────────────────────────────────────── */

.founder-page__urgency {
  display: flex;
  justify-content: center;
}

.founder-page__urgency-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 40rem;
  padding: 1.25rem 1.5rem;
  background: var(--gab-accent-soft);
  border-radius: var(--gab-radius-md);
  color: var(--gab-accent);
}

.founder-page__urgency-card > i {
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.founder-page__urgency-card p {
  margin: 0;
  color: var(--gab-text);
  font-size: 0.9rem;
  line-height: 1.5;
}

.founder-page__urgency-card strong {
  color: var(--gab-accent);
}

/* ── Responsivo ───────────────────────────────────────── */

@media (min-width: 640px) {
  .founder-page__benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .founder-page__hero {
    text-align: left;
    align-items: flex-start;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 3rem;
  }

  .founder-page__hero-text {
    align-items: flex-start;
    text-align: left;
  }

  .founder-page__video-wrap {
    flex: 1;
    max-width: none;
  }

  .founder-page__hero-cta {
    display: none;
  }
}
</style>
