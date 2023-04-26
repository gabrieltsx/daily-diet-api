import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CountMealsService } from '@/services/count-meals-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function count(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies

  const prismaMealsRepository = new PrismaMealsRepository()
  const countMealService = new CountMealsService(prismaMealsRepository)

  const { countMeals } = await countMealService.handle({
    userId: userId ?? '',
  })

  return reply.status(200).send(countMeals)
}
