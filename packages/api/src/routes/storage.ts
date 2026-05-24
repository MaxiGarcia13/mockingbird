import type { FastifyInstance } from 'fastify';

export function initStorageRoutes(fastify: FastifyInstance) {
  fastify.get('/storage', (_request, reply) => {
    reply.send({ message: 'Hello, world!' });
  });
}
