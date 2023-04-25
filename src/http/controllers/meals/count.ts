import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealsService } from '@/services/count-meals-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function count(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const prismaMealsRepository = new PrismaMealsRepository()
  const getMealService = new CountMealsService(prismaMealsRepository)

  const { coutMeals } = await getMealService.handle({
    userId,
  })

  return reply.status(200).send(coutMeals)
}
