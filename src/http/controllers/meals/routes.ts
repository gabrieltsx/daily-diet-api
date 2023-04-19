import { FastifyInstance } from 'fastify'
import { create } from './create'
import { fetch } from './fetch'
import { get } from './get'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meal', create)
  app.get('/meal/:mealId', get)
  app.get('/meal', fetch)
}
