import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { UpdateMealService } from '@/services/update-meal-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies

  const updateParamSchema = z.object({
    mealId: z.string(),
  })
  const updateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isDiet: z.boolean(),
    createdAt: z.coerce.date(),
  })

  const { mealId } = updateParamSchema.parse(request.params)
  const newMeal = updateBodySchema.parse(request.body)

  try {
    const prismaMealsRepository = new PrismaMealsRepository()
    const createMealService = new UpdateMealService(prismaMealsRepository)

    await createMealService.handle({
      mealId,
      userId: userId ?? '',
      newMeal,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
