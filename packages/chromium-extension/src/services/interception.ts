import { INTERCEPT_ACTIVE_STORAGE_KEY } from '@/scripts/interceptor/constants';

export async function isInterceptActive(): Promise<boolean> {
  const result = await chrome.storage.local.get(INTERCEPT_ACTIVE_STORAGE_KEY);
  return result[INTERCEPT_ACTIVE_STORAGE_KEY] === true;
}

export async function setInterceptActive(active: boolean): Promise<void> {
  await chrome.storage.local.set({ [INTERCEPT_ACTIVE_STORAGE_KEY]: active });
}
