import process from 'node:process';
import Fastify from 'fastify';
import { initInterceptor } from '@/interceptor.js';
import { initRoutes } from '@/routes/index.js';

const fastify = Fastify({
  logger: true,
});

initRoutes(fastify);
initInterceptor(fastify);

fastify
  .listen({ port: typeof process.env.PORT === 'string' ? Number.parseInt(process.env.PORT) : 3000 })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
