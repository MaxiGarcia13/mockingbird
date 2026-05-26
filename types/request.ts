export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;

export type HttpMethod = (typeof HTTP_METHODS)[number];

export const HTTP_STATUS_CODES = [
  { code: 200, label: 'OK' },
  { code: 201, label: 'Created' },
  { code: 204, label: 'No Content' },
  { code: 301, label: 'Moved Permanently' },
  { code: 302, label: 'Found' },
  { code: 304, label: 'Not Modified' },
  { code: 400, label: 'Bad Request' },
  { code: 401, label: 'Unauthorized' },
  { code: 403, label: 'Forbidden' },
  { code: 404, label: 'Not Found' },
  { code: 409, label: 'Conflict' },
  { code: 422, label: 'Unprocessable Entity' },
  { code: 429, label: 'Too Many Requests' },
  { code: 500, label: 'Internal Server Error' },
  { code: 502, label: 'Bad Gateway' },
  { code: 503, label: 'Service Unavailable' },
  { code: 504, label: 'Gateway Timeout' },
] as const;

export type HttpStatusCode = (typeof HTTP_STATUS_CODES)[number]['code'];

export interface RequestData {
  method: HttpMethod;
  url: string;
  statusCode?: HttpStatusCode;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export interface StoredRequestData extends RequestData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}

export interface GetRequestsOptions {
  enabled?: boolean;
}
