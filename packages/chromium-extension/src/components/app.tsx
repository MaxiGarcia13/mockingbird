import { AppDescription } from '@maxigarcia/mockingbird-shared/components/app-description';
import { Brand } from '@maxigarcia/mockingbird-shared/components/brand';
import { GithubLink } from '@maxigarcia/mockingbird-shared/components/github-link';
import { version } from '../../package.json';

export function App() {
  return (
    <>
      <header className="space-y-4 px-4 py-2">
        <div className="flex items-center gap-4">
          <Brand />
          <GithubLink version={version} />
        </div>
        <AppDescription />
      </header>
    </>
  );
}
