'use client';

import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import React from 'react';

type ConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-yellow-500" size={28} />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        {description && <p className="text-sm text-gray-600 pl-9">{description}</p>}

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <X size={18} /> Cancel
          </button>

          <button
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            onClick={(e: any) => {
              e.preventDefault();
              onConfirm();
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            <CheckCircle size={18} /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
