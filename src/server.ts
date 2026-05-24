import process from 'node:process';
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', (_request, reply) => {
  reply.send('Hello, world!');
});

fastify.listen({ port: typeof process.env.PORT === 'string' ? Number.parseInt(process.env.PORT) : 3000 })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
