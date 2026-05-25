import { Aside } from './aside';
import { OverridesPanel } from './overrides-panel';
import { RequestEditor } from './request-editor';

export function App() {
  return (
    <>
      <Aside />
      <div className="flex flex-col gap-4 py-2 pr-4">
        <RequestEditor />
        <OverridesPanel />
      </div>
    </>
  );
}
