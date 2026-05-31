import {
  INTERCEPT_ACTIVATION_EVENT,
  INTERCEPT_ACTIVE_STORAGE_KEY,
  SAVED_REQUESTS_STORAGE_KEY,
  SAVED_REQUESTS_SYNC_EVENT,
} from './constants';

function notifyPage(active: boolean) {
  window.dispatchEvent(new CustomEvent(INTERCEPT_ACTIVATION_EVENT, { detail: { active } }));
}

function notifySavedRequests(requests: unknown) {
  window.dispatchEvent(new CustomEvent(SAVED_REQUESTS_SYNC_EVENT, { detail: { requests } }));
}

async function syncActivationFromStorage() {
  const result = await chrome.storage.local.get(INTERCEPT_ACTIVE_STORAGE_KEY);
  notifyPage(result[INTERCEPT_ACTIVE_STORAGE_KEY] === true);
}

async function syncSavedRequestsFromStorage() {
  const result = await chrome.storage.local.get(SAVED_REQUESTS_STORAGE_KEY);
  const requests = result[SAVED_REQUESTS_STORAGE_KEY];
  notifySavedRequests(Array.isArray(requests) ? requests : []);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') {
    return;
  }

  if (changes[INTERCEPT_ACTIVE_STORAGE_KEY]) {
    notifyPage(changes[INTERCEPT_ACTIVE_STORAGE_KEY].newValue === true);
  }

  if (changes[SAVED_REQUESTS_STORAGE_KEY]) {
    const requests = changes[SAVED_REQUESTS_STORAGE_KEY].newValue;
    notifySavedRequests(Array.isArray(requests) ? requests : []);
  }
});

void syncActivationFromStorage();
void syncSavedRequestsFromStorage();
