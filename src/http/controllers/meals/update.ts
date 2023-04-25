import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { UpdateMealService } from '@/services/update-meal-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const updateParamSchema = z.object({
    mealId: z.string(),
  })
  const updateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isDiet: z.boolean(),
  })

  const { mealId } = updateParamSchema.parse(request.params)
  const newMeal = updateBodySchema.parse(request.body)

  try {
    const prismaMealsRepository = new PrismaMealsRepository()
    const createMealService = new UpdateMealService(prismaMealsRepository)

    await createMealService.handle({
      mealId,
      userId,
      newMeal,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
