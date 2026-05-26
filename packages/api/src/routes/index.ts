import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { initAppRoutes } from './app.js';
import { initRequestsRoutes } from './requests.js';

export function initRoutes(fastify: FastifyInstance) {
  fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  initAppRoutes(fastify);
  initRequestsRoutes(fastify);

  fastify.setNotFoundHandler((_request, reply) => {
    reply.sendFile('index.html');
  });
}
