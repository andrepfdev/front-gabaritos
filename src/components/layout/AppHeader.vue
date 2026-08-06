<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header class="app-header">
    <div class="gab-container app-header__inner">
      <RouterLink to="/" class="app-header__brand">
        <i class="pi pi-check-circle" aria-hidden="true" />
        <span>ProvaZero</span>
      </RouterLink>

      <nav class="app-header__nav">
        <RouterLink to="/planos">Planos</RouterLink>
        <template v-if="authStore.isAuthenticated">
          <RouterLink :to="`/conta/${authStore.userId}`">Minha conta</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login">Entrar</RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  padding-block: 1.25rem;
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--gab-text);
  text-decoration: none;
}

.app-header__brand i {
  color: var(--gab-accent);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.app-header__nav a {
  color: var(--gab-text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.app-header__nav a:hover {
  color: var(--gab-accent);
}
</style>
