import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  options: RegisterOptions<T, Path<T>> | undefined;
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  register,
  options,
}: Props<T>) => (
  <div className='mb-4'>
    <label
      className='mb-2 block text-sm font-bold text-gray-700'
      htmlFor={name}
    >
      {label}
    </label>
    <input
      id={name}
      className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
      {...register(name, options)}
      type='text'
      placeholder={label}
    />
  </div>
);

export default TextInput;
