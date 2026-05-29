import type { ComponentProps } from 'react';
import { EDITOR_PATHS, LazyEditor } from '@maxigarcia/mockingbird-shared/components/editor';
import { useRequestFormStore } from '@/store/request-form';

interface ResponseEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function ResponseEditor({ ...props }: ResponseEditorProps) {
  const body = useRequestFormStore((state) => state.body);
  const setBody = useRequestFormStore((state) => state.setBody);

  return (
    <LazyEditor
      value={body ?? '{}'}
      onChange={setBody}
      path={EDITOR_PATHS.body}
      aria-label="Override response body"
      {...props}
    />
  );
}
