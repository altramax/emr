'use client';

import { Pencil, Ban, Check } from 'lucide-react';

type Props = {
  onEdit: () => void;
  onDeactivate: () => void;
  onActivate: () => void;
  isActive: boolean;
  open: boolean;
};

export default function DepartmentActionMenu({
  onEdit,
  onDeactivate,
  onActivate,
  open,
  isActive,
}: Props) {
  if (!open) return;
  return (
    <div className=" p-2 w-[200px] absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
      <button
        onClick={() => {
          onEdit();
        }}
        className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-blue-100"
      >
        <Pencil size={16} className="mr-2" />
        Edit Department
      </button>

      {isActive ? (
        <button
          onClick={() => {
            onDeactivate();
          }}
          className="mt-2 flex items-center w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50"
        >
          <Ban size={16} className="mr-2" />
          Deactivate Department
        </button>
      ) : (
        <button
          onClick={() => {
            onActivate();
          }}
          className="mt-2 flex items-center w-full px-4 py-2 text-xs text-green-600 hover:bg-green-50"
        >
          <Check size={16} className="mr-2" />
          Activate Department
        </button>
      )}
    </div>
  );
}
