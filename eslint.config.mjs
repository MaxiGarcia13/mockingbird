import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { eslintConfig } from '@maxigarcia/eslint-config';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default eslintConfig(
  {
    typescript: true,
    tailwindcss: true,
    react: true,
    astro: true,
  },
  {
    settings: {
      tailwindcss: {
        config: join(rootDir, 'packages/app/src/index.css'),
      },
    },
  },
);
