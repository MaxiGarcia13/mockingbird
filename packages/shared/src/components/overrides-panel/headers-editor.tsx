import type { ComponentProps } from 'react';
import type { createRequestFormStore } from '../../store/request-form';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface HeadersEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
  storeFn: ReturnType<typeof createRequestFormStore>;
}

export function HeadersEditor({ storeFn, ...props }: HeadersEditorProps) {
  const headers = storeFn((state) => state.headers);
  const setHeaders = storeFn((state) => state.setHeaders);

  return (
    <LazyEditor
      value={headers ?? '{}'}
      onChange={setHeaders}
      path={EDITOR_PATHS.headers}
      aria-label="Override headers"
      {...props}
    />
  );
}
