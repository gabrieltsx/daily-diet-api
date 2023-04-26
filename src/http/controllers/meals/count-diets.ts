import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealsDietsService } from '@/services/count-meals-diets-service'
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
  const countMealsDietService = new CountMealsDietsService(
    prismaMealsRepository,
  )

  const { countMeals } = await countMealsDietService.handle({
    userId,
    isDiet: Boolean(isDiet),
  })

  return reply.status(200).send(countMeals)
}
