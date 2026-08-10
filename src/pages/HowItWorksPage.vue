<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const YOUTUBE_ID = '5kPntJBBbmg'
const YOUTUBE_EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}` +
  '?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1' +
  '&cc_load_policy=0&iv_load_policy=3&playsinline=1'
</script>

<template>
  <main class="how-it-works gab-container gab-page">
    <div class="how-it-works__header">
      <h1>Como funciona</h1>
      <p class="how-it-works__subtitle">
        Veja em segundos como o ProvaZero transforma a correção de provas.
      </p>
    </div>

    <div class="how-it-works__video-wrap">
      <iframe
        class="how-it-works__video"
        :src="YOUTUBE_EMBED_URL"
        title="ProvaZero — Como funciona"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <div class="how-it-works__cta">
      <RouterLink :to="authStore.isAuthenticated ? '/planos' : { name: 'login', query: { redirect: '/como-funciona' } }">
        <Button
          label="Assinar agora"
          icon="pi pi-arrow-right"
          iconPos="right"
          size="large"
        />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.how-it-works__header {
  text-align: center;
  margin-bottom: 2rem;
}

.how-it-works__header h1 {
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.01em;
}

.how-it-works__subtitle {
  color: var(--gab-text-muted);
  font-size: 1.05rem;
  margin: 0.5rem 0 0;
}

.how-it-works__video-wrap {
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
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

.how-it-works__cta {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}
</style>
