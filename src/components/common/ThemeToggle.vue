<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="themeStore.isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
    :title="themeStore.isDark ? 'Tema claro' : 'Tema escuro'"
    @click="themeStore.toggle()"
  >
    <i :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" aria-hidden="true" />
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--gab-border);
  background: var(--gab-surface);
  color: var(--gab-text);
  cursor: pointer;
  font-size: 1rem;
  flex-shrink: 0;
}

.theme-toggle:hover {
  color: var(--gab-accent);
  border-color: var(--gab-accent-soft);
}
</style>
