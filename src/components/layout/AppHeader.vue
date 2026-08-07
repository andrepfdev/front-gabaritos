<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Menu from 'primevue/menu'
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import UserAvatar from '@/components/common/UserAvatar.vue'

const authStore = useAuthStore()
const router = useRouter()

const userMenu = ref<InstanceType<typeof Menu> | null>(null)

const menuItems = computed(() => [
  {
    label: 'Minha conta',
    icon: 'pi pi-user',
    command: () => router.push(`/conta/${authStore.userId}`),
  },
  {
    label: 'Perfil',
    icon: 'pi pi-cog',
    command: () => router.push('/perfil'),
  },
  { separator: true },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.logout()
      router.push('/')
    },
  },
])

function toggleUserMenu(event: Event) {
  userMenu.value?.toggle(event)
}
</script>

<template>
  <header class="app-header">
    <div class="gab-container app-header__inner">
      <RouterLink to="/" class="app-header__brand">
        <i class="pi pi-check-circle" aria-hidden="true" />
        <span>ProvaZero</span>
      </RouterLink>

      <nav class="app-header__nav">
        <RouterLink to="/planos">Planos</RouterLink>

        <template v-if="authStore.isAuthenticated">
          <button type="button" class="app-header__user" @click="toggleUserMenu">
            <UserAvatar :name="authStore.user?.name" size="sm" />
            <span class="app-header__user-name">{{ authStore.user?.name?.split(' ')[0] ?? 'Conta' }}</span>
            <i class="pi pi-chevron-down app-header__user-caret" aria-hidden="true" />
          </button>
          <Menu ref="userMenu" :model="menuItems" popup />
        </template>
        <template v-else>
          <RouterLink to="/login">Entrar</RouterLink>
        </template>

        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  padding-block: 1.25rem;
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--gab-text);
  text-decoration: none;
}

.app-header__brand i {
  color: var(--gab-accent);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.app-header__nav > a {
  color: var(--gab-text);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.app-header__nav > a:hover {
  color: var(--gab-accent);
}

.app-header__user {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: transparent;
  padding: 0.25rem 0.4rem 0.25rem 0.25rem;
  border-radius: 999px;
  cursor: pointer;
  color: var(--gab-text);
  font-weight: 600;
  font-size: 0.95rem;
}

.app-header__user:hover {
  background: var(--gab-accent-soft);
  color: var(--gab-accent);
}

.app-header__user-name {
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-header__user-caret {
  font-size: 0.7rem;
  color: var(--gab-text-muted);
}

@media (max-width: 480px) {
  .app-header__user-name {
    display: none;
  }
}
</style>
