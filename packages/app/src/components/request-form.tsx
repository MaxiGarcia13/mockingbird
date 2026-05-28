import { OverridesPanel } from './overrides-panel';
import { RequestEditor } from './request-editor';
import { SaveRequestButton } from './save-request-button';

export function RequestForm() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden py-2 pr-4">
      <RequestEditor />
      <OverridesPanel />
      <div className="flex justify-end">
        <SaveRequestButton className="w-full max-w-32" />
      </div>
    </div>
  );
}
