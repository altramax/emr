'use client';

import { useState, useEffect, useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ChevronDown } from 'lucide-react';
import SingleSelect from './single-select';
import MultiSelect from './multi-select';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';

type Option = {
  value: string;
  label: string;
  isDeactivated?: boolean;
};

type CustomSelectProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  placeholder?: string;
  className?: string;
  label?: string;
  asterisk?: boolean;
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control?: Control<any>; // optional
  isMulti?: boolean;
  disabled?: boolean;
  searchTerm: any;
};

export default function SelectDropdownAsync({
  placeholder = 'Select an option',
  className = '',
  searchTerm,
  label,
  asterisk,
  name,
  control,
  isMulti = false,
  disabled = false,
  data,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const inputRefMulti = useRef<HTMLInputElement>(null);
  const inputRefSingle = useRef<HTMLInputElement>(null);
  const debounceSearch = useDebounce(inputValue ?? '');

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  useEffect(() => {
    if (!data) return;
    const option = data?.map((items: any) => {
      return { label: items?.name, value: items?.name };
    });

    setOptions(option);
  }, [data]);

  const currentValue: any = field.value;

  useEffect(() => {
    if (currentValue !== null) {
      field.onChange(currentValue);
    }
  }, []);

  const handleItemSearchMulti = (event: any) => {
    event.stopPropagation();
    setInputValue(event.target.value);
    searchTerm(debounceSearch);
  };

  const handleChangeMulti = (val: Option | null) => {
    console.log(field.value);
    const exist = field?.value?.label
      ? []
      : field.value?.filter((item: Option) => item?.value === val?.value);

    if (exist?.length > 0) return;

    if (field?.value?.label) {
      field.onChange([val]);
    } else {
      field.onChange([...field.value, val]);
    }
    setInputValue('');
    inputRefMulti.current?.focus();
  };

  const removeSelectedMulti = (val: Option | null) => {
    field.onChange(field.value.filter((item: Option) => item.value !== val?.value));
    inputRefMulti.current?.focus();
  };

  const handleChangesingle = (val: Option | null) => {
    field.onChange(val);
    setIsOpen(false);
    setInputValue(val?.label);
  };

  const handleItemSearchSingle = (event: any) => {
    event.stopPropagation();
    setInputValue(event.target.value);
    field.onChange({ label: event.target.value, value: event.target.value });
  };

  const removeSelectedSingle = () => {
    field.onChange(null);
    setInputValue('');
    inputRefSingle.current?.focus();
  };

  return (
    <div className={`relative w-[500px]`}>
      <label
        className={`text-gray-500 flex items-center gap-1 font-medium text-xs ${label && 'mb-1'}`}
      >
        {label}
        {asterisk && <span className="text-red-600">*</span>}
      </label>

      <div className={``}>
        <button
          type="button"
          className={`no-scrollbar w-full overflow-x-scroll h-[32px] text-xs flex items-center justify-between p-2 border rounded-lg bg-white text-left transition-all duration-200 ${
            isOpen
              ? 'ring-1 ring-blue-500 border-blue-500'
              : 'border-blue-300 hover:border-blue-400'
          } ${className}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
        >
          {isMulti && (
            <div className=" flex items-center justify-start gap-2 w-full">
              {currentValue?.length > 0 && (
                <div
                  className={
                    'text-blue-500 gap-2 flex items-center justify-start no-scrollbar overflow-x-scroll p-4 w-[70%]'
                  }
                >
                  {currentValue?.map((item: Option, index: number) => (
                    <p key={index + 1} className="w-fit border rounded-sm px-3 py-1 text-nowrap">
                      {item.label}
                    </p>
                  ))}
                </div>
              )}
              <input
                ref={inputRefMulti}
                type="text"
                className={`text-blue-500 block tracking-wide h-[32px] w-[20%] text-xs border-transparent outline-none focus:outline-none
               `}
                value={inputValue}
                onChange={(e) => handleItemSearchMulti(e)}
                placeholder={currentValue?.length > 0 ? '' : placeholder}
              />
            </div>
          )}

          {!isMulti && (
            <input
              type="text"
              ref={inputRefSingle}
              className={`text-blue-500 tracking-wide h-[32px] w-[100%] text-xs border-transparent outline-none focus:outline-none
               `}
              value={inputValue}
              onChange={(e) => handleItemSearchSingle(e)}
              placeholder={placeholder}
            />
          )}

          <ChevronDown
            size={12}
            className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {!isMulti && (
        <SingleSelect
          isOpen={isOpen}
          options={options}
          selected={currentValue}
          onChange={handleChangesingle}
          unselect={removeSelectedSingle}
        />
      )}
      {isMulti && (
        <MultiSelect
          isOpen={isOpen}
          options={options}
          selected={currentValue}
          onChange={handleChangeMulti}
          unselect={removeSelectedMulti}
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
