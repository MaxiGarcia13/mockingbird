export function initCodeBlockCopyButtons() {
  document.querySelectorAll('[data-code-block-copy]').forEach((button) => {
    if (button instanceof HTMLButtonElement && button.dataset.initialized === 'true') {
      return;
    }

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    button.dataset.initialized = 'true';

    button.addEventListener('click', async () => {
      const block = button.closest('[data-code-block]');
      const codeElement = block?.querySelector('code');

      if (!codeElement?.textContent) {
        return;
      }

      await navigator.clipboard.writeText(codeElement.textContent.trimEnd());

      const label = button.querySelector('[data-copy-label]');

      if (!(label instanceof HTMLElement)) {
        return;
      }

      const originalLabel = label.textContent ?? 'Copy';
      label.textContent = 'Copied!';

      window.setTimeout(() => {
        label.textContent = originalLabel;
      }, 2000);
    });
  });
}

initCodeBlockCopyButtons();
document.addEventListener('astro:page-load', initCodeBlockCopyButtons);
