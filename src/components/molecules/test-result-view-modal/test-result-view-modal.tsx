'use client';
import React from 'react';
import { FlaskConical, XCircle } from 'lucide-react';
import dayjs from 'dayjs';

type LabTestResultModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  formdata?: {
    test_name: string;
    status: string;
    result: Record<string, string>;
    updated_at: string;
    ordered_at: string;
    created_at: string;
  };
  dataLoading: boolean;
};

export default function TestResultViewModal({
  isOpen,
  onCancel,
  formdata,
  dataLoading,
}: LabTestResultModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 transition-all duration-300">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-red-500 hover:bg-red-300 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          <XCircle size={18} />
        </button>

        {dataLoading || !formdata ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-sm">
            Loading test results...
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 space-y-3">
              <h2 className="text-lg flex items-center gap-2 font-bold text-blue-500 dark:text-white tracking-tight">
                <FlaskConical size={18} /> {formdata.test_name}
              </h2>
              <div className="text-xs text-black mt-1">
                {dayjs(formdata.created_at).format(`DD-MM-YYYY h:mm A`)}
              </div>
              <div className="text-sm text-black dark:text-gray-400 mt-1">
                <span className="bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs w-fit ">
                  {formdata.status}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Parameter
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(formdata.result).map(([key, value]) => (
                    <tr
                      key={key}
                      className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">{key}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-medium text-sm">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
