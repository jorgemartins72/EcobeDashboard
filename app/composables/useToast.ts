export function useAppToast() {
  const toast = useToast() // do Nuxt UI

  function success(message: string) {
    toast.add({
      title: 'Sucesso',
      description: message,
      color: 'green'
    })
  }

  function error(message: string) {
    toast.add({
      title: 'Erro',
      description: message,
      color: 'error',
      ui: {
        root: 'bg-red-600 text-white border-red-700',
        title: 'text-white',
        description: 'text-red-100',
        close: 'text-white hover:text-red-100'
      }
    })
  }

  function info(message: string) {
    toast.add({
      title: 'Info',
      description: message,
      color: 'info',
      ui: {
        root: 'bg-slate-800 text-white border-slate-800',
        title: 'text-white',
        description: 'text-white',
        close: 'text-white hover:text-slate-100'
      }
    })
  }

  return {
    success,
    error,
    info
  }
}