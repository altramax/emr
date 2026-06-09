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

const ConfirmationReviewModalMedsOrder = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  formdata,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[550px] p-6 rounded-xl shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-yellow-500" size={24} />
          <h2 className="text-md font-semibold text-gray-800">{title}</h2>
        </div>

        {/* <table className="w-full text-sm ">
          <thead>
            <tr className="text-xs text-gray-600 font-medium flex justify-between items-center gap-4">
              <th>#</th>
              <th className="text-start">Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
      
            {formdata.map((item: any, index: number) => {
              return (
                <tr
                  key={item.Medication}
                  className="border-b border-gray-200 py-2 text-xs font-normal flex justify-between items-center gap-2"
                >
                  <td>{index + 1}</td>
                  <td>{item.Medication}</td>
                  <td>{item.Dosage}</td>
                  <td>{item.Frequency}</td>
                  <td>{item.Duration}</td>
                  <td>{item.Instructions}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h2 className="text-sm text-blue-500 font-bold mb-2">Selected Medicine</h2>
          {formdata.medicine.map((item: { label: string; value: string }, index: number) => (
            <p key={index + item.label} className="text-xs text-blue-500 mb-2">
              {index + 1}. {item.label}
            </p>
          ))}
          <h2 className="text-sm text-blue-500 font-bold mt-8 mb-2">Instructions</h2>
          <p className="text-xs text-blue-500 mb-2">{formdata.instructions}</p>
        </div>

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

export default ConfirmationReviewModalMedsOrder;
