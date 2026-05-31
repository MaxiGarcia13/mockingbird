import { SavedRequestsList as SharedSavedRequestsList } from '@maxigarcia/mockingbird-shared/components/saved-requests';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { SavedRequestItem } from './saved-request-item';

export function SavedRequestsList() {
  return (
    <SharedSavedRequestsList
      storeFn={useSavedRequestsStore}
      ItemComponent={SavedRequestItem}
    />
  );
}
