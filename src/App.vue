<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PrivacyConsentBanner from '@/components/common/PrivacyConsentBanner.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
  <Toast />
  <ConfirmDialog />
  <PrivacyConsentBanner />
</template>
