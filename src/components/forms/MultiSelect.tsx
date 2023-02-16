import React from 'react';

interface Props<T extends { name: string }> {
  choices: T[];
  selectedChoices: T[];
  setSelectedChoices: (choices: T[]) => void;
}

const MultiSelect = <T extends { name: string }>({
  choices,
  selectedChoices,
  setSelectedChoices,
}: Props<T>) => {
  const onChangeFn =
    (choice: T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked)
        setSelectedChoices(selectedChoices.concat([choice]));
      else setSelectedChoices(selectedChoices.filter((x) => x !== choice));
    };

  return (
    <div className='flex flex-wrap justify-center'>
      {choices.map((choice, i) => (
        <div
          key={i}
          className='my-2 mx-1 flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700'
        >
          <input
            id='bordered-checkbox-1'
            type='checkbox'
            checked={selectedChoices.includes(choice)}
            value=''
            name='bordered-checkbox'
            onChange={onChangeFn(choice)}
            className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
          />
          <label
            htmlFor='bordered-checkbox-1'
            className='ml-2 w-full py-4 pr-4 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            {choice.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultiSelect;
