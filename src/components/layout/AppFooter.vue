<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="gab-container app-footer__inner">
      <span class="app-footer__copy">&copy; {{ year }} ProvaZero. Todos os direitos reservados.</span>
      <div class="app-footer__links">
        <RouterLink to="/download" class="app-footer__link">Baixar o app</RouterLink>
        <RouterLink to="/privacidade" class="app-footer__link">Política de Privacidade</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding-block: 1.5rem;
  border-top: 1px solid var(--gab-border);
  margin-top: 2rem;
}

.app-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  color: var(--gab-text-muted);
  font-size: 0.85rem;
}

.app-footer__links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-footer__link {
  color: var(--gab-text-muted);
  text-decoration: none;
}

.app-footer__link:hover {
  color: var(--gab-accent);
  text-decoration: underline;
}

@media (min-width: 640px) {
  .app-footer__inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
