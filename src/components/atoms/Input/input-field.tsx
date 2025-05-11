import React from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface InputFieldProp
  extends UseControllerProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'> {
  readonly type?: string;
  readonly className?: string;
  readonly asterisk?: boolean;
  readonly icon?: string;
  readonly iconPosition?: 'left' | 'right';
  readonly label?: string;
  readonly disabled?: boolean;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  readonly control?: Control<any>;
}

export const InputField = (props: InputFieldProp) => {
  const {
    field: { onChange, onBlur, value },
    formState: { errors },
  } = useController(props);

  const {
    name,
    type,
    placeholder,
    className,
    icon,
    iconPosition,
    asterisk,
    label,
    disabled,
    ...others
  } = props;
  return (
    <>
      {label && (
        <label htmlFor="email" className="text-white">
          {label}
          {asterisk && <span className="text-[#DB1813]">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`
                            pointer-events-none absolute inset-y-0 flex items-center px-2.5
                            ${
                              (iconPosition === 'left' && 'left-0') ||
                              (iconPosition === 'right' && 'right-0')
                            }`}
          >
            <span>{icon}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...others}
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

export default InputField;
