<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import heroWoman from '@/assets/hero-woman.webp'
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
          Assine um plano ProvaZero e libere a correção automática de gabaritos direto no app.
        </p>
        <RouterLink to="/registro">
          <Button label="Experimente grátis" icon="pi pi-arrow-right" iconPos="right" size="large" />
        </RouterLink>
        <p class="landing__hint">Sem cartão de crédito &middot; comece agora</p>
      </div>
      <img :src="heroWoman" alt="" class="landing__hero-image" />
    </section>

    <section class="gab-container landing__section">
      <h2>Como funciona</h2>
      <ol class="landing__steps">
        <li class="landing__step">
          <span class="gab-icon-circle"><i class="pi pi-file-edit" aria-hidden="true" /></span>
          <div>
            <h3>1. Crie sua conta</h3>
            <p>Registre-se e escolha o plano ideal pra você.</p>
          </div>
        </li>
        <li class="landing__step">
          <span class="gab-icon-circle"><i class="pi pi-camera" aria-hidden="true" /></span>
          <div>
            <h3>2. Digitalize o gabarito</h3>
            <p>Aponte a câmera do celular pro gabarito preenchido, no app.</p>
          </div>
        </li>
        <li class="landing__step">
          <span class="gab-icon-circle"><i class="pi pi-chart-bar" aria-hidden="true" /></span>
          <div>
            <h3>3. Veja o resultado</h3>
            <p>Receba a correção na hora, com análises detalhadas.</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="gab-container landing__testimonial">
      <blockquote class="gab-card">
        <i class="pi pi-comment" aria-hidden="true" />
        <p>"O ProvaZero me devolveu meu tempo. Corrijo em minutos e foco no que realmente importa: meus alunos."</p>
        <cite>— Professora Ana Paula</cite>
      </blockquote>
    </section>

    <section class="gab-container landing__section landing__cta">
      <h2>Comece agora</h2>
      <p>É rápido e sem burocracia.</p>
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
  padding-block: 2.5rem 3rem;
}

.landing__hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
}

/* Micro-visual do hero: só entra no desktop, pra não empurrar o CTA
   pra fora da dobra no mobile (diretriz mobile-first do produto). */
.landing__hero-image {
  display: none;
}

.landing__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  margin: 0;
  max-width: 20ch;
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

.landing__section {
  padding-block: 2.5rem;
}

.landing__section h2 {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
}

.landing__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.landing__step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.landing__step h3 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
}

.landing__step p {
  margin: 0;
  color: var(--gab-text-muted);
}

.landing__testimonial blockquote {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.landing__testimonial i {
  color: var(--gab-accent);
  font-size: 1.5rem;
}

.landing__testimonial p {
  font-style: italic;
  margin: 0;
  font-size: 1.05rem;
}

.landing__testimonial cite {
  color: var(--gab-text-muted);
  font-style: normal;
  font-weight: 600;
}

.landing__cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.landing__cta p {
  color: var(--gab-text-muted);
  margin: 0;
}

@media (min-width: 1024px) {
  .landing__hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }

  .landing__hero-copy {
    flex: 1;
    max-width: 32rem;
  }

  .landing__hero-image {
    display: block;
    width: min(22rem, 40%);
    flex-shrink: 0;
    object-fit: contain;
  }

  .landing__steps {
    grid-template-columns: repeat(3, 1fr);
  }

  .landing__step {
    flex-direction: column;
  }
}
</style>
