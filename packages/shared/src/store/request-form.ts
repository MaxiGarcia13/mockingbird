import type { HttpMethod, HttpStatusCode, RequestData } from '@maxigarcia/mockingbird-types';
import { isValidHttpUrl } from '@maxigarcia/js-utils';
import { create } from 'zustand';

type RequestFormState = Pick<RequestStore, 'method' | 'url' | 'statusCode' | 'headers' | 'body' | 'id'>;

interface RequestStore extends RequestData {
  id?: string;
  isValidUrl: boolean;
  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;
  setStatusCode: (statusCode: HttpStatusCode) => void;
  setHeaders: (headers: RequestData['headers']) => void;
  setBody: (body: RequestData['body']) => void;
  reset: () => void;
  isEmpty: (state: RequestStore) => boolean;
  setRequest: (request: RequestFormState) => void;
}

export const REQUEST_FORM_INITIAL_STATE: RequestFormState & Pick<RequestStore, 'isValidUrl'> = {
  method: 'GET',
  url: '',
  statusCode: 200,
  headers: '{\n \n}',
  body: '{\n \n}',
  isValidUrl: true,
  id: undefined,
};

export function createRequestFormStore(
  initialState: RequestFormState & Pick<RequestStore, 'isValidUrl'> = REQUEST_FORM_INITIAL_STATE,
) {
  return create<RequestStore>((set) => ({
    ...initialState,
    setMethod: (method) => set({ method }),
    setUrl: (url) => set({ url, isValidUrl: isValidHttpUrl(url) }),
    setStatusCode: (statusCode) => set({ statusCode }),
    setHeaders: (headers) => set({ headers }),
    setBody: (body) => set({ body }),
    reset: () => set({
      ...initialState,
    }),
    isEmpty(state: RequestStore) {
      if (!state)
        return true;

      const { method, url, statusCode, headers, body } = state;

      return method === 'GET' && url === '' && statusCode === 200 && headers === '{\n \n}' && body === '{\n \n}';
    },
    setRequest: (request) => set({
      url: request.url,
      isValidUrl: isValidHttpUrl(request.url),
      method: request.method,
      statusCode: request.statusCode,
      headers: request.headers,
      body: request.body,
      id: request.id,
    }),
  }));
}
