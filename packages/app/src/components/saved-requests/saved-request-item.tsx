import type { ComponentProps } from 'react';
import {
  SavedRequestItemAction,
  SavedRequestItem as SharedSavedRequestItem,
} from '@maxigarcia/mockingbird-shared/components/saved-requests';
import { deleteRequest, saveRequest, updateRequest } from '@/services/request';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';

type SavedRequestItemProps = Omit<ComponentProps<typeof SharedSavedRequestItem>, 'storeFn'>;

export function SavedRequestItem(props: SavedRequestItemProps) {
  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);

  return (
    <SharedSavedRequestItem
      storeFn={useRequestFormStore}
      {...props}
    >
      <SavedRequestItemAction
        request={props.request}
        fetchRequests={fetchRequests}
        deleteRequest={deleteRequest}
        saveRequest={saveRequest}
        updateRequest={updateRequest}
      />
    </SharedSavedRequestItem>
  );
}
