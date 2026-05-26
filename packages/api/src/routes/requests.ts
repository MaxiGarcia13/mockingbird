import type { GetRequestsOptions, RequestData } from '@root/types/request.js';
import type { FastifyInstance } from 'fastify';
import { tryParseJson } from '@maxigarcia/js-utils';
import { deleteRequest, getRequests, saveRequest, updateRequest } from '@/db/requests.js';

const endpoint = '/requests';

export function initRequestsRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: GetRequestsOptions }>(endpoint, (request, reply) => {
    try {
      const requests = getRequests(request.query);

      reply.status(200).send({ data: requests });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to get requests' });
    }
  });

  fastify.post<{ Body: string }>(endpoint, (request, reply) => {
    try {
      const requestData = request.body;
      const parsed = tryParseJson<RequestData>(requestData);

      if (!parsed) {
        throw new Error('Invalid request data');
      }

      saveRequest(parsed);

      reply.status(200).send({ message: 'Request saved successfully' });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to save request' });
    }
  });

  fastify.put<{ Body: string; Params: { id: string } }>(`${endpoint}/:id`, (request, reply) => {
    try {
      const requestData = request.body;
      const parsed = tryParseJson<RequestData>(requestData);

      if (!parsed) {
        throw new Error('Invalid request data');
      }

      updateRequest(request.params.id, parsed);

      reply.status(200).send({ message: 'Request updated successfully' });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to update request' });
    }
  });

  fastify.delete<{ Body: string; Params: { id: string } }>(`${endpoint}/:id`, (request, reply) => {
    try {
      deleteRequest(request.params.id);

      reply.status(200).send({ message: 'Request deleted successfully' });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to delete request' });
    }
  });
}
