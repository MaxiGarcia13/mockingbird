import type { HttpMethod } from '@maxigarcia/mockingbird-types';
import type { ComponentProps } from 'react';
import { HTTP_METHODS } from '@maxigarcia/mockingbird-types';
import { Select } from '../select';

type SelectProps = ComponentProps<typeof Select>;

export interface MethodSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

export function MethodSelect({ value, onChange, ...props }: MethodSelectProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      aria-label="HTTP method"
      {...props}
    >
      {HTTP_METHODS.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </Select>
  );
}
