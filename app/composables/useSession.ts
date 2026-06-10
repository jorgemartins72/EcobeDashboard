export function useSession() {
  function setSession(data: { user?: any; access_token?: string; refresh_token?: string }) {
    if (!import.meta.client) return
    if (data.access_token) sessionStorage.setItem('access_token', data.access_token)
    if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token)
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
  }

  function getSession() {
    if (!import.meta.client) return { user: undefined, access_token: undefined, refresh_token: undefined }
    return {
      access_token: sessionStorage.getItem('access_token') ?? undefined,
      refresh_token: localStorage.getItem('refresh_token') ?? undefined,
      user: (() => { const s = localStorage.getItem('user'); return s ? JSON.parse(s) : undefined })(),
    }
  }

  function clearSession() {
    if (!import.meta.client) return
    sessionStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  }

  function isLoggedIn(): boolean {
    if (!import.meta.client) return false
    return !!sessionStorage.getItem('access_token')
  }

  return { setSession, getSession, clearSession, isLoggedIn }
}
