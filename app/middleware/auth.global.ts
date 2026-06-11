export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useSession()
  if (to.path === '/auth') {
    if (isLoggedIn()) return navigateTo('/')
    return
  }
  if (!isLoggedIn()) return navigateTo('/auth')
})
