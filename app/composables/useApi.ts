export function useApi() {
  const { public: { apiBase, apiKey } } = useRuntimeConfig()
  const { getSession, clearSession } = useSession()
  const toast = useAppToast()

  function api<T>(path: string, options: Parameters<typeof $fetch>[1] = {}) {
    if (!apiKey) {
      toast.error('API Key ausente. Verifique a configuração do servidor.')
      return new Promise<T>(() => {})
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
        const code = response._data?.detail?.code
        if (code === 'API_KEY_INVALID') {
          toast.error('API Key inválida!!!') // Verifique NUXT_PUBLIC_API_KEY no arquivo .env
        } else if (code === 'API_KEY_INACTIVE') {
          toast.error('API Key inativa. Entre em contato com o administrador.')
        } else if (response.status === 401) {
          clearSession()
          navigateTo('/auth')
        }
      },
    })
  }

  return { api }
}
