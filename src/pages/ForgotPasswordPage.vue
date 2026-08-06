<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import FormError from '@/components/common/FormError.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsyncAction } from '@/composables/useAsyncAction'

const authStore = useAuthStore()
const email = ref('')
const sent = ref(false)

const { loading, error, run } = useAsyncAction(async () => {
  await authStore.forgotPassword(email.value)
  sent.value = true
})
</script>

<template>
  <main class="gab-container gab-page">
    <form class="gab-form" @submit.prevent="run">
      <h1>Recuperar senha</h1>
      <FormError :message="error" />

      <Message v-if="sent" severity="success" :closable="false">
        Se este e-mail estiver cadastrado, você vai receber uma nova senha temporária em instantes.
      </Message>

      <div class="gab-field">
        <label for="email">E-mail</label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="seu@email.com"
          required
        />
      </div>

      <Button type="submit" label="Enviar" :loading="loading" />

      <p class="gab-form__hint">
        <RouterLink to="/login">Voltar para o login</RouterLink>
      </p>
    </form>
  </main>
</template>
