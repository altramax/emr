'use client';

import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import React from 'react';

type ConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  formdata?: any;
};

const ConfirmationReviewModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  formdata,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-yellow-500" size={28} />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        {formdata &&
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          Object.entries(formdata)?.map((data: any) => {
            return (
              <div
                key={data[0]}
                className="text-xs flex gap-8 justify-between items-center border-b py-3"
              >
                <p className="text-gray-600 font-medium">
                  {data[0]?.charAt(0).toUpperCase() + data[0]?.slice(1)}
                </p>
                <p className="text-gray-900 font-semibold text-wrap text-end">{data[1]}</p>
              </div>
            );
          })}

        <div className={'flex justify-end gap-3 pt-4'}>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            <X size={18} /> Cancel
          </button>

          <button
            type="button"
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            onClick={(e: any) => {
              e.preventDefault();
              onConfirm();
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md`}
          >
            <CheckCircle size={18} /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationReviewModal;
