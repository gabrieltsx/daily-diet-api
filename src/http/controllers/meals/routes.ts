import { FastifyInstance } from 'fastify'
import { create } from './create'
import { del } from './delete'
import { fetch } from './fetch'
import { get } from './get'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meal', create)
  app.get('/meal/:mealId', get)
  app.get('/meal', fetch)
  app.delete('/meal/:mealId', del)
}
