<script setup lang="ts">
import Message from 'primevue/message'

defineProps<{ message?: string | null }>()
</script>

<template>
  <Message v-if="message" severity="error" :closable="false">{{ message }}</Message>
</template>
