// server/api/auth/forgot-password.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'E-mail é obrigatório'
    })
  }

  if (body.email === 'naoexiste@email.com') {
    throw createError({
      statusCode: 404,
      statusMessage: 'E-mail não encontrado'
    })
  }

  return {
    message: 'Instruções de recuperação enviadas para o e-mail informado'
  }
})