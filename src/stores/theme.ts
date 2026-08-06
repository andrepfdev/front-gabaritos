import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'provazero_theme'

export const useThemeStore = defineStore('theme', () => {
  // O script inline em index.html já deixou o atributo certo no <html>
  // antes do Vue montar (evita flash de tema errado); só lemos aqui.
  const isDark = ref(document.documentElement.getAttribute('data-theme') === 'dark')

  function apply(dark: boolean) {
    isDark.value = dark
    const root = document.documentElement
    root.setAttribute('data-theme', dark ? 'dark' : 'light')
    root.classList.toggle('gab-dark', dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }

  function toggle() {
    apply(!isDark.value)
  }

  return { isDark, toggle }
})
