import type { HttpStatusCode } from '@maxigarcia/mockingbird-types';
import type { ComponentProps } from 'react';
import { Select } from '@maxigarcia/mockingbird-shared/components/select';
import { HTTP_STATUS_CODES } from '@maxigarcia/mockingbird-types';

type SelectProps = ComponentProps<typeof Select>;

export interface StatusCodeSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  value: HttpStatusCode;
  onChange: (statusCode: HttpStatusCode) => void;
}

export function StatusCodeSelect({ value, onChange, ...props }: StatusCodeSelectProps) {
  return (
    <Select
      value={value}
      onChange={(next) => onChange(Number(next) as HttpStatusCode)}
      aria-label="Response status code"
      {...props}
    >
      {HTTP_STATUS_CODES.map(({ code, label }) => (
        <option key={code} value={code}>
          {code}
          {' '}
          {label}
        </option>
      ))}
    </Select>
  );
}
