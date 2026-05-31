import { Button } from '@maxigarcia/mockingbird-shared/components/button';
import { OverridesPanel } from '@maxigarcia/mockingbird-shared/components/overrides-panel';
import { RequestEditor } from '@maxigarcia/mockingbird-shared/components/request-editor/request-editor';
import { SaveRequestFormButton } from '@maxigarcia/mockingbird-shared/components/save-request-form-button';
import { saveRequest, updateRequest } from '@/services/requests';
import { useRequestFormStore } from '@/store/request-form';

interface RequestFormProps {
  onBackToList: () => void;
}

export function RequestForm({ onBackToList }: RequestFormProps) {
  const reset = useRequestFormStore((state) => state.reset);

  const handleBackToList = () => {
    reset();
    onBackToList();
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
      <RequestEditor storeFn={useRequestFormStore} />
      <OverridesPanel storeFn={useRequestFormStore} className="flex-1 overflow-hidden" />
      <div className="flex justify-end gap-2">
        <Button onClick={handleBackToList}>Back to list</Button>

        <SaveRequestFormButton
          className="w-full max-w-32"
          storeFn={useRequestFormStore}
          onSave={async (request) => {
            await saveRequest(request);
            onBackToList();
          }}
          onUpdate={async (id, request) => {
            await updateRequest(id, request);
            onBackToList();
          }}
        />
      </div>
    </section>
  );
}
