<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ name?: string | null; size?: 'sm' | 'md' }>(), {
  size: 'md',
})

const initials = computed(() => {
  const name = props.name?.trim()
  if (!name) return '?'
  const parts = name.split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
})
</script>

<template>
  <span class="user-avatar" :class="`user-avatar--${size}`" aria-hidden="true">{{ initials }}</span>
</template>

<style scoped>
.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--gab-accent-soft);
  color: var(--gab-accent);
  font-weight: 700;
  flex-shrink: 0;
}

.user-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.8rem;
}

.user-avatar--md {
  width: 3rem;
  height: 3rem;
  font-size: 1.1rem;
}
</style>
