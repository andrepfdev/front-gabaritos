import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from './router'
import { gabaritosPreset } from './theme'
import { useAuthStore } from './stores/auth'

import 'primeicons/primeicons.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: gabaritosPreset,
    options: {
      darkModeSelector: '.gab-dark',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)

const authStore = useAuthStore()
authStore
  .hydrate()
  .catch(() => undefined)
  .finally(() => {
    app.mount('#app')
  })
