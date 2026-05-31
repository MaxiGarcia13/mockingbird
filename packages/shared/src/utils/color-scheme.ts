export type ColorScheme = 'light' | 'dark';

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

function resolveSystemColorScheme(): ColorScheme {
  return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light';
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

export function initColorScheme(): () => void {
  const syncColorSchemeClass = () => {
    const scheme = resolveSystemColorScheme();
    document.documentElement.classList.toggle('dark', scheme === 'dark');
    document.documentElement.classList.remove('light');
  };

  syncColorSchemeClass();

  const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
  mediaQuery.addEventListener('change', syncColorSchemeClass);

  return () => {
    mediaQuery.removeEventListener('change', syncColorSchemeClass);
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
