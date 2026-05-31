export type ColorScheme = 'light' | 'dark';

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';
const STORAGE_KEY = 'mockingbird-color-scheme';

const subscribers = new Set<(scheme: ColorScheme) => void>();

function readStored(): ColorScheme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'light' || value === 'dark') {
      return value;
    }
  } catch {
    // localStorage may be unavailable (e.g. private browsing)
  }

  return null;
}

function writeStored(scheme: ColorScheme): void {
  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    // ignore write failures
  }
}

function systemScheme(): ColorScheme {
  return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light';
}

let preference: ColorScheme | null = readStored();
let configuredDefault: ColorScheme | null = null;

export type ColorSchemeInitOptions = {
  /** Used when no value is stored in localStorage. Defaults to system preference. */
  defaultScheme?: ColorScheme;
};

function fallbackScheme(): ColorScheme {
  return configuredDefault ?? systemScheme();
}

function effectiveScheme(): ColorScheme {
  return preference ?? fallbackScheme();
}

function applyToDom(scheme: ColorScheme): void {
  document.documentElement.classList.toggle('dark', scheme === 'dark');
  document.documentElement.classList.toggle('light', scheme === 'light');
}

function notifySubscribers(): void {
  const scheme = effectiveScheme();
  subscribers.forEach((notify) => notify(scheme));
}

export function getColorScheme(): ColorScheme {
  return effectiveScheme();
}

export function setColorScheme(scheme: ColorScheme): void {
  preference = scheme;
  writeStored(scheme);
  applyToDom(scheme);
  notifySubscribers();
}

export function toggleColorScheme(): void {
  setColorScheme(effectiveScheme() === 'dark' ? 'light' : 'dark');
}

function handleSystemSchemeChange(): void {
  if (preference !== null || configuredDefault !== null) {
    return;
  }

  applyToDom(systemScheme());
  notifySubscribers();
}

export function initColorScheme(options?: ColorSchemeInitOptions): () => void {
  configuredDefault = options?.defaultScheme ?? null;
  preference = readStored();
  applyToDom(effectiveScheme());

  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
  mediaQuery.addEventListener('change', handleSystemSchemeChange);

  return () => {
    mediaQuery.removeEventListener('change', handleSystemSchemeChange);
  };
}

export function subscribeToColorScheme(onChange: (scheme: ColorScheme) => void): () => void {
  subscribers.add(onChange);

  return () => {
    subscribers.delete(onChange);
  };
}
