import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/registro',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/recuperar-senha',
      name: 'forgot-password',
      component: () => import('@/pages/ForgotPasswordPage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/planos',
      name: 'plans',
      component: () => import('@/pages/PlansPage.vue'),
    },
    {
      path: '/conta/:userId',
      name: 'account',
      component: () => import('@/pages/AccountPage.vue'),
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/perfil',
      name: 'profile',
      component: () => import('@/pages/ProfilePage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/privacidade',
      name: 'privacy-policy',
      component: () => import('@/pages/PrivacyPolicyPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'account', params: { userId: authStore.userId! } }
  }

  if (to.name === 'account' && authStore.isAuthenticated && to.params.userId !== authStore.userId) {
    return { name: 'account', params: { userId: authStore.userId! } }
  }

  return true
})

export default router
