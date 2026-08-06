<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
</script>

<template>
  <main class="gab-container gab-page not-found">
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

.not-found p {
  color: var(--gab-text-muted);
  margin: 0;
}
</style>
