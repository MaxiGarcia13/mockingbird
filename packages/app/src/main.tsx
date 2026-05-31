import { initColorScheme } from '@maxigarcia/mockingbird-shared/utils/color-scheme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/components/app';
import './index.css';

initColorScheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
