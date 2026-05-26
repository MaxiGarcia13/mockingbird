import type { GetRequestsOptions, RequestData, StoredRequestData } from '@root/types';

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

export async function getRequests(params: GetRequestsOptions): Promise<Array<StoredRequestData>> {
  const queryParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, value.toString()]));
  const queryString = queryParams.toString();

  return fetch(`${API_URL}${ENDPOINT}${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((payload: { data: Array<StoredRequestData> }) => payload.data);
}
