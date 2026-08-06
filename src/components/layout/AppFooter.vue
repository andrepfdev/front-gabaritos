<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="gab-container app-footer__inner">
      <span class="app-footer__brand">
        <i class="pi pi-check-circle" aria-hidden="true" />
        ProvaZero
      </span>
      <span class="app-footer__copy">&copy; {{ year }} ProvaZero. Todos os direitos reservados.</span>
      <RouterLink to="/privacidade" class="app-footer__link">Política de Privacidade</RouterLink>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding-block: 2rem;
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

.app-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  color: var(--gab-text);
}

.app-footer__brand i {
  color: var(--gab-accent);
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
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
