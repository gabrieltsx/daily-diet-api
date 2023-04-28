import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { GetMealsService } from '@/services/get-meals-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const fetchBodySchema = z.object({
    mealId: z.string(),
  })

  const { mealId } = fetchBodySchema.parse(request.params)

  const { userId } = request.cookies

  try {
    const prismaMealsRepository = new PrismaMealsRepository()
    const getMealService = new GetMealsService(prismaMealsRepository)

    const { meal } = await getMealService.handle({
      userId: userId ?? '',
      mealId,
    })

    return reply.status(200).send(meal)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
