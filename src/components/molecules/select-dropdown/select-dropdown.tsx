'use client';

import { useState, useRef, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

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
};

export default function SelectDropdown({
  options,
  placeholder = 'Select an option',
  className = '',
  label,
  asterisk,
  name,
  control,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: null,
  });

  const currentValue = field.value;

  const handleChange = (val: Option | null) => {
    field.onChange(val);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (!selectRef.current?.contains(e.target as Node)) {
  //       setIsOpen(false);
  //       field.onBlur?.();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [field]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleChange(options[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, options]);

  return (
    <div className={`relative`} ref={selectRef}>
      <label className="flex items-center gap-1 font-medium text-xs mb-1">
        {label}
        {asterisk && <span className="text-red-600">*</span>}
      </label>

      <button
        type="button"
        className={`text-xs w-full flex items-center justify-between p-2 border rounded-lg bg-white text-left transition-all duration-200 ${
          isOpen ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300 hover:border-gray-400'
        } ${className}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setHighlightedIndex(-1);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!currentValue ? 'text-gray-400' : 'text-gray-800'}>
          {currentValue?.label || placeholder}
        </span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white rounded-lg shadow-lg border border-gray-200"
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className={`px-3 py-2 cursor-pointer flex justify-between ${
                currentValue?.value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
              } ${highlightedIndex === index ? 'bg-gray-100' : ''} hover:bg-gray-100`}
              onClick={() => handleChange(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={currentValue?.value === option.value}
            >
              <span>{option.label}</span>
              {currentValue?.value === option.value && (
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
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
