import type { ComponentProps } from 'react';
import { SaveRequestFormButton } from '@maxigarcia/mockingbird-shared/components/save-request-form-button';
import { saveRequest, updateRequest } from '@/services/request';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';

type SaveRequestButtonProps = Omit<
  ComponentProps<typeof SaveRequestFormButton>,
'storeFn' | 'fetchRequests' | 'onSave' | 'onUpdate'
>;

export function SaveRequestButton(props: SaveRequestButtonProps) {
  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);

  return (
    <SaveRequestFormButton
      {...props}
      storeFn={useRequestFormStore}
      onSave={async (request) => {
        await saveRequest(request);
        fetchRequests();
      }}
      onUpdate={async (id, request) => {
        await updateRequest(id, request);
        fetchRequests();
      }}
    />
  );
}
