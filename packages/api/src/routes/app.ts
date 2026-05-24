import type { FastifyInstance } from 'fastify';
import { createRequire } from 'node:module';
import path from 'node:path';
import fastifyStatic from '@fastify/static';

const require = createRequire(import.meta.url);
const appDist = path.join(
  path.dirname(require.resolve('@maxigarcia/mockingbird-app')),
);

export function initAppRoutes(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: appDist,
  });
}
