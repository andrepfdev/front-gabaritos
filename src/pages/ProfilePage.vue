<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FormError from '@/components/common/FormError.vue'
import { useAuthStore } from '@/stores/auth'
import { useAsyncAction } from '@/composables/useAsyncAction'
import { useToastFeedback } from '@/composables/useToastFeedback'

const authStore = useAuthStore()
const toast = useToastFeedback()

const name = ref(authStore.user?.name ?? '')
const currentPassword = ref('')
const newPassword = ref('')

const { loading: profileLoading, error: profileError, run: saveProfile } = useAsyncAction(async () => {
  await authStore.updateProfile({ name: name.value })
  toast.success('Dados atualizados.')
})

const { loading: passwordLoading, error: passwordError, run: savePassword } = useAsyncAction(async () => {
  await authStore.changePassword(currentPassword.value, newPassword.value)
  currentPassword.value = ''
  newPassword.value = ''
  toast.success('Senha alterada.')
})
</script>

<template>
  <main class="gab-container gab-page profile-page">
    <h1>Meu perfil</h1>

    <form class="gab-card gab-form profile-page__form" @submit.prevent="saveProfile">
      <h2>Dados pessoais</h2>
      <FormError :message="profileError" />
      <div class="gab-field">
        <label for="name">Nome</label>
        <InputText id="name" v-model="name" required />
      </div>
      <Button type="submit" label="Salvar" :loading="profileLoading" />
    </form>

    <form class="gab-card gab-form profile-page__form" @submit.prevent="savePassword">
      <h2>Trocar senha</h2>
      <FormError :message="passwordError" />
      <div class="gab-field">
        <label for="current-password">Senha atual</label>
        <Password id="current-password" v-model="currentPassword" toggleMask :feedback="false" required fluid />
      </div>
      <div class="gab-field">
        <label for="new-password">Nova senha</label>
        <Password id="new-password" v-model="newPassword" toggleMask required fluid />
      </div>
      <Button type="submit" label="Trocar senha" severity="secondary" :loading="passwordLoading" />
    </form>
  </main>
</template>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 480px;
  margin: 0 auto;
}

.profile-page__form {
  max-width: none;
}

.profile-page__form h2 {
  font-size: 1.1rem;
  margin: 0;
}
</style>
