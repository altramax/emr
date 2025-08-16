'use client';

import { useState, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ChevronDown } from 'lucide-react';
import SingleSelect from './single-select';
import MultiSelect from './multi-select';

type Option = {
  value: string;
  label: string;
  isDeactivated?: boolean;
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
  defaultValue?: any;
  disabled?: boolean;
};

export default function SelectDropdown({
  options,
  placeholder = 'Select an option',
  className = '',
  label,
  asterisk,
  name,
  control,
  isMulti = false,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const currentValue: any = field.value;

  useEffect(() => {
    if (currentValue !== null) {
      field.onChange(currentValue);
      let res: string[] = [];

      if (currentValue?.length > 1) {
        res = currentValue?.map((item: Option) => item.label);
      } else {
        res = [currentValue?.label];
      }
      setInputValue(res.join(' , '));
    }
  }, []);

  const handleChangesingle = (val: Option | null) => {
    field.onChange(val);
    // setInputValue(val?.label);
    setIsOpen(false);
  };

  const handleChangeMulti = (val: Option | null) => {
    const exist =
      field.value !== null
        ? field?.value?.filter((item: Option) => item?.value === val?.value)
        : [];

    if (exist?.length > 0) return;

    if (field.value === null) {
      field.onChange([val]);
      // setInputValue(val?.label);
    } else {
      const values = [...field.value, val];
      field.onChange(values);
      const res = values.map((item) => item.label);
      setInputValue(res.join(' , '));
    }
  };

  const removeSelectedMulti = (val: Option | null) => {
    if (!isMulti) return;
    field.onChange(field.value.filter((item: Option) => item.value !== val?.value));
  };

  const handleItemSearch = (value: string) => {
    const search = options.filter((option: Option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(search);
  };

  const clearInput = (e: any) => {
    if (e.key !== 'Backspace') return;
    field.onChange(null);
    setInputValue('');
  };

  return (
    <div className={`relative`}>
      <label
        className={`text-gray-500 flex items-center gap-1 font-medium text-xs ${label && 'mb-1'}`}
      >
        {label}
        {asterisk && <span className="text-red-600">*</span>}
      </label>

      <div className={``}>
        <button
          type="button"
          className={`no-scrollbar overflow-x-scroll h-[32px] text-xs w-full flex items-center justify-between p-2 border rounded-lg bg-white text-left transition-all duration-200 ${
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
          <div className="bg-red-400 w-[90%] flex items-center justify-start gap-2">
            {!isMulti ? (
              <span
                className={
                  !currentValue
                    ? 'text-gray-400 hidden'
                    : 'text-blue-500 flex items-center gap-2 w-80%]'
                }
              >
                {currentValue?.label}
              </span>
            ) : (
              <span
                className={
                  !currentValue
                    ? 'text-gray-400'
                    : 'relative text-blue-500 gap-2 flex items-center justify-start no-scrollbar  overflow-x-scroll w-[500px]'
                }
              >
                {currentValue
                  ? currentValue?.map((item: Option, index: number) => {
                      return (
                        <div
                          key={index + 1}
                          className="flex justify-between items-center border rounded-sm px-3 py-1 w-fit"
                        >
                          <span key={item.value} className="w-full text-nowrap">
                            {item.label}
                          </span>
                        </div>
                      );
                    })
                  : placeholder}
              </span>
            )}

            {
              <input
                type="text"
                className={`text-blue-500 tracking-wide h-[32px] w-full text-xs border-transparent outline-none focus:outline-none
               `}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                value={inputValue}
                disabled={disabled}
                onChange={(e) => handleItemSearch(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => {
                  clearInput(e);
                }}
              />
            }
          </div>

          <ChevronDown
            size={12}
            className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {!isMulti && (
        <SingleSelect
          isOpen={isOpen}
          options={filteredOptions}
          selected={currentValue}
          onChange={handleChangesingle}
        />
      )}
      {isMulti && (
        <MultiSelect
          isOpen={isOpen}
          options={filteredOptions}
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
