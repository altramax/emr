import { Check } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type singleSelect = {
  options: Option[];
  isOpen: boolean;
  selected: Option | null;
  onChange: (val: Option | null) => void;
};

export default function SingleSelect({ isOpen, options, selected, onChange }: singleSelect) {
  if (!isOpen) return;
  return (
    <div className="text-xs absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white rounded-lg shadow-lg border border-gray-200">
      {options.map((option) => (
        <div
          key={option.value ?? 'no-value'}
          className={`hover:bg-blue-50 px-3 py-2 cursor-pointer flex items-center justify-start mb-2 ${
            selected?.value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
          }`}
        >
          <option
            key={option.value ?? 'no-value'}
            className="w-full"
            onClick={() => onChange(option)}
            aria-selected={option?.value === selected?.value}
          >
            {option?.label}
          </option>
          {option?.value === selected?.value ? <Check size={18} className="w-fit" /> : null}
        </div>
      ))}
    </div>
  );
}
