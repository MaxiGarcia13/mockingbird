import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import { create } from 'zustand';
import { getRequests } from '@/services/request';

interface SavedRequestsStore {
  requests: Array<StoredRequestData>;
  isLoading: boolean;
  error: boolean;
  fetchRequests: () => Promise<void>;
}

export const useSavedRequestsStore = create<SavedRequestsStore>((set) => ({
  requests: [],
  isLoading: false,
  error: false,
  fetchRequests: async () => {
    set({ isLoading: true, error: false });

    try {
      const requests = await getRequests({});
      set({ requests, isLoading: false });
    } catch {
      set({ error: true, isLoading: false });
    }
  },
}));
