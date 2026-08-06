<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FormError from '@/components/common/FormError.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsyncAction } from '@/composables/useAsyncAction'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const { loading, error, run } = useAsyncAction(async () => {
  if (password.value !== confirmPassword.value) {
    throw new Error('As senhas não coincidem.')
  }
  await authStore.register(name.value, email.value, password.value)
  router.push(`/conta/${authStore.userId}`)
})
</script>

<template>
  <main class="gab-container gab-page">
    <form class="gab-form" @submit.prevent="run">
      <h1>Criar conta</h1>
      <FormError :message="error" />

      <div class="gab-field">
        <label for="name">Nome</label>
        <InputText id="name" v-model="name" autocomplete="name" placeholder="Seu nome" required />
      </div>

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

      <div class="gab-field">
        <label for="password">Senha</label>
        <Password
          id="password"
          v-model="password"
          toggleMask
          autocomplete="new-password"
          placeholder="Crie uma senha"
          required
          fluid
        />
      </div>

      <div class="gab-field">
        <label for="confirm-password">Confirmar senha</label>
        <Password
          id="confirm-password"
          v-model="confirmPassword"
          toggleMask
          :feedback="false"
          autocomplete="new-password"
          placeholder="Repita a senha"
          required
          fluid
        />
      </div>

      <Button type="submit" label="Criar conta" :loading="loading" />

      <p class="gab-form__hint">
        Já tem conta? <RouterLink to="/login">Entrar</RouterLink>
      </p>
    </form>
  </main>
</template>
