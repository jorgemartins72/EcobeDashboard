// server/api/auth/register.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.nome || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nome, e-mail e senha são obrigatórios'
    })
  }

  if (body.email === 'existe@email.com') {
    throw createError({
      statusCode: 409,
      statusMessage: 'Este e-mail já está cadastrado'
    })
  }

  return {
    message: 'Cadastro realizado com sucesso',
    user: {
      id: 'fake-user-id',
      nome: body.nome,
      email: body.email
    },
    token: 'fake-jwt-token'
  }
})