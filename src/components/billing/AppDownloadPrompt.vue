<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import StoreBadges from '@/components/common/StoreBadges.vue'
</script>

<template>
  <section class="gab-card app-download-prompt">
    <div class="app-download-prompt__icon" aria-hidden="true">
      <i class="pi pi-mobile" />
    </div>
    <div class="app-download-prompt__body">
      <h2>Pagamento confirmado! Agora baixe o app</h2>
      <p>
        Pra corrigir suas provas você precisa do app ProvaZero instalado no celular — é por ele que
        você fotografa o cartão-resposta e recebe a correção na hora.
      </p>
      <StoreBadges class="app-download-prompt__badges" />
      <RouterLink to="/download">
        <Button label="Ver instruções de instalação" icon="pi pi-download" outlined />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.app-download-prompt {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.app-download-prompt__icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gab-accent) 15%, transparent);
  color: var(--gab-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.app-download-prompt__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.app-download-prompt__body h2 {
  margin: 0;
  font-size: 1.15rem;
}

.app-download-prompt__body p {
  margin: 0;
  color: var(--gab-text-muted);
}

.app-download-prompt__badges {
  margin-top: 0.25rem;
}
</style>
