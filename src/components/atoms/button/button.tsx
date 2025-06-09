'use client';
import Image from 'next/image';

interface buttonProp {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  readonly value: any;
  readonly icon?: string;
  readonly variant?: 'small' | 'large';
  readonly type?: 'button' | 'submit' | 'reset';
  readonly loading?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
}
export default function Button({
  value,
  icon,
  variant = 'small',
  type = 'button',
  loading = false,
  className,
  onClick,
}: buttonProp) {
  return (
    <button
      type={type}
      className={`${className} flex justify-center`}
      disabled={loading}
      onClick={onClick}
    >
      {loading === true ? (
        <div>
          <svg
            className={`text-white animate-spin ${
              variant === 'small' ? 'w-6 h-6' : 'w-10 h-10'
            } text-white `}
            viewBox="0 0 50 50"
          >
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <circle
              className="opacity-75"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="80 20"
            ></circle>
          </svg>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {icon && (
            <Image
              src={`${icon ?? icon}`}
              alt="button Icon"
              width={`${variant === 'small' ? 20 : 30}`}
              height={`${variant === 'small' ? 20 : 30}`}
            />
          )}

          {value}
        </div>
      )}
    </button>
  );
}
