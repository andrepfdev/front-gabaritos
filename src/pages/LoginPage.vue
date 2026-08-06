<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FormError from '@/components/common/FormError.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsyncAction } from '@/composables/useAsyncAction'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const { loading, error, run } = useAsyncAction(async () => {
  await authStore.login(email.value, password.value)
  const redirect = (route.query.redirect as string) ?? `/conta/${authStore.userId}`
  router.push(redirect)
})
</script>

<template>
  <main class="gab-container gab-page">
    <form class="gab-form" @submit.prevent="run">
      <h1>Entrar</h1>
      <FormError :message="error" />

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
          :feedback="false"
          autocomplete="current-password"
          placeholder="Sua senha"
          required
          fluid
        />
      </div>

      <Button type="submit" label="Entrar" :loading="loading" />

      <p class="gab-form__hint">
        <RouterLink to="/recuperar-senha">Esqueci minha senha</RouterLink>
      </p>

      <div class="gab-form__secondary">
        <span>Ainda não tem conta?</span>
        <RouterLink to="/registro" class="gab-form__secondary-link">
          <Button label="Cadastre-se" class="gab-btn-soft" text fluid />
        </RouterLink>
      </div>
    </form>
  </main>
</template>
