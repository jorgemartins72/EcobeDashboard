export function useLoadingButton() {
  const isLoading = ref(false)

  async function withLoading(fn: () => Promise<void>) {
    if (isLoading.value) return
    isLoading.value = true
    try {
      await fn()
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, withLoading }
}
