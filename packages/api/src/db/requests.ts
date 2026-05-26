import type { RequestData, StoredRequestData } from '@root/types/request.js';
import fs from 'node:fs';
import path from 'node:path';

type Storage = Array<StoredRequestData>;

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

export function getRequests(): Storage {
  if (!fs.existsSync(requestsPath)) {
    return [];
  }

  const file = fs.readFileSync(requestsPath, { encoding: 'utf8' });
  const storage = JSON.parse(file);

  return Array.isArray(storage) ? storage : [];
}

export function writeRequests(data: Storage) {
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
