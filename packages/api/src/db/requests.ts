import type { GetRequestsOptions, RequestData, StoredRequestData } from '@root/types/request.js';
import fs from 'node:fs';
import path from 'node:path';
import { tryParseJson } from '@maxigarcia/js-utils';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const requestsPath = path.join(__dirname, '..', '..', '.mockingbird', 'requests.json');

export function saveRequest(request: RequestData) {
  const requests = getRequests();

  requests.push({
    ...request,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    enabled: true,
  });

  writeRequests(requests);
}

export function getRequests(options?: GetRequestsOptions): Array<StoredRequestData> {
  if (!fs.existsSync(requestsPath)) {
    return [];
  }
  const file = fs.readFileSync(requestsPath, { encoding: 'utf8' });
  const storedRequests = tryParseJson<Array<StoredRequestData>>(file);

  let requests = Array.isArray(storedRequests) ? storedRequests : [];

  if (typeof options?.enabled === 'boolean') {
    requests = requests.filter((req) => req.enabled === options.enabled);
  }

  return requests.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function writeRequests(data: Array<StoredRequestData>) {
  if (!fs.existsSync(requestsPath)) {
    fs.mkdirSync(path.dirname(requestsPath), { recursive: true });
  }

  fs.writeFileSync(requestsPath, JSON.stringify(data, null, 2), { encoding: 'utf8' });
}

export function deleteRequest(id: string) {
  const requests = getRequests();
  const newRequests = requests.filter((request) => request.id !== id);

  writeRequests(newRequests);
}

export function updateRequest(id: string, data: RequestData) {
  const requests = getRequests();
  const index = requests.findIndex((request) => request.id === id);

  if (index === -1) {
    throw new Error('Request not found');
  }

  requests[index] = { ...requests[index], ...data, updatedAt: new Date() };

  writeRequests(requests);
}
