import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import Button from '@/components/buttons/Button';

interface EditFormProps<T extends { name: string }> {
  value: T;
  onChange: (value: T) => void;
  onCancel: () => void;
}

interface DisplayProps {
  onEdit: () => void;
  onDelete: () => void;
}

interface Props<T extends { name: string }> {
  value: T;
  onChange: (player: T) => void;
  onDelete: (player: T) => void;
  editForm: (props: EditFormProps<T>) => JSX.Element;
  displayContent?: (props: DisplayProps) => JSX.Element;
  defaultEditMode?: boolean;
  error?: FieldError;
}

const EditDeleteRow = <T extends { name: string }>({
  value,
  defaultEditMode,
  onChange,
  onDelete,
  editForm,
  displayContent,
  error,
}: Props<T>) => {
  const [editMode, setEditMode] = useState(defaultEditMode ?? false);

  useEffect(() => {
    if (error) {
      setEditMode(true);
    }
  }, [error]);

  const localOnUpdate = (newValue: T) => {
    onChange(newValue);
    setEditMode(false);
  };

  const onCancel = () => {
    setEditMode(false);
    if (!value.name) {
      onDelete(value);
    }
  };

  const displayRow = displayContent?.({
    onEdit: () => setEditMode(true),
    onDelete: () => onDelete(value),
  }) ?? (
    <div className='flex justify-between align-middle'>
      <div className='self-center'>{value.name}</div>
      <div className='flex justify-end'>
        <Button onClick={() => setEditMode(true)}>Edit</Button>
        <Button variant='alert' onClick={() => onDelete(value)}>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <li className='w-full border-b border-gray-200 px-6 py-2'>
      {(editMode && editForm({ value, onChange: localOnUpdate, onCancel })) ||
        displayRow}
    </li>
  );
};

export default EditDeleteRow;
