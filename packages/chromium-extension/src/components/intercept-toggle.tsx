import { Switch } from '@maxigarcia/mockingbird-shared/components/switch';
import { Tooltip } from '@maxigarcia/mockingbird-shared/components/tooltip/tooltip';
import { useEffect, useRef, useState } from 'react';
import { INTERCEPT_ACTIVE_STORAGE_KEY } from '@/scripts/constants';
import {
  isInterceptActive,
  setInterceptActive,
} from '@/services/interception';

export function InterceptToggle() {
  const [active, setActive] = useState(false);

  const tooltipContent = active ? 'Disable all interceptions' : 'Activate all interceptions';

  useEffect(() => {
    void isInterceptActive().then((value) => {
      setActive(value);
    });
  }, []);

  return (
    <Tooltip content={tooltipContent} placement="bottom">
      <Switch
        checked={active}
        aria-label={tooltipContent}
        onChange={(checked) => {
          setActive(checked);
          void setInterceptActive(checked);
        }}
      />
    </Tooltip>
  );
}
