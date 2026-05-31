import {
  initColorScheme,
  toggleColorScheme,
} from '@maxigarcia/mockingbird-shared/utils/color-scheme';
import { onCircularRevealAnimation } from '@maxigarcia/view-transitions';

function updateToggleLabel(button: HTMLButtonElement) {
  const isDark = document.documentElement.classList.contains('dark');
  button.setAttribute(
    'aria-label',
    isDark ? 'Switch to light mode' : 'Switch to dark mode',
  );
}

export function initThemeToggleButtons() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    if (button instanceof HTMLButtonElement && button.dataset.initialized === 'true') {
      return;
    }

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    button.dataset.initialized = 'true';
    updateToggleLabel(button);

    button.addEventListener('click', (event) => {
      onCircularRevealAnimation(
        () => {
          toggleColorScheme();
          updateToggleLabel(button);
        },
        { clientX: event.clientX, clientY: event.clientY },
      );
    });
  });
}

initColorScheme({ defaultScheme: 'dark' });
initThemeToggleButtons();
document.addEventListener('astro:page-load', initThemeToggleButtons);
