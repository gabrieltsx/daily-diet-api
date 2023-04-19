import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CreateMealService } from '@/services/create-meal-service'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    // createdAt: z.coerce.date(),
    isDiet: z.boolean(),
  })

  const { description, name, isDiet } = createBodySchema.parse(request.body)

  const { userId } = request.cookies

  console.log('cookies', userId)

  if (!userId) {
    throw new Error('Not found')
  }

  try {
    const prismaMealsRepository = new PrismaMealsRepository()
    const createMealService = new CreateMealService(prismaMealsRepository)

    await createMealService.handle({
      description,
      name,
      isDiet,
      createdAt: new Date(),
      userId,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
