import { createSavedRequestsStore } from '@maxigarcia/mockingbird-shared/store/saved-requests';
import { getRequests } from '@/services/saved-requests';

export const useSavedRequestsStore = createSavedRequestsStore(() => getRequests());
