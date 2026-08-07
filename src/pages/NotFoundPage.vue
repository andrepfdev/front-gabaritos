<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import notFoundImage from '@/assets/404 Error-pana.svg'
</script>

<template>
  <main class="gab-container gab-page not-found">
    <img :src="notFoundImage" alt="" class="not-found__image" />
    <h1>Página não encontrada</h1>
    <p>O endereço que você tentou acessar não existe.</p>
    <RouterLink to="/">
      <Button label="Voltar para o início" icon="pi pi-home" />
    </RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding-block: 4rem;
}

.not-found__image {
  width: min(100%, 20rem);
  height: auto;
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--gab-text-muted);
  margin: 0;
}
</style>
