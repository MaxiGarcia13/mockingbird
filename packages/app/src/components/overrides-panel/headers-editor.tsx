import type { ComponentProps } from 'react';
import { debounce } from '@maxigarcia/js-utils';
import { useRequestFormStore } from '@/store/request-form';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface HeadersEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function HeadersEditor({ ...props }: HeadersEditorProps) {
  const headers = useRequestFormStore((state) => state.headers);
  const setHeaders = useRequestFormStore((state) => state.setHeaders);
  const debouncedSetHeaders = debounce(setHeaders, 800);

  return (
    <LazyEditor
      value={headers}
      onChange={debouncedSetHeaders}
      path={EDITOR_PATHS.headers}
      aria-label="Override headers"
      {...props}
    />
  );
}
