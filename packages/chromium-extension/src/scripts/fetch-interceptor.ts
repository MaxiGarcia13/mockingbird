import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import { tryParseJson } from '@maxigarcia/js-utils';
import { matchesUrlPattern } from '../utils/url-match';
import { INTERCEPT_ACTIVATION_EVENT, SAVED_REQUESTS_SYNC_EVENT } from './constants';

const originalFetch = window.fetch.bind(window);

let savedRequests: Array<StoredRequestData> = [];

window.addEventListener(SAVED_REQUESTS_SYNC_EVENT, (event) => {
  const { requests } = (event as CustomEvent<{ requests: Array<StoredRequestData> }>).detail;
  savedRequests = requests;
});

function resolveFetchUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') {
    return new URL(input, window.location.href).href;
  }

  if (input instanceof URL) {
    return input.href;
  }

  if (input instanceof Request) {
    return input.url;
  }

  return String(input);
}

function resolveFetchMethod(input: RequestInfo | URL, init?: RequestInit): string {
  if (init?.method) {
    return init.method.toUpperCase();
  }

  if (input instanceof Request) {
    return input.method.toUpperCase();
  }

  return 'GET';
}

function findMatchingRequest(url: string, method: string): StoredRequestData | undefined {
  return savedRequests.find(
    (request) =>
      request.enabled
      && request.method.toUpperCase() === method
      && matchesUrlPattern(url, request.url),
  );
}

function createMockResponse(request: StoredRequestData): Response {
  const parsedHeaders = tryParseJson<Record<string, string>>(request.headers ?? '');
  const headers = new Headers();

  if (parsedHeaders) {
    for (const [key, value] of Object.entries(parsedHeaders)) {
      headers.set(key, String(value));
    }
  }

  const rawBody = request.body?.trim() ?? '';
  const parsedBody = tryParseJson(rawBody);
  const body = parsedBody !== undefined && parsedBody !== null
    ? typeof parsedBody === 'string'
      ? parsedBody
      : JSON.stringify(parsedBody)
    : rawBody || '{}';

  if (body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return new Response(body, {
    status: request.statusCode,
    headers,
  });
}

async function interceptFetch(...args: Parameters<typeof window.fetch>) {
  try {
    const [input, init] = args;
    const url = resolveFetchUrl(input);
    const method = resolveFetchMethod(input, init);
    const match = findMatchingRequest(url, method);

    if (match) {
      console.log('[Mockingbird] fetch mocked', { url, method, match });
      return createMockResponse(match);
    }

    return originalFetch(...args);
  } catch (error) {
    console.error('[Mockingbird] error fetching', error);
    return originalFetch(...args);
  }
}

window.addEventListener(INTERCEPT_ACTIVATION_EVENT, (event) => {
  const { active } = (event as CustomEvent<{ active: boolean }>).detail;

  if (active) {
    window.fetch = interceptFetch;
  } else {
    window.fetch = originalFetch;
  }
});
