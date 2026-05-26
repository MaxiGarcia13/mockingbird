import type { RequestData } from '@root/types';

const API_URL = 'http://127.0.0.1:3000';
const ENDPOINT = '/requests';

export async function saveRequest({ method, url, statusCode, headers, body }: RequestData) {
  return fetch(`${API_URL}${ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({
      method: method.toUpperCase(),
      url,
      statusCode: Number(statusCode),
      headers,
      body,
    }),
  })
    .then((response) => response.json());
}
