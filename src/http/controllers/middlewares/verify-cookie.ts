import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyCookie() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.cookies

    if (!userId) {
      return reply.status(401).send({ message: 'unauthorized' })
    }
  }
}
