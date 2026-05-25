import type { HttpMethod } from '../../types';
import type { SelectProps } from '../shared';
import { HTTP_METHODS } from '../../types';
import { Select } from '../shared';

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
