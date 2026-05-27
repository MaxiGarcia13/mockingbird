import type { ComponentProps } from 'react';
import { useRequestFormStore } from '@/store/request-form';
import { EDITOR_PATHS, LazyEditor } from '../editor';

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
