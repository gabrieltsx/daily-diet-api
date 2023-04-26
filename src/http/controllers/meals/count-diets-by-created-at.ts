import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountDietsByCreatedAtService } from '@/services/count-diets-by-created-at-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function countDietsByCreatedAt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const prismaMealsRepository = new PrismaMealsRepository()
  const coutMealsDietGroupCreatedAtService = new CountDietsByCreatedAtService(
    prismaMealsRepository,
  )

  const { countDietsResponse } =
    await coutMealsDietGroupCreatedAtService.handle({
      userId,
    })

  return reply.status(200).send(countDietsResponse)
}
