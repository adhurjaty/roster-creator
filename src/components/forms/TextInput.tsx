import { ForwardedRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorText from '@/components/ErrorText';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: FieldError;
}

const TextInput = forwardRef(
  ({ label, error, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) => (
    <div className='mb-4'>
      <label className='mb-2 block text-sm font-bold text-gray-700'>
        {label}
      </label>
      <input
        className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
        type='text'
        placeholder={label}
        ref={ref}
        {...rest}
      />
      {error && <ErrorText text={error.message || ''} />}
    </div>
  )
);

export default TextInput;
