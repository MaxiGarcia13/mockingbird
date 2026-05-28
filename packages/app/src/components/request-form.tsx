import { OverridesPanel } from './overrides-panel';
import { RequestEditor } from './request-editor';
import { SaveRequestButton } from './save-request-button';

export function RequestForm() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-4 overflow-hidden py-2 pr-4">
      <RequestEditor />
      <OverridesPanel className="overflow-hidden" />
      <div className="flex justify-end">
        <SaveRequestButton className="w-full max-w-32" />
      </div>
    </div>
  );
}
