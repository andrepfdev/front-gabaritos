import { useToast } from 'primevue/usetoast'

export function useToastFeedback() {
  const toast = useToast()

  function success(message: string, summary = 'Sucesso') {
    toast.add({ severity: 'success', summary, detail: message, life: 4000 })
  }

  function fail(message: string, summary = 'Erro') {
    toast.add({ severity: 'error', summary, detail: message, life: 5000 })
  }

  return { success, fail }
}
