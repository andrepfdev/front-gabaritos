<script setup lang="ts">
import googlePlayBadge from '@/assets/badges/google-play.svg'
import appStoreBadge from '@/assets/badges/app-store.svg'

// TODO: trocar '#' pelas URLs reais assim que o app for publicado nas lojas.
const links = {
  googlePlay: '#',
  appStore: '#',
}
</script>

<template>
  <div class="store-badges">
    <a
      :href="links.googlePlay"
      class="store-badges__link"
      aria-disabled="true"
      title="Em breve"
      @click.prevent
    >
      <img :src="googlePlayBadge" alt="Em breve no Google Play" />
    </a>
    <a
      :href="links.appStore"
      class="store-badges__link"
      aria-disabled="true"
      title="Em breve"
      @click.prevent
    >
      <img :src="appStoreBadge" alt="Em breve na App Store" />
    </a>
  </div>
</template>

<style scoped>
.store-badges {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.store-badges__link {
  display: inline-flex;
  opacity: 0.65;
  cursor: default;
  transition: opacity 0.15s ease;
}

.store-badges__link:hover {
  opacity: 0.85;
}

.store-badges__link img {
  height: 2.5rem;
  width: auto;
  display: block;
}
</style>
