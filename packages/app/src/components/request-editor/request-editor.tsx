import { cn } from '@maxigarcia/js-utils';
import { Input } from '@maxigarcia/mockingbird-shared/components/input';
import { useRequestFormStore } from '@/store/request-form';
import { MethodSelect } from './method-select';
import { StatusCodeSelect } from './status-code-select';

export function RequestEditor() {
  const method = useRequestFormStore((state) => state.method);
  const url = useRequestFormStore((state) => state.url);
  const statusCode = useRequestFormStore((state) => state.statusCode);
  const isValidUrl = useRequestFormStore((state) => state.isValidUrl);
  const setMethod = useRequestFormStore((state) => state.setMethod);
  const setUrl = useRequestFormStore((state) => state.setUrl);
  const setStatusCode = useRequestFormStore((state) => state.setStatusCode);

  return (
    <section className="flex items-center gap-2">
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
