<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import StoreBadges from '@/components/common/StoreBadges.vue'
import heroWoman from '@/assets/hero-woman.webp'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const testimonials = [
  {
    quote:
      'O ProvaZero me devolveu meu tempo. Corrijo em minutos e foco no que realmente importa: meus alunos.',
    name: 'Ana Paula',
    role: 'Professora de Matemática',
  },
  {
    quote:
      'Antes eu levava um fim de semana inteiro corrigindo prova de múltipla escolha. Agora é só apontar a câmera.',
    name: 'Carlos Eduardo',
    role: 'Professor de História',
  },
  {
    quote:
      'O que mais uso é o detalhamento por questão — dá pra ver na hora onde a turma inteira errou junto.',
    name: 'Fernanda Lima',
    role: 'Coordenadora pedagógica',
  },
  {
    quote: 'Uso com quatro turmas diferentes. Trocar de gabarito entre uma prova e outra é tranquilo.',
    name: 'Roberto Alves',
    role: 'Professor de Biologia',
  },
  {
    quote: 'Simples de configurar e o resultado sai rápido o bastante pra eu comentar a prova na mesma aula.',
    name: 'Juliana Santos',
    role: 'Professora de Química',
  },
]

const activeTestimonial = ref(0)
const slideDirection = ref<'next' | 'prev'>('next')

let autoplayId: ReturnType<typeof setInterval> | null = null

function stopAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId)
    autoplayId = null
  }
}

function startAutoplay() {
  stopAutoplay()
  autoplayId = setInterval(nextTestimonial, 6000)
}

function goToTestimonial(index: number) {
  slideDirection.value = index > activeTestimonial.value ? 'next' : 'prev'
  activeTestimonial.value = index
}

function nextTestimonial() {
  slideDirection.value = 'next'
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length
}

function prevTestimonial() {
  slideDirection.value = 'prev'
  activeTestimonial.value = (activeTestimonial.value - 1 + testimonials.length) % testimonials.length
}

function handleManualNav(action: () => void) {
  action()
  startAutoplay()
}

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)

const heroBadges = [
  {
    icon: 'pi pi-check-circle',
    title: 'Correção automática',
    subtitle: 'Direto pelo cartão-resposta',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Resultado na hora',
    subtitle: 'Sem planilha, sem demora',
  },
]

// Só no mobile: uma terceira vantagem entra na lista em fluxo (o desktop
// continua mostrando só as duas sobrepostas na foto, ver heroBadges acima).
const heroBadgesMobile = [
  ...heroBadges,
  {
    icon: 'pi pi-mobile',
    title: 'Direto do celular',
    subtitle: 'Sem precisar de scanner',
  },
]

// Posição de cada balão sobreposto na foto, no desktop — segue a ordem de
// heroBadgesMobile (ver .landing__hero-badge--top/--bottom/--waist no CSS).
const heroVisualBadgePositions = [
  'landing__hero-badge--top',
  'landing__hero-badge--bottom',
  'landing__hero-badge--waist',
]

const steps = [
  {
    title: 'Crie sua conta',
    description: 'Cadastro com nome, e-mail e senha. Sem formulário longo, sem enrolação.',
  },
  {
    title: 'Escolha um plano',
    description: 'Mensal, semestral ou anual — o app libera a correção assim que a assinatura confirma.',
  },
  {
    title: 'Corrija o gabarito no app',
    description:
      'Aponte a câmera pro cartão-resposta preenchido e receba a correção da prova na hora, com o detalhamento de cada questão.',
  },
]
</script>

