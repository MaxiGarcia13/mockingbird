import { AppDescription } from '@maxigarcia/mockingbird-shared/components/app-description';
import { Brand } from '@maxigarcia/mockingbird-shared/components/brand';
import { GithubLink } from '@maxigarcia/mockingbird-shared/components/github-link';
import { version } from '../../package.json';
import { RequestForm } from './request-form';

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
      <section className="flex h-full flex-col gap-4 overflow-hidden p-4">
        <RequestForm />
      </section>
    </>
  );
}
