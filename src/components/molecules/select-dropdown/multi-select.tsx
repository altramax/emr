import { XCircleIcon } from 'lucide-react';

type Option = {
  value: string;
  label: string;
  isDeactivated?: boolean;
};

type singleSelect = {
  options: Option[];
  isOpen: boolean;
  selected: Option[] | null;
  onChange: (val: Option | null) => void;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  unselect: (item: any) => void;
};

export default function MultiSelect({
  isOpen,
  options,
  selected,
  onChange,
  unselect,
}: singleSelect) {
  const filteredOptions = (value: Option) => {
    const result = selected ? selected?.filter((item) => item.value === value.value) : [];

    if (result.length > 0) {
      return true;
    }
    return false;
  };

  if (!isOpen) return;

  return (
    <div className="text-xs absolute top-17 z-10 mt-1 w-full max-h-60 overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200 ">
      {options.map((option) => (
        <div
          key={option.value ?? 'no-value'}
          className={`hover:bg-blue-50 px-3 py-2 cursor-pointer flex items-center justify-start gap-2 mb-2 ${
            filteredOptions(option) ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
          } ${option?.isDeactivated ? 'text-black bg-gray-300 opacity-70' : ''}`}
        >
          <option
            onClick={() => !option?.isDeactivated && onChange(option)}
            aria-selected={filteredOptions(option)}
            className="w-full"
          >
            {option?.label}
          </option>
          {filteredOptions(option) ? (
            <XCircleIcon
              size={18}
              className="text-red-500 w-fit cursor-pointer group-hover:bg-red-100 group-hover:rounded-full"
              onClick={(evt: any) => {
                evt.stopPropagation();
                unselect(option);
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
