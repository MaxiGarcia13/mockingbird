import { createSavedRequestsStore } from '@maxigarcia/mockingbird-shared/store/saved-requests';
import { getRequests } from '@/services/request';

export const useSavedRequestsStore = createSavedRequestsStore(() => getRequests({}));
