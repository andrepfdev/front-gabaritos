<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'

const STORAGE_KEY = 'provazero_privacy_consent_ack'

const visible = ref(!localStorage.getItem(STORAGE_KEY))

function acknowledge() {
  localStorage.setItem(STORAGE_KEY, '1')
  visible.value = false
}
</script>

<template>
  <div v-if="visible" class="consent-banner" role="note">
    <div class="gab-container consent-banner__inner">
      <p class="consent-banner__text">
        Usamos seus dados apenas para autenticação e processamento de pagamento, conforme a LGPD.
        <RouterLink to="/privacidade">Saiba mais</RouterLink>
      </p>
      <Button label="Entendi" size="small" @click="acknowledge" />
    </div>
  </div>
</template>

<style scoped>
.consent-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  background: var(--gab-surface);
  border-top: 1px solid var(--gab-border);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  padding-block: 0.85rem;
}

.consent-banner__inner {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
}

.consent-banner__text {
  margin: 0;
  font-size: 0.85rem;
  color: var(--gab-text-muted);
}

.consent-banner__text a {
  color: var(--gab-accent);
  font-weight: 600;
}

@media (min-width: 640px) {
  .consent-banner__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }
}
</style>
