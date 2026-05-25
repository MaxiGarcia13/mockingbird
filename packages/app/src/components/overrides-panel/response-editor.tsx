import type { RequestData } from '@root/types';
import type { ComponentProps } from 'react';
import { tryParseJson } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { LazyEditor } from '../editor';

interface ResponseEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange'> {
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
      aria-label="Override response body"
      {...props}
    />
  );
}
