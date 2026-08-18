<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import FounderPlanCard from '@/components/plans/FounderPlanCard.vue'
import LoadingState from '@/components/common/LoadingState.vue'
import FormError from '@/components/common/FormError.vue'
import { useAuthStore } from '@/stores/auth'
import { usePlansStore } from '@/stores/plans'
import { useRouter } from 'vue-router'
import { useBillingStore } from '@/stores/billing'
import { useToastFeedback } from '@/composables/useToastFeedback'
import { ref } from 'vue'

const authStore = useAuthStore()
const plansStore = usePlansStore()
const billingStore = useBillingStore()
const router = useRouter()
const toast = useToastFeedback()

const YOUTUBE_ID = 'YaW0fJ76-vE'
const YOUTUBE_EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}` +
  '?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1' +
  '&cc_load_policy=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1'

const steps = [
  {
    index: '01',
    title: 'Crie o gabarito',
    description: 'Monte a prova no ProvaZero com as respostas corretas.',
  },
  {
    index: '02',
    title: 'Aplique a prova',
    description: 'Os alunos respondem normalmente, em papel.',
  },
  {
    index: '03',
    title: 'Aponte a câmera',
    description: 'Use o celular para ler os cartões-resposta preenchidos.',
  },
  {
    index: '04',
    title: 'Veja o resultado',
    description: 'A correção aparece automaticamente, com detalhamento por questão.',
  },
]

const faqs = [
  {
    question: 'Preciso escanear as provas?',
    answer: 'Não. Aponte a câmera do celular para o cartão-resposta e a correção é feita na hora.',
  },
  {
    question: 'Preciso digitalizar as provas?',
    answer: 'Não. A correção é feita diretamente pelo celular, sem scanner.',
  },
  {
    question: 'Quanto tempo demora?',
    answer: 'O resultado aparece em segundos, logo depois de apontar a câmera.',
  },
  {
    question: 'Posso corrigir várias provas?',
    answer: 'Sim, conforme os limites do seu plano. No mensal, até 100 correções por mês.',
  },
  {
    question: 'Preciso instalar alguma coisa?',
    answer: 'Sim, o ProvaZero funciona pelo aplicativo disponível para Android e iPhone.',
  },
]

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
    router.push({ name: 'login', query: { redirect: '/como-funciona' } })
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
</script>

<template>
  <main class="how-it-works">
    <!-- Hero -->
    <section class="how-it-works__hero gab-container">
      <h1 class="how-it-works__title">
        Veja como funciona <span class="how-it-works__title--accent">na prática</span>
      </h1>
      <p class="how-it-works__subtitle">
        Do cartão-resposta ao resultado em poucos segundos.
      </p>

      <div class="how-it-works__video-wrap">
        <iframe
          class="how-it-works__video"
          :src="YOUTUBE_EMBED_URL"
          title="ProvaZero — Como funciona na prática"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>

    <!-- Steps -->
    <section class="how-it-works__steps gab-container">
      <h2>É simples assim</h2>
      <ol class="how-it-works__steps-list">
        <li v-for="step in steps" :key="step.index" class="how-it-works__step">
          <span class="how-it-works__step-index" aria-hidden="true">{{ step.index }}</span>
          <div class="how-it-works__step-body">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- Benefits text -->
    <section class="how-it-works__benefit gab-container">
      <h2>Menos tempo corrigindo.<br />Mais tempo para ensinar.</h2>
    </section>

    <!-- CTA -->
    <section class="how-it-works__cta-wrap gab-container">
      <div class="how-it-works__cta">
        <h2>Pronto. Sem horas corrigindo provas.</h2>
        <p class="how-it-works__cta-text">
          Experimente gratuitamente e veja quanto tempo você pode economizar.
        </p>
        <RouterLink :to="authStore.isAuthenticated ? '/planos' : '/registro'">
          <Button
            label="Criar conta grátis"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="large"
          />
        </RouterLink>
        <p class="how-it-works__cta-hint">Sem cartão de crédito.</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="how-it-works__faq gab-container">
      <h2>Dúvidas frequentes</h2>
      <dl class="how-it-works__faq-list">
        <div v-for="faq in faqs" :key="faq.question" class="how-it-works__faq-item">
          <dt>{{ faq.question }}</dt>
          <dd>{{ faq.answer }}</dd>
        </div>
      </dl>
    </section>

    <!-- Founder offer -->
    <!-- Sem cabeçalho estático aqui de propósito: o FounderPlanCard já traz
         selo, nome, descrição e preço direto da API — duplicar esse texto
         num wrapper "card" por fora criava dois cards aninhados mostrando a
         mesma oferta duas vezes (e um preço fixo no JSX que podia ficar
         desatualizado em relação ao plano real). -->
    <section class="how-it-works__founder gab-container">
      <div class="how-it-works__founder-card">
        <FormError :message="subscribeError" />

        <LoadingState v-if="plansStore.status === 'loading' && !founderPlan" label="Carregando plano…" />
        <FounderPlanCard
          v-else-if="founderPlan"
          :plan="founderPlan"
          :loading="subscribing"
          @subscribe="handleSubscribe"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.how-it-works {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding-block: 2rem 4rem;
}

/* ── Hero ─────────────────────────────────────────────── */

.how-it-works__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.how-it-works__title {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.01em;
}

.how-it-works__title--accent {
  color: var(--gab-accent);
}

.how-it-works__subtitle {
  color: var(--gab-text-muted);
  font-size: 1.05rem;
  margin: 0.5rem 0 0;
}

.how-it-works__video-wrap {
  width: 100%;
  max-width: 42rem;
  margin-top: 2rem;
  border-radius: var(--gab-radius-lg);
  overflow: hidden;
  box-shadow: var(--gab-shadow);
  background: #000;
}

.how-it-works__video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* ── Steps ────────────────────────────────────────────── */

.how-it-works__steps {
  display: flex;
  flex-direction: column;
}

.how-it-works__steps h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
  text-align: center;
}

.how-it-works__steps-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 40rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.how-it-works__step {
  display: flex;
  gap: 1.25rem;
  padding: 1rem 1.25rem;
  background: var(--gab-surface);
  border-radius: var(--gab-radius-md);
  box-shadow: var(--gab-shadow);
  align-items: flex-start;
}

.how-it-works__step-index {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: var(--gab-accent-soft);
  color: var(--gab-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
}

.how-it-works__step-body h3 {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.how-it-works__step-body p {
  margin: 0;
  color: var(--gab-text-muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

/* ── Benefit text ─────────────────────────────────────── */

.how-it-works__benefit {
  text-align: center;
}

.how-it-works__benefit h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

/* ── CTA ──────────────────────────────────────────────── */

.how-it-works__cta-wrap {
  padding-block: 2.5rem 3rem;
}

.how-it-works__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 2.5rem 1.5rem;
  border-radius: var(--gab-radius-lg);
  background-color: var(--gab-accent-soft);
  background-image: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, var(--gab-accent) 6%, transparent) 0 1px,
    transparent 1px 16px
  );
}

.how-it-works__cta h2 {
  margin: 0;
}

.how-it-works__cta-text {
  color: var(--gab-text-muted);
  margin: 0;
}

.how-it-works__cta-hint {
  color: var(--gab-text-muted);
  font-size: 0.85rem;
  margin: 0;
}

/* ── FAQ ──────────────────────────────────────────────── */

.how-it-works__faq {
  display: flex;
  flex-direction: column;
}

.how-it-works__faq h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
  text-align: center;
}

.how-it-works__faq-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 40rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.how-it-works__faq-item {
  padding: 1rem 1.25rem;
  background: var(--gab-surface);
  border-radius: var(--gab-radius-md);
  box-shadow: var(--gab-shadow);
}

.how-it-works__faq-item dt {
  font-weight: 700;
  margin: 0 0 0.3rem;
  font-size: 0.95rem;
}

.how-it-works__faq-item dd {
  margin: 0;
  color: var(--gab-text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* ── Founder ──────────────────────────────────────────── */

.how-it-works__founder {
  display: flex;
  justify-content: center;
}

/* Wrapper puramente estrutural agora: o card visual (fundo, textura,
   padding, radius) vem só do FounderPlanCard — evita o padrão de "card
   dentro de card" mostrando a mesma oferta duas vezes. */
.how-it-works__founder-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 42rem;
  width: 100%;
}

.how-it-works__founder-card > :deep(.founder-card) {
  width: 100%;
  text-align: left;
}

/* ── Responsivo ───────────────────────────────────────── */

@media (min-width: 640px) {
  .how-it-works__steps-list {
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .how-it-works__benefit h2 {
    font-size: 2.25rem;
  }
}
</style>