<template>
  <main class="landing">
    <section class="gab-container landing__hero">
      <div class="landing__hero-copy">
        <span class="landing__hero-dots landing__hero-dots--mobile" aria-hidden="true" />
        <span class="gab-pill-badge">
          <i class="pi pi-star-fill" aria-hidden="true" />
          O melhor app pra corrigir prova
        </span>
        <h1 class="landing__title">
          Corrija provas <span class="landing__title--accent">em segundos</span>, não em horas.
        </h1>
        <p class="landing__subtitle">
          O jeito mais simples de corrigir gabarito pelo celular: aponte a câmera pro
          cartão-resposta e receba a correção automática da prova na hora.
        </p>
        <RouterLink :to="authStore.isAuthenticated ? `/conta/${authStore.userId}` : '/registro'">
          <Button
            :label="authStore.isAuthenticated ? 'Ir para minha conta' : 'Criar conta grátis'"
            icon="pi pi-arrow-right"
            iconPos="right"
            size="large"
          />
        </RouterLink>
        <p v-if="!authStore.isAuthenticated" class="landing__hint">
          Sem pedir CPF &middot; leva menos de um minuto
        </p>
        <StoreBadges class="landing__hero-badges" />

        <!-- Só no mobile: os mesmos balões de uso, em fluxo normal (sem foto
             pesada) — no desktop eles reaparecem sobrepostos na imagem, mais
             abaixo. -->
        <div class="landing__hero-badges-flow">
          <div v-for="badge in heroBadgesMobile" :key="badge.title" class="landing__hero-badge landing__hero-badge--flow">
            <i :class="badge.icon" aria-hidden="true" />
            <div>
              <strong>{{ badge.title }}</strong>
              <span>{{ badge.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="landing__hero-visual">
        <span class="landing__hero-dots" aria-hidden="true" />
        <img :src="heroWoman" alt="" class="landing__hero-image" />
        <div
          v-for="(badge, index) in heroBadgesMobile"
          :key="badge.title"
          class="landing__hero-badge"
          :class="heroVisualBadgePositions[index]"
        >
          <i :class="badge.icon" aria-hidden="true" />
          <div>
            <strong>{{ badge.title }}</strong>
            <span>{{ badge.subtitle }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="landing__band">
      <div class="gab-container landing__section">
        <h2>Como funciona</h2>
        <ol class="landing__steps">
          <li v-for="(step, index) in steps" :key="step.title" class="landing__step">
            <span class="landing__step-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="landing__step-body">
              <h3><span class="landing__step-bullet" aria-hidden="true" />{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="gab-container landing__testimonial" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
      <div class="landing__testimonial-row">
        <button
          type="button"
          class="landing__testimonial-nav"
          aria-label="Depoimento anterior"
          @click="handleManualNav(prevTestimonial)"
        >
          <i class="pi pi-angle-left" aria-hidden="true" />
        </button>

        <div class="landing__testimonial-viewport">
          <Transition :name="slideDirection === 'next' ? 'slide-next' : 'slide-prev'" mode="out-in">
            <blockquote :key="activeTestimonial" class="landing__quote">
              <p>{{ testimonials[activeTestimonial].quote }}</p>
              <cite>
                — {{ testimonials[activeTestimonial].name }}
                <span class="landing__quote-role">{{ testimonials[activeTestimonial].role }}</span>
              </cite>
            </blockquote>
          </Transition>
        </div>

        <button
          type="button"
          class="landing__testimonial-nav"
          aria-label="Próximo depoimento"
          @click="handleManualNav(nextTestimonial)"
        >
          <i class="pi pi-angle-right" aria-hidden="true" />
        </button>
      </div>

      <div class="landing__testimonial-dots">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.name"
          type="button"
          class="landing__testimonial-dot"
          :class="{ 'landing__testimonial-dot--active': index === activeTestimonial }"
          :aria-label="`Ver depoimento de ${testimonial.name}`"
          @click="handleManualNav(() => goToTestimonial(index))"
        />
      </div>
    </section>

    <section class="gab-container landing__cta-wrap">
      <div class="landing__cta">
        <h2>Pronto pra parar de corrigir na mão?</h2>
        <p>Escolha um plano e libere a correção automática ainda hoje.</p>
        <RouterLink to="/planos">
          <Button label="Ver planos" icon="pi pi-arrow-right" iconPos="right" size="large" />
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.landing__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-block: 3rem 3.5rem;
}

.landing__hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  min-width: 0;
  position: relative;
}

.landing__title {
  font-size: clamp(2.5rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  max-width: 20ch;
  letter-spacing: -0.01em;
}

.landing__title--accent {
  color: var(--gab-accent);
}

.landing__subtitle {
  color: var(--gab-text-muted);
  font-size: 1.05rem;
  max-width: 42ch;
  margin: 0;
}

.landing__hint {
  color: var(--gab-text-muted);
  font-size: 0.85rem;
  margin: 0;
}

.landing__hero-badges {
  margin-top: 0.25rem;
}

/* Micro-visual do hero: só entra no desktop, pra não empurrar o CTA
   pra fora da dobra no mobile (diretriz mobile-first do produto). */
.landing__hero-visual {
  display: none;
}

/* Padrão de bolinhas (motivo do cartão-resposta), bem sutil, centralizado
   atrás do título no mobile — leve, é só CSS, sem peso de imagem. */
.landing__hero-dots--mobile {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 9rem;
  height: 4rem;
  background-image: radial-gradient(var(--gab-accent-soft) 2px, transparent 2px);
  background-size: 16px 16px;
  opacity: 0.6;
  z-index: -1;
}

/* Balões de uso em fluxo normal — só no mobile, sem depender da foto
   (que fica só no desktop). No desktop eles reaparecem sobrepostos na
   imagem (ver .landing__hero-badge--top/--bottom mais abaixo). */
.landing__hero-badges-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 18rem;
  margin-top: 0.5rem;
}

.landing__hero-badge {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.85rem;
  background: var(--gab-surface);
  border-radius: var(--gab-radius-md);
  box-shadow: var(--gab-shadow);
  font-size: 0.8rem;
  line-height: 1.3;
  text-align: left;
}

.landing__hero-badge i {
  color: var(--gab-accent);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.landing__hero-badge strong {
  display: block;
  font-size: 0.85rem;
}

.landing__hero-badge span {
  color: var(--gab-text-muted);
}

/* Só no mobile: balões um pouco menores e centralizados, já que agora são
   três em vez de dois no fluxo normal (ver .landing__hero-badges-flow). */
.landing__hero-badge--flow {
  width: 100%;
  padding: 0.5rem 0.7rem;
}

.landing__band {
  background: var(--gab-surface);
  border-block: 1px solid var(--gab-border);
}

.landing__section {
  padding-block: 3rem;
}

.landing__section h2,
.landing__cta h2 {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 1.75rem;
  letter-spacing: -0.01em;
}

.landing__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
}

.landing__step {
  display: flex;
  gap: 1.25rem;
  padding-block: 1.1rem;
  border-top: 1px dashed var(--gab-border);
}

.landing__step:first-child {
  border-top: none;
  padding-top: 0;
}

.landing__step-index {
  flex-shrink: 0;
  width: 3rem;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--gab-accent-soft);
  -webkit-text-stroke: 1.25px var(--gab-accent);
}

.landing__step-body h3 {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0.15rem 0 0.35rem;
  font-size: 1.05rem;
}

.landing__step-bullet {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: var(--gab-accent);
  flex-shrink: 0;
}

.landing__step-body p {
  margin: 0;
  color: var(--gab-text-muted);
}

.landing__testimonial {
  padding-block: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.landing__quote {
  position: relative;
  max-width: 38rem;
  margin: 0 auto;
}

.landing__quote::before {
  content: '\201C';
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 4.5rem;
  line-height: 1;
  color: var(--gab-accent);
  opacity: 0.8;
  margin-bottom: -0.5rem;
}

.landing__quote p {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
  line-height: 1.5;
}

.landing__quote cite {
  display: block;
  font-style: normal;
  font-weight: 600;
  color: var(--gab-text-muted);
  font-size: 0.9rem;
}

.landing__quote-role {
  font-weight: 400;
  opacity: 0.8;
}

.landing__quote-role::before {
  content: '\00b7';
  margin: 0 0.4rem;
}

.landing__testimonial-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

.landing__testimonial-viewport {
  flex: 1;
  max-width: 38rem;
  overflow: hidden;
}

.landing__testimonial-nav {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--gab-border);
  background: var(--gab-surface);
  color: var(--gab-text);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.landing__testimonial-nav:hover {
  color: var(--gab-accent);
  border-color: var(--gab-accent-soft);
  transform: scale(1.08);
}

.landing__testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.landing__testimonial-dot {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.landing__testimonial-dot::before {
  content: '';
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--gab-border);
  transition:
    background-color 0.15s ease,
    transform 0.15s ease;
}

.landing__testimonial-dot--active::before {
  background: var(--gab-accent);
  transform: scale(1.3);
}

/* Slide + fade direcional: próximo desliza da direita, anterior da esquerda. */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(1.5rem);
}

.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-1.5rem);
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-1.5rem);
}

