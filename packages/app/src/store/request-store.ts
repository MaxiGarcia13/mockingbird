import type { HttpMethod, HttpStatusCode, RequestData } from '@root/types';
import { create } from 'zustand';

type RequiredRequestData = Required<RequestData>;

interface RequestStore extends RequiredRequestData {
  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;
  setStatusCode: (statusCode: HttpStatusCode) => void;
  setHeaders: (headers: RequiredRequestData['headers']) => void;
  setBody: (body: RequiredRequestData['body']) => void;
}

export const useRequestStore = create<RequestStore>(set => ({
  method: 'GET',
  url: '',
  statusCode: 200,
  headers: {},
  body: {},
  setMethod: method => set({ method }),
  setUrl: url => set({ url }),
  setStatusCode: statusCode => set({ statusCode }),
  setHeaders: headers => set({ headers }),
  setBody: body => set({ body }),
}));
