export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useSession()
  if (!isLoggedIn()) return navigateTo('/auth')
})
