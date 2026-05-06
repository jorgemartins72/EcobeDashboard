// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.email === 'aaa@aaa.com' && body.password === '123456') {
    return {
      token: 'fake-jwt-token'
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Credenciais inválidas'
  })
})