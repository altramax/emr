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
  defaultValue?: Option;
  // disabled?: boolean;
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
  // disabled = false,
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

  const currentValue = field.value;

  useEffect(() => {
    if (defaultValue) {
      field.onChange(defaultValue);
    }
  }, []);

  const handleChangesingle = (val: Option | null) => {
    field.onChange(val);
    setInputValue(val?.label);
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

  const handleItemSearch = (e: any) => {
    setIsOpen(true);
    if (e.key === 'Backspace') {
      setInputValue('');
      console.log(e.key);
    }
    console.log(e.key);

    const search = options.filter((option: Option) =>
      option.label.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredOptions(search);
  };

  console.log(inputValue);
  console.log(currentValue?.length);

  return (
    <div className={`relative`}>
      <label
        className={`text-gray-500 flex items-center gap-1 font-medium text-xs ${label && 'mb-1'}`}
      >
        {label}
        {asterisk && <span className="text-red-600">*</span>}
      </label>

      <div className={``}>
        <input
          type="text"
          className={`text-blue-500 no-scrollbar overflow-x-scroll h-[32px] text-xs w-full flex items-center justify-between p-2 border rounded-lg bg-white text-left transition-all duration-200 ${
            isOpen
              ? 'ring-1 ring-blue-500 border-blue-500'
              : 'border-blue-300 hover:border-blue-400'
          } ${className}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          value={inputValue}
          // value={
          //   !isMulti
          //     ? currentValue?.label
          //     : currentValue?.map((item: Option, index: number) => {
          //         return (
          //           <div
          //             key={index + 1}
          //             className="flex justify-between items-center border rounded-sm px-3 py-1 w-fit"
          //           >
          //             <span key={item.value} className="w-full text-nowrap">
          //               {item.label}
          //             </span>
          //           </div>
          //         );
          //       })
          // }
          // disabled={disabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleItemSearch(e)}
          disabled={currentValue?.label?.length > 0}
          placeholder={placeholder}
        />
        <ChevronDown
          size={12}
          className={`absolute top-[6px] right-3 h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />

        {/* <button
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
          {!isMulti ? (
            <>
              <input
                type="text"
                className={`no-scrollbar overflow-x-scroll h-[32px] text-xs w-full flex items-center justify-between p-2 border rounded-lg bg-white text-left transition-all duration-200 ${
                  isOpen
                    ? 'ring-1 ring-blue-500 border-blue-500'
                    : 'border-blue-300 hover:border-blue-400'
                } ${className}`}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                disabled={disabled}
                onChange={handleItemSearch}
              />
              <span
              className={!currentValue ? 'text-gray-400' : 'text-blue-500 flex items-center gap-2'}
            >
              {currentValue?.label ?? placeholder}
            </span>
            </>
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

          <ChevronDown
            size={12}
            className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button> */}
      </div>

      {!isMulti && (
        <SingleSelect
          isOpen={isOpen}
          options={filteredOptions}
          selected={currentValue}
          onChange={handleChangesingle}
          unselect={removeSelectedMulti}
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
