function escapeRegExp(value: string): string {
  return value.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
}

function stripHash(value: string): string {
  return value.split('#')[0] ?? value;
}

function trimTrailingSlash(value: string): string {
  if (value.endsWith('/*')) {
    return value;
  }

  return value.replace(/\/$/, '');
}

function splitPattern(value: string): { base: string; search: string | null } {
  const withoutHash = stripHash(value);
  const queryIndex = withoutHash.indexOf('?');

  if (queryIndex === -1) {
    return { base: withoutHash, search: null };
  }

  return {
    base: withoutHash.slice(0, queryIndex),
    search: withoutHash.slice(queryIndex + 1),
  };
}

function getUrlMatchParts(url: string): { base: string; search: string } {
  const withoutHash = stripHash(url);

  try {
    const parsed = new URL(withoutHash);
    const path = parsed.pathname === '/' ? '' : parsed.pathname.replace(/\/$/, '');

    return {
      base: `${parsed.protocol}//${parsed.host}${path}`,
      search: parsed.search.slice(1),
    };
  } catch {
    const { base, search } = splitPattern(withoutHash);

    return {
      base: trimTrailingSlash(base),
      search: search ?? '',
    };
  }
}

function getPathname(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.pathname === '/') {
      return '';
    }

    return parsed.pathname.replace(/\/$/, '');
  } catch {
    const { base } = splitPattern(url);
    return base.startsWith('/') ? trimTrailingSlash(base) : base;
  }
}

function wildcardPatternToRegExp(pattern: string): RegExp {
  const protocolMatch = pattern.match(/^https?:\/\//);
  const protocol = protocolMatch?.[0] ?? '';
  const remainder = protocolMatch ? pattern.slice(protocol.length) : pattern;

  const slashIndex = remainder.indexOf('/');
  const hostPattern = slashIndex === -1 ? remainder : remainder.slice(0, slashIndex);
  const pathPattern = slashIndex === -1 ? '' : remainder.slice(slashIndex);

  const rgx = (str: string) => str.split('*').map(escapeRegExp).join('.*');

  const hostRegex = rgx(hostPattern);
  const pathRegex = rgx(pathPattern);

  const hasExplicitPort = hostPattern.includes(':') && !hostPattern.includes('*');
  const portRegex = hasExplicitPort ? '' : '(?::\\d+)?';

  if (protocol) {
    return new RegExp(`^${escapeRegExp(protocol)}${hostRegex}${portRegex}${pathRegex}$`);
  }

  return new RegExp(`^${hostRegex}${pathRegex}$`);
}

function matchesGlob(text: string, pattern: string): boolean {
  const candidates = pattern.endsWith('/*')
    ? [pattern, pattern.slice(0, -2)]
    : [pattern];

  return candidates.some((candidate) => wildcardPatternToRegExp(trimTrailingSlash(candidate)).test(text));
}

function matchSearch(urlSearch: string, patternSearch: string | null): boolean {
  if (patternSearch === null) {
    return true;
  }

  if (patternSearch === '' || patternSearch === '*') {
    return true;
  }

  return matchesGlob(urlSearch, patternSearch);
}

function matchBase(urlBase: string, patternBase: string): boolean {
  const isPathOnly = patternBase.startsWith('/');

  if (isPathOnly) {
    const urlPath = getPathname(urlBase.startsWith('http') ? urlBase : `https://local${urlBase}`);
    return matchesGlob(urlPath, patternBase);
  }

  if (patternBase.includes('*')) {
    return matchesGlob(urlBase, patternBase);
  }

  return trimTrailingSlash(urlBase) === trimTrailingSlash(patternBase);
}

/**
 * Returns true when `url` matches a saved request URL pattern.
 * Patterns support `*` as a wildcard for any sequence of characters.
 *
 * Path-only patterns (e.g. `/api/*`) are matched against the request pathname.
 * A trailing `/*` also matches the base URL without a path segment.
 * Query strings are matched when present in the pattern (e.g. `?test=hola` or `?test=*`).
 *
 * @example
 * matchesUrlPattern('https://example.test.com', 'https://example.*.com/*') // true
 * matchesUrlPattern('https://example.test.com/test', 'https://example.*.com/*') // true
 * matchesUrlPattern('http://localhost:5173/api/users', '/api/*') // true
 */
export function matchesUrlPattern(url: string, pattern: string): boolean {
  const urlParts = getUrlMatchParts(url);
  const patternParts = splitPattern(pattern);

  if (!matchBase(urlParts.base, patternParts.base)) {
    return false;
  }

  return matchSearch(urlParts.search, patternParts.search);
}
