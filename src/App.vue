<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PrivacyConsentBanner from '@/components/common/PrivacyConsentBanner.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (!isAuth && route.meta.requiresAuth) {
      router.push({ name: 'login', query: { redirect: route.fullPath } })
    }
  },
)
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <Toast />
  <ConfirmDialog />
  <PrivacyConsentBanner />
</template>
