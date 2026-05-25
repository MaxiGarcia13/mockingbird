import { useRequestStore } from '@/store';
import { Input } from '../shared/input';
import { MethodSelect } from './method-select';
import { StatusCodeSelect } from './status-code-select';

export function RequestEditor() {
  const method = useRequestStore(state => state.method);
  const url = useRequestStore(state => state.url);
  const statusCode = useRequestStore(state => state.statusCode);
  const setMethod = useRequestStore(state => state.setMethod);
  const setUrl = useRequestStore(state => state.setUrl);
  const setStatusCode = useRequestStore(state => state.setStatusCode);

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
        autoFocus
      />
      <StatusCodeSelect
        value={statusCode}
        onChange={setStatusCode}
        className="max-w-32"
      />
    </section>
  );
}
