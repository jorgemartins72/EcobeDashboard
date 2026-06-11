export function useAppToast() {
  const toast = useToast() // do Nuxt UI

  function success(message: string) {
    toast.add({ title: 'Sucesso', description: message, color: 'success' })
  }

  function big_success(message: string) {
    toast.add({
      title: 'Sucesso',
      description: message,
      color: 'success',
      ui: {
        root: 'bg-green-600 text-white border-green-700',
        title: 'text-white',
        description: 'text-green-100',
        close: 'text-white hover:text-green-100'
      }
    })
  }

  function error(message: string) {
    toast.add({ title: 'Erro', description: message, color: 'error' })
  }

  function big_error(message: string) {
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

  function warning(message: string) {
    toast.add({ title: 'Atenção', description: message, color: 'warning' })
  }

  function big_warning(message: string) {
    toast.add({
      title: 'Atenção',
      description: message,
      color: 'warning',
      ui: {
        root: 'bg-amber-500 text-white border-amber-600',
        title: 'text-white',
        description: 'text-amber-100',
        close: 'text-white hover:text-amber-100'
      }
    })
  }

  function info(message: string) {
    toast.add({ title: 'Info', description: message, color: 'info' })
  }

  function big_info(message: string) {
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
    big_success,
    warning,
    big_warning,
    error,
    big_error,
    info,
    big_info
  }
}
