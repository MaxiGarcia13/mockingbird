export const extensionUrlExamples = [
  {
    pattern: 'https://api.example.com/users',
    request: 'https://api.example.com/users',
    matches: true,
    notes: 'Exact URL',
  },
  {
    pattern: 'https://api.example.com/users',
    request: 'https://api.example.com/users/1',
    matches: false,
    notes: 'Path must match exactly',
  },
  {
    pattern: 'http://localhost*/api/*',
    request: 'http://localhost:5173/api/users',
    matches: true,
    notes: 'Wildcard port and path',
  },
  {
    pattern: 'http://localhost:5173/api',
    request: 'http://localhost:3000/api',
    matches: false,
    notes: 'Port must match when specified',
  },
  {
    pattern: 'https://example.*.com/*',
    request: 'https://example.test.com/foo',
    matches: true,
    notes: 'Wildcard subdomain',
  },
  {
    pattern: 'https://example.com/*',
    request: 'https://example.com',
    matches: true,
    notes: 'Trailing /* includes base URL',
  },
  {
    pattern: 'https://example.com?q=*&test=hola',
    request: 'https://example.com?q=foo&test=hola',
    matches: true,
    notes: 'Wildcard query params',
  },
];
