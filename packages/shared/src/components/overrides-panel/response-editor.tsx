import type { ComponentProps } from 'react';
import type { createRequestFormStore } from '../../store/request-form';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface ResponseEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
  storeFn: ReturnType<typeof createRequestFormStore>;
}

export function ResponseEditor({ storeFn, ...props }: ResponseEditorProps) {
  const body = storeFn((state) => state.body);
  const setBody = storeFn((state) => state.setBody);

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
