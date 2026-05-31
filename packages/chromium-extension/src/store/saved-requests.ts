import { createSavedRequestsStore } from '@maxigarcia/mockingbird-shared/store/saved-requests';
import { getRequests } from '@/services/requests';

export const useSavedRequestsStore = createSavedRequestsStore(() => getRequests());
