import type { HttpMethod, HttpStatusCode, RequestData } from '@maxigarcia/mockingbird-types';
import { createRequestFormStore } from '@maxigarcia/mockingbird-shared/store/request-form';

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

export const useRequestFormStore = createRequestFormStore();
