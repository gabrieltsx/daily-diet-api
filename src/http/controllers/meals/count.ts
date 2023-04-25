import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealService } from '@/services/get-meal-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function cout(request: FastifyRequest, reply: FastifyReply) {
  const fetchBodySchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = fetchBodySchema.parse(request.params)

  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const prismaMealsRepository = new PrismaMealsRepository()
  const getMealService = new GetMealService(prismaMealsRepository)

  const { meal } = await getMealService.handle({
    userId,
    mealId,
  })

  return reply.status(200).send(meal)
}
