import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealsDietService } from '@/services/count-meal-diet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function countDiet(request: FastifyRequest, reply: FastifyReply) {
  const countQuerySchema = z.object({
    isDiet: z.string(),
  })

  const { isDiet } = countQuerySchema.parse(request.query)

  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const prismaMealsRepository = new PrismaMealsRepository()
  const countMealsDietService = new CountMealsDietService(prismaMealsRepository)

  const { coutMeals } = await countMealsDietService.handle({
    userId,
    isDiet: Boolean(isDiet),
  })

  return reply.status(200).send(coutMeals)
}
