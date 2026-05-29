import type { json } from 'monaco-editor';

// JSON Schema describing common HTTP request headers.
// Used by monaco-json to suggest header names as keys and typical values
// inside the headers editor.
export const requestHeadersSchema: json.JSONSchema = {
  type: 'object',
  title: 'HTTP request headers',
  additionalProperties: {
    type: 'string',
  },
  properties: {
    'Accept': {
      type: 'string',
      description: 'Media type(s) that are acceptable for the response.',
      examples: ['application/json', 'text/html', 'text/plain', '*/*'],
    },
    'Accept-Encoding': {
      type: 'string',
      description: 'Acceptable content codings for the response.',
      examples: ['gzip', 'deflate', 'br', 'identity', 'gzip, deflate, br'],
    },
    'Accept-Language': {
      type: 'string',
      description: 'List of acceptable human languages for the response.',
      examples: ['en-US', 'en', 'es-ES', 'fr-FR'],
    },
    'Authorization': {
      type: 'string',
      description: 'Authentication credentials for HTTP authentication.',
      examples: ['Bearer ', 'Basic ', 'Digest '],
    },
    'Cache-Control': {
      type: 'string',
      description: 'Directives for caching mechanisms in requests.',
      examples: ['no-cache', 'no-store', 'max-age=0', 'must-revalidate'],
    },
    'Connection': {
      type: 'string',
      description: 'Control options for the current connection.',
      enum: ['keep-alive', 'close', 'upgrade'],
    },
    'Content-Length': {
      type: 'string',
      description: 'The length of the request body in octets.',
    },
    'Content-Type': {
      type: 'string',
      description: 'The media type of the request body.',
      examples: [
        'application/json',
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/plain',
        'text/html',
        'application/xml',
      ],
    },
    'Cookie': {
      type: 'string',
      description: 'An HTTP cookie previously sent by the server with Set-Cookie.',
    },
    'DNT': {
      type: 'string',
      description: 'Do Not Track preference.',
      enum: ['0', '1'],
    },
    'From': {
      type: 'string',
      description: 'The email address of the user making the request.',
    },
    'Host': {
      type: 'string',
      description: 'The domain name of the server, and optionally the TCP port number.',
    },
    'If-Match': {
      type: 'string',
      description: 'Perform the action only if the client supplied entity matches the same entity on the server.',
    },
    'If-Modified-Since': {
      type: 'string',
      description: 'Allows a 304 Not Modified to be returned if content is unchanged.',
    },
    'If-None-Match': {
      type: 'string',
      description: 'Allows a 304 Not Modified to be returned if content is unchanged, based on ETag.',
    },
    'If-Range': {
      type: 'string',
      description: 'If the entity is unchanged, send the missing part(s); otherwise, send the entire entity.',
    },
    'If-Unmodified-Since': {
      type: 'string',
      description: 'Only send the response if the entity has not been modified since a specific time.',
    },
    'Origin': {
      type: 'string',
      description: 'Initiates a request for cross-origin resource sharing.',
    },
    'Pragma': {
      type: 'string',
      description: 'Implementation-specific headers that may have various effects.',
      examples: ['no-cache'],
    },
    'Range': {
      type: 'string',
      description: 'Request only part of an entity. Bytes are numbered from 0.',
      examples: ['bytes=0-999'],
    },
    'Referer': {
      type: 'string',
      description: 'The address of the previous web page from which a link to the requested page was followed.',
    },
    'TE': {
      type: 'string',
      description: 'The transfer encodings the user agent is willing to accept.',
      examples: ['trailers', 'compress', 'deflate', 'gzip'],
    },
    'Upgrade': {
      type: 'string',
      description: 'Asks the server to upgrade to another protocol.',
      examples: ['websocket', 'h2c'],
    },
    'User-Agent': {
      type: 'string',
      description: 'The user agent string identifying the client.',
    },
    'Via': {
      type: 'string',
      description: 'Informs the server of proxies through which the request was sent.',
    },
    'Warning': {
      type: 'string',
      description: 'A general warning about possible problems with the entity body.',
    },
    'X-Api-Key': {
      type: 'string',
      description: 'API key for authenticating with the server.',
    },
    'X-CSRF-Token': {
      type: 'string',
      description: 'Token used to prevent cross-site request forgery.',
    },
    'X-Forwarded-For': {
      type: 'string',
      description: 'Originating IP address of a client connecting through a proxy or load balancer.',
    },
    'X-Forwarded-Host': {
      type: 'string',
      description: 'The original host requested by the client in the Host HTTP request header.',
    },
    'X-Forwarded-Proto': {
      type: 'string',
      description: 'The protocol (HTTP or HTTPS) used by the client to connect to the proxy.',
      enum: ['http', 'https'],
    },
    'X-Requested-With': {
      type: 'string',
      description: 'Mainly used to identify Ajax requests.',
      examples: ['XMLHttpRequest'],
    },
  },
};
