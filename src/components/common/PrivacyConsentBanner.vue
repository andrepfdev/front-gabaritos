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
  <div v-if="visible" class="consent-toast gab-card" role="note">
    <button type="button" class="consent-toast__close" aria-label="Fechar aviso" @click="acknowledge">
      <i class="pi pi-times" aria-hidden="true" />
    </button>
    <p class="consent-toast__text">
      Usamos seus dados só para autenticação e pagamento, conforme a LGPD.
      <RouterLink to="/privacidade">Saiba mais</RouterLink>
    </p>
    <Button label="Entendi" size="small" class="consent-toast__cta" @click="acknowledge" />
  </div>
</template>

<style scoped>
.consent-toast {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 40;
  width: min(320px, calc(100vw - 2.5rem));
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.consent-toast__close {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--gab-text-muted);
  border-radius: 999px;
  cursor: pointer;
}

.consent-toast__close:hover {
  background: var(--gab-accent-soft);
  color: var(--gab-accent);
}

.consent-toast__text {
  margin: 0;
  padding-right: 1.25rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--gab-text-muted);
}

.consent-toast__text a {
  color: var(--gab-accent);
  font-weight: 600;
}

.consent-toast__cta {
  align-self: flex-start;
}
</style>
