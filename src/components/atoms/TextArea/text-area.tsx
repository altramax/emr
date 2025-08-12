import React from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface TextareaFieldProp
  extends UseControllerProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'defaultValue'> {
  readonly className?: string;
  readonly asterisk?: boolean;
  readonly icon?: string;
  readonly iconPosition?: 'left' | 'right';
  readonly label?: string;
  readonly disabled?: boolean;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  readonly control?: Control<any>;
}

const Textarea = (props: TextareaFieldProp) => {
  const {
    field: { onChange, onBlur, value },
    formState: { errors },
  } = useController(props);

  const {
    name,
    placeholder,
    className,
    icon,
    iconPosition,
    asterisk,
    label,
    disabled,
    rows = 6,
    ...others
  } = props;

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="text-gray-500 text-xs flex items-center justify-start gap-1 font-medium mb-2"
        >
          {label}
          {asterisk && <span className="text-[#DB1813]">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`
              pointer-events-none absolute inset-y-0 flex items-center px-2.5
              ${(iconPosition === 'left' && 'left-0') || (iconPosition === 'right' && 'right-0')}`}
          >
            <span>{icon}</span>
          </div>
        )}
        <textarea
          name={name}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          rows={rows}
          {...others}
          style={{ resize: 'none' }}
        />
      </div>
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <p className="mt-1 text-xs text-red-500">{message}</p>}
      />
    </>
  );
};

export default Textarea;
