import type { RequestData } from '@root/types';
import type { ComponentProps } from 'react';
import { tryParseJson } from '@maxigarcia/js-utils';
import { useRequestStore } from '@/store';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface ResponseEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function ResponseEditor({ ...props }: ResponseEditorProps) {
  const body = useRequestStore((state) => state.body);
  const setBody = useRequestStore((state) => state.setBody);

  return (
    <LazyEditor
      value={JSON.stringify(body, null, 2)}
      onChange={(value) => {
        const parsed = tryParseJson<RequestData['body']>(value);

        setBody(parsed ?? {});
      }}
      path={EDITOR_PATHS.body}
      aria-label="Override response body"
      {...props}
    />
  );
}
