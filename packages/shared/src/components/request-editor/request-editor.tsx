import type { createRequestFormStore } from '../../store/request-form';
import { cn } from '@maxigarcia/js-utils';
import { Input } from '@maxigarcia/mockingbird-shared/components/input';
import { MethodSelect } from './method-select';
import { StatusCodeSelect } from './status-code-select';

type RequestStore = ReturnType<typeof createRequestFormStore>;

export interface RequestEditorProps {
  storeFn: RequestStore;
  className?: string;
}

export function RequestEditor({ storeFn, className }: RequestEditorProps) {
  const method = storeFn((state) => state.method);
  const url = storeFn((state) => state.url);
  const statusCode = storeFn((state) => state.statusCode);
  const isValidUrl = storeFn((state) => state.isValidUrl);
  const setMethod = storeFn((state) => state.setMethod);
  const setUrl = storeFn((state) => state.setUrl);
  const setStatusCode = storeFn((state) => state.setStatusCode);

  return (
    <section className={cn('flex items-center gap-2', className)}>
      <MethodSelect
        value={method}
        onChange={setMethod}
        className="max-w-32"
      />
      <Input
        type="url"
        value={url}
        onChange={setUrl}
        placeholder="https://api.example.com/endpoint"
        aria-label="Request URL"
        aria-invalid={!isValidUrl}
        autoFocus
        className={cn(!isValidUrl && 'border-red-500!')}
      />
      <StatusCodeSelect
        value={statusCode}
        onChange={setStatusCode}
        className="max-w-32"
      />
    </section>
  );
}
