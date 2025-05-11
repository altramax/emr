"use client";
import Image from "next/image";

interface buttonProp {
  readonly value: string;
  readonly icon?: string;
  readonly variant?: "small" | "large";
  readonly type?: "button" | "submit" | "reset";
  readonly color?: "white" | "blue";
  readonly loading?: boolean;
  readonly width?: string;
  readonly className?: string;
  readonly onClick?: ()=>void
}
export default function Button({
  value,
  icon,
  variant = "small",
  type = "button",
  color = "blue",
  loading = false,
  width,
  className,
  onClick,
}: buttonProp) {
  return (
    <button
      type={type}
      className={`${className} flex justify-center ${width} ${
        variant === "small"
          ? "px-6 py-2 text-base min-w-[10rem]"
          : "px-12 py-3 text-2xl min-w-[20rem]"
      } ${
        color === "blue"
          ? "text-white from-[#2393FF] to-[#0072FF] hover:from-[#4AAEFF] hover:to-[#3399FF]"
          : "text-[#2393FF] bg-white hover:bg-[#bce1ff]"
      } font-semibold rounded-3xl bg-gradient-to-r shadow-md transition-all duration-300`}
      disabled={loading}
      onClick={onClick}
    >
      {loading === true ? (
        <div>
          <svg
            className={`text-white animate-spin ${
              variant === "small" ? "w-6 h-6" : "w-10 h-10"
            } ${color === "blue" ? "text-white" : "text-[#2393FF]"} `}
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
              width={`${variant === "small" ? 20 : 30}`}
              height={`${variant === "small" ? 20 : 30}`}
            />
          )}

          <p>{value}</p>
        </div>
      )}
    </button>
  );
}
