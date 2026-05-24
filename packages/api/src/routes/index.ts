import type { FastifyInstance } from 'fastify';
import { initAppRoutes } from './app.js';

export function initRoutes(fastify: FastifyInstance) {
  initAppRoutes(fastify);

  fastify.setNotFoundHandler((_request, reply) => {
    reply.sendFile('index.html');
  });
}
