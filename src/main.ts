import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from './router'
import { gabaritosPreset } from './theme'
import { locales } from './locale'
import { useAuthStore } from './stores/auth'

import 'primeicons/primeicons.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  // es/en já estão prontos em src/locale.ts pra quando existir um seletor
  // de idioma — por enquanto o site é só pt-BR.
  locale: locales['pt-BR'],
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
    // Só instala o router (e dispara a navegação inicial) depois que a
    // hidratação termina — assim o guard já enxerga o userId correto e não
    // tenta redirecionar pra /conta/undefined enquanto o usuário ainda
    // está sendo carregado.
    app.use(router)
    app.mount('#app')
  })
