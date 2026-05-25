import type { HttpMethod, RequestData } from '@root/types';
import { useState } from 'react';
import { Input } from '../shared';
import { MethodSelect } from './method-select';

export interface RequestEditorProps {
  initialMethod?: HttpMethod;
  initialUrl?: string;
  onChange?: (data: RequestData) => void;
}

export function RequestEditor({ initialMethod = 'GET', initialUrl = '', onChange }: RequestEditorProps) {
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [url, setUrl] = useState(initialUrl);

  const handleMethodChange = (nextMethod: HttpMethod) => {
    setMethod(nextMethod);
    onChange?.({ method: nextMethod, url });
  };

  const handleUrlChange = (nextUrl: string) => {
    setUrl(nextUrl);
    onChange?.({ method, url: nextUrl });
  };

  return (
    <section className="flex items-center gap-2">
      <MethodSelect value={method} onChange={handleMethodChange} className="max-w-32" />
      <Input
        type="url"
        value={url}
        onChange={handleUrlChange}
        placeholder="https://api.example.com/endpoint"
        aria-label="Request URL"
      />
    </section>
  );
}
