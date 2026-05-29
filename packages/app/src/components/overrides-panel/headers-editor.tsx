import type { ComponentProps } from 'react';
import { EDITOR_PATHS, LazyEditor } from '@maxigarcia/mockingbird-shared';
import { useRequestFormStore } from '@/store/request-form';

interface HeadersEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function HeadersEditor({ ...props }: HeadersEditorProps) {
  const headers = useRequestFormStore((state) => state.headers);
  const setHeaders = useRequestFormStore((state) => state.setHeaders);

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
