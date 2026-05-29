import { AppDescription } from '@maxigarcia/mockingbird-shared/components/app-description';
import { Brand } from '@maxigarcia/mockingbird-shared/components/brand';
import { GithubLink } from '@maxigarcia/mockingbird-shared/components/github-link';
import { RequestEditor } from '@maxigarcia/mockingbird-shared/components/request-editor/request-editor';
import { useRequestFormStore } from '@/store/request-form';
import { version } from '../../package.json';

export function App() {
  return (
    <>
      <header className="space-y-4 p-4">
        <div className="flex items-center gap-4">
          <Brand />
          <GithubLink version={version} />
        </div>
        <AppDescription />
      </header>
      <section className="p-4">
        <RequestEditor storeFn={useRequestFormStore} />
      </section>
    </>
  );
}
