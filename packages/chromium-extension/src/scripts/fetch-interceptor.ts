import { INTERCEPT_ACTIVATION_EVENT } from './constants';

const originalFetch = window.fetch.bind(window);

async function interceptFetch(...args: Parameters<typeof window.fetch>) {
  try {
    console.log('[Mockingbird] fetch intercepted', { args });
    return originalFetch(...args);
  } catch (error) {
    console.error('[Mockingbird] error fetching', error);
    return originalFetch(...args);
  }
};

window.addEventListener(INTERCEPT_ACTIVATION_EVENT, (event) => {
  const { active } = (event as CustomEvent<{ active: boolean }>).detail;

  if (active) {
    window.fetch = interceptFetch;
  } else {
    window.fetch = originalFetch;
  }
});
