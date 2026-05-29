import { OverridesPanel as SharedOverridesPanel } from '@maxigarcia/mockingbird-shared/components/overrides-panel';
import { useRequestFormStore } from '@/store/request-form';

export interface OverridesData {
  headers: string;
  response: string;
}

export function OverridesPanel({ className }: { className?: string }) {
  return (
    <SharedOverridesPanel className={className} storeFn={useRequestFormStore} />
  );
}
