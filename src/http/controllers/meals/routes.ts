import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', create)
}
