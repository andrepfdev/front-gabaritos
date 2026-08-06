import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

// Paleta inspirada na referência visual do usuário (coral/vermelho como accent, cantos arredondados)
export const gabaritosPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef2f1',
      100: '#fde1de',
      200: '#fbc7c1',
      300: '#f6a199',
      400: '#f0736a',
      500: '#e8503a',
      600: '#d43f2c',
      700: '#b23124',
      800: '#932a21',
      900: '#7a2720',
      950: '#42110c',
    },
  },
})
