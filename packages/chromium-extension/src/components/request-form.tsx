import { OverridesPanel } from '@maxigarcia/mockingbird-shared/components/overrides-panel';
import { RequestEditor } from '@maxigarcia/mockingbird-shared/components/request-editor/request-editor';
import { SaveRequestFormButton } from '@maxigarcia/mockingbird-shared/components/save-request-form-button';
import { saveRequest, updateRequest } from '@/services/saved-requests';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';

export function RequestForm() {
  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);

  return (
    <>
      <RequestEditor storeFn={useRequestFormStore} />
      <OverridesPanel storeFn={useRequestFormStore} className="flex-1 overflow-hidden" />
      <div className="flex justify-end">
        <SaveRequestFormButton
          className="w-full max-w-32"
          storeFn={useRequestFormStore}
          fetchRequests={fetchRequests}
          onSave={saveRequest}
          onUpdate={updateRequest}
        />
      </div>
    </>
  );
}
