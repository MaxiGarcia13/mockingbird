import type { HttpMethod, HttpStatusCode, RequestData } from '@root/types';
import { useState } from 'react';
import { Input } from '../shared/input';
import { MethodSelect } from './method-select';
import { StatusCodeSelect } from './status-code-select';

export interface RequestEditorProps {
  initialMethod?: HttpMethod;
  initialUrl?: string;
  initialStatusCode?: HttpStatusCode;
  onChange?: (data: RequestData) => void;
}

export function RequestEditor({
  initialMethod = 'GET',
  initialUrl = '',
  initialStatusCode = 200,
  onChange,
}: RequestEditorProps) {
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [url, setUrl] = useState(initialUrl);
  const [statusCode, setStatusCode] = useState<HttpStatusCode>(initialStatusCode);

  const emit = (patch: Partial<RequestData>) => {
    onChange?.({ method, url, statusCode, ...patch });
  };

  const handleMethodChange = (nextMethod: HttpMethod) => {
    setMethod(nextMethod);
    emit({ method: nextMethod });
  };

  const handleUrlChange = (nextUrl: string) => {
    setUrl(nextUrl);
    emit({ url: nextUrl });
  };

  const handleStatusCodeChange = (nextStatusCode: HttpStatusCode) => {
    setStatusCode(nextStatusCode);
    emit({ statusCode: nextStatusCode });
  };

  return (
    <section className="flex items-center gap-2">
      <MethodSelect
        value={method}
        onChange={handleMethodChange}
        className="max-w-32"
      />
      <Input
        type="url"
        value={url}
        onChange={handleUrlChange}
        placeholder="https://api.example.com/endpoint"
        aria-label="Request URL"
      />
      <StatusCodeSelect
        value={statusCode}
        onChange={handleStatusCodeChange}
        className="max-w-32"
      />
    </section>
  );
}
