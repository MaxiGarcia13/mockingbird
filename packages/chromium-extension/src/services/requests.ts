import type { GetRequestsOptions, RequestData, StoredRequestData } from '@maxigarcia/mockingbird-types';
import { SAVED_REQUESTS_STORAGE_KEY } from '@/scripts/interceptor/constants';

async function readRequests(): Promise<Array<StoredRequestData>> {
  const result = await chrome.storage.local.get(SAVED_REQUESTS_STORAGE_KEY);
  const requests = result[SAVED_REQUESTS_STORAGE_KEY];

  return Array.isArray(requests) ? requests : [];
}

async function writeRequests(requests: Array<StoredRequestData>): Promise<void> {
  await chrome.storage.local.set({ [SAVED_REQUESTS_STORAGE_KEY]: requests });
}

export async function getRequests(options?: GetRequestsOptions): Promise<Array<StoredRequestData>> {
  let requests = await readRequests();

  if (typeof options?.enabled === 'boolean') {
    requests = requests.filter((request) => request.enabled === options.enabled);
  }

  return requests.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function saveRequest({ method, url, statusCode, headers, body }: RequestData): Promise<void> {
  const requests = await readRequests();

  requests.push({
    method,
    url,
    statusCode,
    headers,
    body,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    enabled: true,
  });

  await writeRequests(requests);
}

type UpdateRequestPayload = Partial<RequestData> & Partial<Pick<StoredRequestData, 'enabled'>>;

export async function updateRequest(id: StoredRequestData['id'], data: UpdateRequestPayload): Promise<void> {
  const requests = await readRequests();
  const index = requests.findIndex((request) => request.id === id);

  if (index === -1) {
    throw new Error('Request not found');
  }

  requests[index] = { ...requests[index], ...data, updatedAt: Date.now() };

  await writeRequests(requests);
}

export async function deleteRequest(id: StoredRequestData['id']): Promise<void> {
  const requests = await readRequests();
  await writeRequests(requests.filter((request) => request.id !== id));
}
