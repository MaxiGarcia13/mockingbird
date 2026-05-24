import type { FastifyInstance } from 'fastify';
import { initAppRoutes } from './app.js';
import { initStorageRoutes } from './storage.js';

export function initRoutes(fastify: FastifyInstance) {
  initAppRoutes(fastify);

  initStorageRoutes(fastify);

  fastify.setNotFoundHandler((_request, reply) => {
    reply.sendFile('index.html');
  });
}
