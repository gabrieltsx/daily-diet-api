import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserService } from '@/services/create-user-service'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const { email, name } = createBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const createUsersService = new CreateUserService(usersRepository)

    const { user } = await createUsersService.handle({
      email,
      name,
    })

    reply.cookie('userId', user.id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
