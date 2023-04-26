import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CoutMealsDietGroupCreatedAtService } from '@/services/count-diet-group-created-at-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function countDietGroupCreatedAt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const prismaMealsRepository = new PrismaMealsRepository()
  const coutMealsDietGroupCreatedAtService =
    new CoutMealsDietGroupCreatedAtService(prismaMealsRepository)

  const { countDietsResponse } =
    await coutMealsDietGroupCreatedAtService.handle({
      userId,
    })

  return reply.status(200).send(countDietsResponse)
}
