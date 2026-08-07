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
    colorScheme: {
      // O padrão do Aura usa primary.400 (mais claro/lavado) pros botões
      // primários no dark. Isso ficava washed demais; o 500 puro (mesmo do
      // light) ficou vívido demais pro fundo escuro. #ec6152 é o meio-termo
      // entre 400 (#f0736a) e 500 (#e8503a).
      dark: {
        primary: {
          color: '#ec6152',
          contrastColor: '#ffffff',
          hoverColor: '{primary.400}',
          activeColor: '{primary.300}',
        },
      },
    },
  },
})
