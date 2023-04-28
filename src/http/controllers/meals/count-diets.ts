import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealsDietsService } from '@/services/count-meals-diets-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function countDiet(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies
  const prismaMealsRepository = new PrismaMealsRepository()
  const countMealsDietService = new CountMealsDietsService(
    prismaMealsRepository,
  )

  const { diets } = await countMealsDietService.handle({
    userId: userId ?? '',
  })

  return reply.status(200).send({ diets })
}
