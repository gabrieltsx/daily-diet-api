import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/login', authenticate)
}
