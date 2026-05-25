import type { RequestData } from '@root/types';
import type { ComponentProps } from 'react';
import { tryParseJson } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { EDITOR_PATHS, LazyEditor } from '../editor';

interface HeadersEditorProps
  extends Omit<ComponentProps<typeof LazyEditor>, 'value' | 'onChange' | 'path'> {
}

export function HeadersEditor({ ...props }: HeadersEditorProps) {
  const [headers, setHeaders] = useState<RequestData['headers']>({});

  return (
    <LazyEditor
      value={JSON.stringify(headers, null, 2)}
      onChange={(value) => {
        const parsed = tryParseJson<RequestData['headers']>(value);

        setHeaders(parsed ?? {});
      }}
      path={EDITOR_PATHS.headers}
      aria-label="Override headers"
      {...props}
    />
  );
}
