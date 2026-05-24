import type { FastifyInstance } from 'fastify';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDist = path.resolve(__dirname, '../../../app/dist');

export function initAppRoutes(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: appDist,
  });
}
