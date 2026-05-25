import type { RequestData } from '@root/types';
import type { ComponentProps } from 'react';
import { tryParseJson } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface ResponseEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function ResponseEditor({ ...props }: ResponseEditorProps) {
  const [body, setBody] = useState<RequestData['body']>({});

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
