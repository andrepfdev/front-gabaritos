<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'

withDefaults(defineProps<{ label?: string }>(), { label: 'Carregando…' })
</script>

<template>
  <div class="loading-state">
    <ProgressSpinner style="width: 2.5rem; height: 2.5rem" strokeWidth="4" />
    <p>{{ label }}</p>
  </div>
</template>

<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1rem;
  color: var(--gab-text-muted);
}
</style>
