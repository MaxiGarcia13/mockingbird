import { describe, expect, it } from 'vitest';

import { matchesUrlPattern } from './url-match.ts';

describe('matchesUrlPattern', () => {
  it('matches wildcard host patterns with optional path', () => {
    const pattern = 'https://example.*.com/*';

    expect(matchesUrlPattern('https://example.test.com', pattern)).toBe(true);
    expect(matchesUrlPattern('https://example.test.com/test', pattern)).toBe(true);
    expect(matchesUrlPattern('https://other.test.com', pattern)).toBe(false);
  });

  it('matches path-only patterns against the request pathname', () => {
    expect(matchesUrlPattern('http://localhost:5173/api/users', '/api/*')).toBe(true);
    expect(matchesUrlPattern('http://localhost:5173/api', '/api/*')).toBe(true);
    expect(matchesUrlPattern('http://localhost:5173/v1/api/users', '/api/*')).toBe(false);
  });

  it('matches exact URLs when the pattern has no wildcards', () => {
    const pattern = 'https://api.example.com/users';

    expect(matchesUrlPattern('https://api.example.com/users', pattern)).toBe(true);
    expect(matchesUrlPattern('https://api.example.com/users/', pattern)).toBe(true);
    expect(matchesUrlPattern('https://api.example.com/users/1', pattern)).toBe(false);
  });

  it('treats trailing /* as matching the base URL without a path segment', () => {
    const pattern = 'https://example.com/*';

    expect(matchesUrlPattern('https://example.com', pattern)).toBe(true);
    expect(matchesUrlPattern('https://example.com/', pattern)).toBe(true);
    expect(matchesUrlPattern('https://example.com/items', pattern)).toBe(true);
  });

  it('matches query strings when present in the pattern', () => {
    expect(matchesUrlPattern('https://example.com?q=test&test=hola', 'https://example.com?q=test&test=hola')).toBe(true);
    expect(matchesUrlPattern('https://example.com?q=other', 'https://example.com?q=test')).toBe(false);
    expect(matchesUrlPattern('https://example.com?q=anything&test=hola', 'https://example.com?q=*&test=hola')).toBe(true);
  });

  it('ignores the URL hash when matching', () => {
    expect(matchesUrlPattern('https://example.com/api#section', 'https://example.com/api')).toBe(true);
    expect(matchesUrlPattern('https://example.com/api#section', 'https://example.com/api#ignored')).toBe(true);
  });

  it('allows any port for wildcard host patterns without an explicit port', () => {
    const pattern = 'http://localhost*/api';

    expect(matchesUrlPattern('http://localhost:5173/api', pattern)).toBe(true);
    expect(matchesUrlPattern('http://localhost:3000/api', pattern)).toBe(true);
  });

  it('requires an explicit port to match when the pattern includes one', () => {
    const pattern = 'http://localhost:5173/api';

    expect(matchesUrlPattern('http://localhost:5173/api', pattern)).toBe(true);
    expect(matchesUrlPattern('http://localhost:3000/api', pattern)).toBe(false);
  });
});