.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(1.5rem);
}

@media (max-width: 480px) {
  .landing__testimonial-nav {
    width: 2.25rem;
    height: 2.25rem;
  }
}

.landing__cta-wrap {
  padding-block: 3rem 4.5rem;
}

.landing__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 2.5rem 1.5rem;
  border-radius: var(--gab-radius-lg);
  background-color: var(--gab-accent-soft);
  /* Riscadinho bem fraco, só pra dar textura ao card sem competir com o
     texto — mesmo tom do accent, só que quase transparente. */
  background-image: repeating-linear-gradient(
    135deg,
    color-mix(in srgb, var(--gab-accent) 6%, transparent) 0 1px,
    transparent 1px 16px
  );
}

.landing__cta h2 {
  margin-bottom: 0;
}

.landing__cta p {
  color: var(--gab-text-muted);
  margin: 0;
}

@media (min-width: 1024px) {
  .landing__hero {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
  }

  .landing__hero-copy {
    flex: 1;
    max-width: 32rem;
    padding-bottom: 0.5rem;
    align-items: flex-start;
    text-align: left;
  }

  .landing__hero-dots--mobile {
    display: none;
  }

  .landing__hero-badges-flow {
    /* No desktop os mesmos balões reaparecem sobrepostos na foto, mais
       abaixo — evita duplicar o conteúdo nos dois lugares ao mesmo tempo. */
    display: none;
  }

  .landing__hero-visual {
    display: block;
    position: relative;
    width: min(25rem, 40%);
    flex-shrink: 0;
  }

  .landing__hero-dots {
    position: absolute;
    inset: -1.5rem -2rem auto auto;
    width: 8rem;
    height: 8rem;
    background-image: radial-gradient(var(--gab-accent-soft) 2px, transparent 2px);
    background-size: 14px 14px;
    z-index: 0;
  }

  .landing__hero-image {
    position: relative;
    z-index: 1;
    width: 100%;
    object-fit: contain;
    /* A foto é cortada na cintura na imagem original; um degradê suave no
       rodapé dissolve essa borda reta em vez de deixar um corte abrupto. */
    mask-image: linear-gradient(to bottom, black 80%, transparent 98%);
    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 98%);
  }

  .landing__hero-visual .landing__hero-badge {
    position: absolute;
    z-index: 2;
    max-width: 11.5rem;
    font-size: 0.75rem;
  }

  .landing__hero-badge--top {
    top: 0.5rem;
    left: -2.5rem;
  }

  .landing__hero-badge--bottom {
    bottom: 3rem;
    right: -2rem;
  }

  .landing__hero-badge--waist {
    top: 90%;
    left: -0.5rem;
  }

  .landing__step {
    padding-block: 1.4rem;
  }
}
</style>
