import { RequestEditor as SharedRequestEditor } from '@maxigarcia/mockingbird-shared/components/request-editor/request-editor';
import { useRequestFormStore } from '@/store/request-form';

export function RequestEditor() {
  return (
    <SharedRequestEditor storeFn={useRequestFormStore} />
  );
}
