import type { ComponentProps } from 'react';
import { debounce } from '@maxigarcia/js-utils';
import { useRequestFormStore } from '@/store/request-form';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface ResponseEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function ResponseEditor({ ...props }: ResponseEditorProps) {
  const body = useRequestFormStore((state) => state.body);
  const setBody = useRequestFormStore((state) => state.setBody);
  const debouncedSetBody = debounce(setBody, 800);

  return (
    <LazyEditor
      value={body}
      onChange={debouncedSetBody}
      path={EDITOR_PATHS.body}
      aria-label="Override response body"
      {...props}
    />
  );
}
