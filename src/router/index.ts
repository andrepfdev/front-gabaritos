import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const SITE_NAME = 'ProvaZero'
const DEFAULT_DESCRIPTION =
  'Corretor de prova online: aponte a câmera do celular pro cartão-resposta e receba a correção automática do gabarito na hora.'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/pages/LandingPage.vue'),
      meta: {
        title: 'ProvaZero — Corrija provas e gabaritos em segundos',
        description: DEFAULT_DESCRIPTION,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: {
        guestOnly: true,
        title: 'Entrar — ProvaZero',
        description: 'Entre na sua conta ProvaZero pra ver sua assinatura e continuar corrigindo provas.',
      },
    },
    {
      path: '/registro',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      meta: {
        guestOnly: true,
        title: 'Criar conta grátis — ProvaZero',
        description:
          'Crie sua conta grátis no ProvaZero e comece a corrigir prova de múltipla escolha pelo celular em menos de um minuto.',
      },
    },
    {
      path: '/recuperar-senha',
      name: 'forgot-password',
      component: () => import('@/pages/ForgotPasswordPage.vue'),
      meta: {
        guestOnly: true,
        title: 'Recuperar senha — ProvaZero',
        description: 'Esqueceu a senha? Recupere o acesso à sua conta ProvaZero em poucos passos.',
      },
    },
    {
      path: '/planos',
      name: 'plans',
      component: () => import('@/pages/PlansPage.vue'),
      meta: {
        title: 'Planos — ProvaZero',
        description:
          'Veja os planos do ProvaZero e escolha o corretor de gabarito ideal pra você: mensal, semestral ou anual.',
      },
    },
    {
      path: '/como-funciona',
      name: 'how-it-works',
      component: () => import('@/pages/HowItWorksPage.vue'),
      meta: {
        title: 'Como Funciona — ProvaZero',
        description:
          'Veja como o ProvaZero funciona: aponte a câmera pro cartão-resposta e receba a correção automática na hora.',
      },
    },
    {
      path: '/conta/:userId',
      name: 'account',
      component: () => import('@/pages/AccountPage.vue'),
      meta: { requiresAuth: true, title: 'Minha conta — ProvaZero' },
      props: true,
    },
    {
      path: '/perfil',
      name: 'profile',
      component: () => import('@/pages/ProfilePage.vue'),
      meta: { requiresAuth: true, title: 'Meu perfil — ProvaZero' },
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/pages/DownloadPage.vue'),
      meta: {
        title: 'Baixar o app — ProvaZero',
        description: 'Baixe o app ProvaZero e instale no seu Android ou iPhone. Instruções passo a passo.',
      },
    },
    {
      path: '/privacidade',
      name: 'privacy-policy',
      component: () => import('@/pages/PrivacyPolicyPage.vue'),
      meta: {
        title: 'Política de Privacidade — ProvaZero',
        description: 'Como o ProvaZero coleta, usa e protege os seus dados, em conformidade com a LGPD.',
      },
    },
    {
      path: '/fundador',
      name: 'founder-landing',
      component: () => import('@/pages/FounderLandingPage.vue'),
      meta: {
        title: 'Oferta de Fundador — ProvaZero',
        description:
          'Vagas limitadas: garanta 2 anos de acesso ao ProvaZero com preço especial de fundador.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: { title: 'Página não encontrada — ProvaZero' },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated && authStore.userId) {
    return { name: 'account', params: { userId: authStore.userId } }
  }

  if (
    to.name === 'account' &&
    authStore.isAuthenticated &&
    authStore.userId &&
    to.params.userId !== authStore.userId
  ) {
    return { name: 'account', params: { userId: authStore.userId } }
  }

  return true
})

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : SITE_NAME
  document.title = title

  const description = typeof to.meta.description === 'string' ? to.meta.description : DEFAULT_DESCRIPTION
  setMetaTag('description', description)
})

export default router
