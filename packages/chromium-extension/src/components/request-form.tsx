import { OverridesPanel } from '@maxigarcia/mockingbird-shared/components/overrides-panel';
import { RequestEditor } from '@maxigarcia/mockingbird-shared/components/request-editor/request-editor';
import { useRequestFormStore } from '@/store/request-form';

export function RequestForm() {
  return (
    <>
      <RequestEditor storeFn={useRequestFormStore} />
      <OverridesPanel storeFn={useRequestFormStore} className="flex-1 overflow-hidden" />
    </>
  );
}
