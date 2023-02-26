import { ForwardedRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorText from '@/components/ErrorText';

interface Props extends React.ComponentPropsWithoutRef<'select'> {
  label: string;
  options: { id: string; name: string }[];
  error?: FieldError;
}

const SelectInput = forwardRef(
  (
    { label, options, error, ...rest }: Props,
    ref: ForwardedRef<HTMLSelectElement>
  ) => (
    <div className='mb-4'>
      <label className='mb-2 block text-sm font-bold text-gray-700'>
        {label}
      </label>
      <select
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-8 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        ref={ref}
        {...rest}
      >
        <option>{`Choose a ${label}...`}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <ErrorText text={error.message || ''} />}
    </div>
  )
);

export default SelectInput;
