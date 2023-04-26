import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { DeleteMealService } from '@/services/delete-meal-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function del(request: FastifyRequest, reply: FastifyReply) {
  const deleteBodySchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = deleteBodySchema.parse(request.params)

  const { userId } = request.cookies

  const prismaMealsRepository = new PrismaMealsRepository()
  const deleteMealService = new DeleteMealService(prismaMealsRepository)

  await deleteMealService.handle({
    userId: userId ?? '',
    mealId,
  })

  return reply.status(204).send()
}
