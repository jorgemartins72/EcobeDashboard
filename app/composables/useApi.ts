export function useApi() {
  const { public: { apiBase, apiKey } } = useRuntimeConfig()
  const { getSession, clearSession } = useSession()
  const toast = useAppToast()

  function api<T>(path: string, options: Parameters<typeof $fetch>[1] = {}) {
    if (!apiKey) {
      toast.error('API Key não configurada. Defina NUXT_PUBLIC_API_KEY no arquivo .env')
      return Promise.reject(new Error('API Key não configurada'))
    }

    const { access_token } = getSession()

    return $fetch<T>(path, {
      baseURL: apiBase as string,
      ...options,
      headers: {
        'X-API-Key': apiKey as string,
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        ...(options?.headers ?? {}),
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          clearSession()
          navigateTo('/auth')
        }
      },
    })
  }

  return { api }
}
