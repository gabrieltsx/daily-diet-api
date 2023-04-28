import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { DeleteMealService } from '@/services/delete-meal-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function del(request: FastifyRequest, reply: FastifyReply) {
  const deleteBodySchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = deleteBodySchema.parse(request.params)

  const { userId } = request.cookies

  try {
    const prismaMealsRepository = new PrismaMealsRepository()
    const deleteMealService = new DeleteMealService(prismaMealsRepository)

    await deleteMealService.handle({
      userId: userId ?? '',
      mealId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
