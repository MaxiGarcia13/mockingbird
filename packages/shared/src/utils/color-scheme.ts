export type ColorScheme = 'light' | 'dark';

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';
const STORAGE_KEY = 'mockingbird-color-scheme';

function resolveSystemColorScheme(): ColorScheme {
  return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light';
}

function getStoredColorScheme(): ColorScheme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // localStorage may be unavailable (e.g. private browsing)
  }

  return null;
}

function storeColorScheme(scheme: ColorScheme): void {
  try {
    localStorage.setItem(STORAGE_KEY, scheme);
  } catch {
    // ignore write failures
  }
}

function applyColorSchemeClass(scheme: ColorScheme): void {
  document.documentElement.classList.toggle('dark', scheme === 'dark');
  document.documentElement.classList.toggle('light', scheme === 'light');
}

export function getColorScheme(): ColorScheme {
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }

  if (document.documentElement.classList.contains('light')) {
    return 'light';
  }

  return resolveSystemColorScheme();
}

export function setColorScheme(scheme: ColorScheme): void {
  storeColorScheme(scheme);
  applyColorSchemeClass(scheme);
}

export function toggleColorScheme(): void {
  setColorScheme(getColorScheme() === 'dark' ? 'light' : 'dark');
}

export function initColorScheme(): () => void {
  const stored = getStoredColorScheme();

  if (stored) {
    applyColorSchemeClass(stored);
  } else {
    applyColorSchemeClass(resolveSystemColorScheme());
  }

  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
  const syncFromSystem = () => {
    if (getStoredColorScheme()) {
      return;
    }

    applyColorSchemeClass(resolveSystemColorScheme());
  };

  mediaQuery.addEventListener('change', syncFromSystem);

  return () => {
    mediaQuery.removeEventListener('change', syncFromSystem);
  };
}

export function subscribeToColorScheme(onChange: (scheme: ColorScheme) => void): () => void {
  const handleChange = () => {
    onChange(getColorScheme());
  };

  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
  mediaQuery.addEventListener('change', handleChange);

  const observer = new MutationObserver(handleChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
    observer.disconnect();
  };
}
