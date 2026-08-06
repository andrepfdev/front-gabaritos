import { ref } from 'vue'

/** Padroniza loading/erro para uma ação disparada em componente (ex: submit de formulário). */
export function useAsyncAction<Args extends unknown[], Result>(
  action: (...args: Args) => Promise<Result>,
) {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function run(...args: Args): Promise<Result | undefined> {
    loading.value = true
    error.value = null
    try {
      return await action(...args)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Algo deu errado'
      return undefined
    } finally {
      loading.value = false
    }
  }

  return { loading, error, run }
}
