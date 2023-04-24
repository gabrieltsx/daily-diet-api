import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { FetchMealsService } from '@/services/fetch-meals-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies

  if (!userId) {
    throw new Error('Not found')
  }

  const prismaMealsRepository = new PrismaMealsRepository()
  const fetchMealsService = new FetchMealsService(prismaMealsRepository)

  const { meals } = await fetchMealsService.handle({
    userId,
  })

  return reply.status(200).send(meals)
}
