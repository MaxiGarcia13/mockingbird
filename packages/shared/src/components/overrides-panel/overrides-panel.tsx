import type { createRequestFormStore } from '../../store/request-form';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
import { HeadersEditor } from './headers-editor';
import { ResponseEditor } from './response-editor';

export interface OverridesData {
  headers: string;
  response: string;
}

interface OverridesPanelProps {
  className?: string;
  storeFn: ReturnType<typeof createRequestFormStore>;
}

const RESPONSE_TAB = 'response';
const HEADERS_TAB = 'headers';

export function OverridesPanel({ className, storeFn }: OverridesPanelProps) {
  const [tab, setTab] = useState<string>(RESPONSE_TAB);

  return (
    <Tabs
      value={tab}
      onChange={(value: string) => setTab(value)}
      className={className}
    >
      <TabsList>
        <TabsTrigger value={RESPONSE_TAB}>Response</TabsTrigger>
        <TabsTrigger value={HEADERS_TAB}>Headers</TabsTrigger>
      </TabsList>

      <TabsContent value={RESPONSE_TAB}>
        <ResponseEditor storeFn={storeFn} />
      </TabsContent>

      <TabsContent value={HEADERS_TAB}>
        <HeadersEditor storeFn={storeFn} />
      </TabsContent>
    </Tabs>
  );
}
