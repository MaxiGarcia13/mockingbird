import { createSavedRequestsStore } from '@maxigarcia/mockingbird-shared/store/saved-requests';

export const useSavedRequestsStore = createSavedRequestsStore(() => Promise.resolve([]));
