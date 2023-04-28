import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealsNotDietsService } from '@/services/count-meals-not-diets-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function countNotDiet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.cookies
  const prismaMealsRepository = new PrismaMealsRepository()
  const countMealsNotDietsService = new CountMealsNotDietsService(
    prismaMealsRepository,
  )

  const { notDiets } = await countMealsNotDietsService.handle({
    userId: userId ?? '',
  })

  return reply.status(200).send({ notDiets })
}
