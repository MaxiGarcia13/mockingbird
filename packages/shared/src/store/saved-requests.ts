import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import { create } from 'zustand';

interface SavedRequestsStore {
  requests: Array<StoredRequestData>;
  isLoading: boolean;
  error: boolean;
  fetchRequests: () => Promise<void>;
}

export function createSavedRequestsStore(fetchRequests: () => Promise<StoredRequestData[]>) {
  return create<SavedRequestsStore>((set) => ({
    requests: [],
    isLoading: false,
    error: false,
    fetchRequests: async () => {
      set({ isLoading: true, error: false });

      try {
        const requests = await fetchRequests();
        set({ requests, isLoading: false });
      } catch {
        set({ error: true, isLoading: false });
      }
    },
  }));
}
