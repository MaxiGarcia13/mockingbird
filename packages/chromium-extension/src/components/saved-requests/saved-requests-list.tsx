import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import { Button } from '@maxigarcia/mockingbird-shared/components/button';
import { PlusIcon } from '@maxigarcia/mockingbird-shared/components/icons/plus';
import { SavedRequestsList as SharedSavedRequestsList } from '@maxigarcia/mockingbird-shared/components/saved-requests';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { SavedRequestItem } from './saved-request-item';

interface SavedRequestsListProps {
  onNewRequest: () => void;
  onRequestClick: (request: StoredRequestData) => void;
}

export function SavedRequestsList({ onNewRequest, onRequestClick }: SavedRequestsListProps) {
  const setRequest = useRequestFormStore((state) => state.setRequest);

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden py-1">
      <div className="flex shrink-0 justify-end px-4">
        <Button onClick={onNewRequest} className="gap-2">
          <PlusIcon className="size-4" />
          New request
        </Button>
      </div>
      <SharedSavedRequestsList
        className="min-h-0 flex-1"
        storeFn={useSavedRequestsStore}
        ItemComponent={(props) => (
          <SavedRequestItem
            {...props}
            onClick={() => {
              setRequest(props.request);
              onRequestClick(props.request);
            }}
          />
        )}
      />
    </section>
  );
}
