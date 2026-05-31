import { INTERCEPT_ACTIVATION_EVENT, INTERCEPT_ACTIVE_STORAGE_KEY } from './constants';

function notifyPage(active: boolean) {
  window.dispatchEvent(new CustomEvent(INTERCEPT_ACTIVATION_EVENT, { detail: { active } }));
}

async function syncActivationFromStorage() {
  const result = await chrome.storage.local.get(INTERCEPT_ACTIVE_STORAGE_KEY);
  notifyPage(result[INTERCEPT_ACTIVE_STORAGE_KEY] === true);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes[INTERCEPT_ACTIVE_STORAGE_KEY]) {
    return;
  }

  notifyPage(changes[INTERCEPT_ACTIVE_STORAGE_KEY].newValue === true);
});

void syncActivationFromStorage();
