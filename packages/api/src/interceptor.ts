import type { HttpMethod, StoredRequestData } from '@maxigarcia/mockingbird-types';
import type { FastifyInstance } from 'fastify';
import { tryParseJson } from '@maxigarcia/js-utils';
import { getRequests } from '@/db/requests.js';

function getEnabledMocks(): Array<StoredRequestData> {
  const mocks = getRequests({ enabled: true });

  return mocks.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.url === item.url && t.method === item.method),
  );
}

export async function initInterceptor(fastify: FastifyInstance) {
  for (const mock of getEnabledMocks()) {
    const url = new URL(mock.url);

    const fn = getMethodFn(mock.method, fastify);

    fn(url.pathname, (_request, reply) => {
      const headers = tryParseJson(mock.headers ?? '');

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          reply.header(key, value);
        }
      }

      reply.status(mock.statusCode).send(tryParseJson(mock.body ?? ''));
    });
  }
}

function getMethodFn(method: HttpMethod, fastify: FastifyInstance) {
  switch (method) {
    case 'GET':
      return fastify.get.bind(fastify);
    case 'POST':
      return fastify.post.bind(fastify);
    case 'PUT':
      return fastify.put.bind(fastify);
    case 'PATCH':
      return fastify.patch.bind(fastify);
    case 'DELETE':
      return fastify.delete.bind(fastify);
    case 'HEAD':
      return fastify.head.bind(fastify);
    case 'OPTIONS':
      return fastify.options.bind(fastify);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}
