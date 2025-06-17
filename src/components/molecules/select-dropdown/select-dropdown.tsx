'use client';

import { useState, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { XCircleIcon, ChevronDown } from 'lucide-react';
import SingleSelect from './single-select';
import MultiSelect from './multi-select';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  placeholder?: string;
  className?: string;
  label?: string;
  asterisk?: boolean;
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control?: Control<any>; // optional
  isMulti?: boolean;
  defaultValue?: Option;
};

export default function SelectDropdown({
  options,
  placeholder = 'Select an option',
  className = '',
  label,
  asterisk,
  name,
  control,
  defaultValue,
  isMulti = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const currentValue = field.value;

  useEffect(() => {
    if (defaultValue) {
      field.onChange(defaultValue);
    }
  }, [defaultValue]);

  const handleChangesingle = (val: Option | null) => {
    field.onChange(val);
    setIsOpen(false);
  };

  const handleChangeMulti = (val: Option | null) => {
    const exist = field.value
      ? field.value?.filter((item: Option) => item?.value === val?.value)
      : [];
    if (exist?.length > 0) return;
    field.onChange(() => {
      if (field.value?.length > 0) {
        field.onChange([...field.value, val]);
      } else {
        field.onChange([val]);
      }
    });
  };

  const removeSelectedMulti = (val: Option | null) => {
    field.onChange(field.value.filter((item: Option) => item.value !== val?.value));
  };

  return (
    <div className={`relative`}>
      <label
        className={`text-gray-500 flex items-center gap-1 font-medium text-xs ${label && 'mb-1'}`}
      >
        {label}
        {asterisk && <span className="text-red-600">*</span>}
      </label>

      <button
        type="button"
        className={`no-scrollbar overflow-x-scroll h-[32px] text-xs w-full flex items-center justify-between p-2 border rounded-lg bg-white text-left transition-all duration-200 ${
          isOpen ? 'ring-1 ring-blue-500 border-blue-500' : 'border-blue-300 hover:border-blue-400'
        } ${className}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {!isMulti ? (
          <span
            className={!currentValue ? 'text-gray-400' : 'text-blue-500 flex items-center gap-2'}
          >
            {currentValue?.label ?? placeholder}
          </span>
        ) : (
          <span
            className={
              !currentValue
                ? 'text-gray-400'
                : 'relative text-blue-500 gap-2 flex items-center justify-start no-scrollbar  overflow-x-scroll w-full'
            }
          >
            {currentValue
              ? currentValue?.map((item: Option) => {
                  return (
                    <div
                      key={item.value}
                      className="flex justify-between items-center border rounded-sm px-3 py-1 w-full "
                    >
                      <span key={item.value} className="w-full text-nowrap">
                        {item.label}
                      </span>
                      <XCircleIcon
                        size={16}
                        className="text-red-500 w-fit"
                        onClick={(evt: any) => {
                          evt.stopPropagation();
                          removeSelectedMulti(item);
                        }}
                      />
                    </div>
                  );
                })
              : placeholder}
          </span>
        )}

        <ChevronDown
          size={12}
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {!isMulti && (
        <SingleSelect
          isOpen={isOpen}
          options={options}
          selected={currentValue}
          onChange={handleChangesingle}
        />
      )}
      {isMulti && (
        <MultiSelect
          isOpen={isOpen}
          options={options}
          selected={currentValue}
          onChange={handleChangeMulti}
        />
      )}

      {error && (
        <ErrorMessage
          name={name}
          errors={{ [name]: error }}
          render={({ message }) => <p className="mt-1 text-xs text-red-500">{message}</p>}
        />
      )}
    </div>
  );
}
