import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { ZodError } from 'zod'
import { mealsRoutes } from './http/controllers/meals/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(cookie)

app.register(usersRoutes)
app.register(mealsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
