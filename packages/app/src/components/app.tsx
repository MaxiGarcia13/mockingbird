import { Aside } from './aside';
import { RequestEditor } from './request-editor';

export function App() {
  return (
    <>
      <Aside />
      <div className="py-2 pr-4">
        <RequestEditor />
      </div>
    </>
  );
}
