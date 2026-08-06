<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import StoreBadges from '@/components/common/StoreBadges.vue'
import heroWoman from '@/assets/hero-woman.webp'

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
    title: 'Corrija no app',
    description:
      'Aponte a câmera pro cartão-resposta preenchido e receba o resultado na hora, com o detalhamento de cada questão.',
  },
]
</script>

<template>
  <main class="landing">
    <section class="gab-container landing__hero">
      <div class="landing__hero-copy">
        <span class="gab-pill-badge">
          <i class="pi pi-heart-fill" aria-hidden="true" />
          Feito para professores
        </span>
        <h1 class="landing__title">
          Corrija provas <span class="landing__title--accent">em segundos</span>, não em horas.
        </h1>
        <p class="landing__subtitle">
          Assine um plano ProvaZero e libere a correção automática de cartões-resposta direto no
          app.
        </p>
        <RouterLink to="/registro">
          <Button label="Criar conta grátis" icon="pi pi-arrow-right" iconPos="right" size="large" />
        </RouterLink>
        <p class="landing__hint">Sem pedir CPF &middot; leva menos de um minuto</p>
        <StoreBadges class="landing__hero-badges" />
      </div>
      <div class="landing__hero-visual">
        <span class="landing__hero-dots" aria-hidden="true" />
        <img :src="heroWoman" alt="" class="landing__hero-image" />
        <div class="landing__hero-badge landing__hero-badge--top">
          <i class="pi pi-check-circle" aria-hidden="true" />
          <div>
            <strong>Correção automática</strong>
            <span>Direto pelo cartão-resposta</span>
          </div>
        </div>
        <div class="landing__hero-badge landing__hero-badge--bottom">
          <i class="pi pi-bolt" aria-hidden="true" />
          <div>
            <strong>Resultado na hora</strong>
            <span>Sem planilha, sem demora</span>
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

    <section class="gab-container landing__testimonial">
      <blockquote class="landing__quote">
        <p>
          O ProvaZero me devolveu meu tempo. Corrijo em minutos e foco no que realmente importa:
          meus alunos.
        </p>
        <cite>— Professora Ana Paula</cite>
      </blockquote>
    </section>

    <section class="gab-container landing__cta">
      <h2>Pronto pra parar de corrigir na mão?</h2>
      <p>Escolha um plano e libere a correção automática ainda hoje.</p>
      <RouterLink to="/planos">
        <Button label="Ver planos" icon="pi pi-arrow-right" iconPos="right" size="large" />
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.landing__hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-block: 3rem 3.5rem;
}

.landing__hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
}

.landing__title {
  font-size: clamp(2rem, 5vw, 3rem);
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
}

.landing__quote {
  position: relative;
  max-width: 38rem;
  margin: 0;
  padding-left: 2rem;
}

.landing__quote::before {
  content: '\201C';
  position: absolute;
  left: -0.35rem;
  top: -1.5rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 4.5rem;
  color: var(--gab-accent);
  opacity: 0.8;
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

.landing__cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding-block: 3rem 4.5rem;
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
  }

  .landing__hero-visual {
    display: block;
    position: relative;
    width: min(23rem, 38%);
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

  .landing__hero-badge {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    max-width: 11.5rem;
    padding: 0.65rem 0.85rem;
    background: var(--gab-surface);
    border-radius: var(--gab-radius-md);
    box-shadow: var(--gab-shadow);
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .landing__hero-badge i {
    color: var(--gab-accent);
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .landing__hero-badge strong {
    display: block;
    font-size: 0.8rem;
  }

  .landing__hero-badge span {
    color: var(--gab-text-muted);
  }

  .landing__hero-badge--top {
    top: 0.5rem;
    left: -2.5rem;
  }

  .landing__hero-badge--bottom {
    bottom: 3rem;
    right: -2rem;
  }

  .landing__step {
    padding-block: 1.4rem;
  }
}
</style>
