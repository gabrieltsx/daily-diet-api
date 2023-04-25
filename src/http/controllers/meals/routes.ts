import { FastifyInstance } from 'fastify'
import { count } from './count'
import { coutDiet } from './count-diet'
import { create } from './create'
import { del } from './delete'
import { fetch } from './fetch'
import { get } from './get'
import { update } from './update'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/meal', create)
  app.get('/meal/:mealId', get)
  app.get('/meal', fetch)
  app.delete('/meal/:mealId', del)
  app.put('/meal/:mealId', update)
  app.get('/meal/:mealId/count', count)
  app.get('/meal/:mealId/count?diet', coutDiet)
}
