'use client';

import { XCircle } from 'lucide-react';
import React from 'react';
import dayjs from 'dayjs';

type ConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  title: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  formdata?: any;
};

const OrderedTestViewModal = ({ isOpen, onCancel, title, formdata }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl space-y-4  h-[80vh] overflow-auto">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onCancel}>
            <XCircle className="text-red-500" size={28} />
          </button>
        </div>
        {/* eslint-disable  @typescript-eslint/no-explicit-any */}
        {formdata?.map((data: any) => {
          return data?.task_data.map((item: any, index: number) => (
            <div
              key={index + 1}
              className="text-xs flex gap-8 justify-between items-center border-b py-3"
            >
              <p className=" font-medium">
                {item.name?.charAt(0).toUpperCase() + item.name?.slice(1)}
              </p>
              <p className="text-gray-600">
                {dayjs(data?.created_at).format('dddd D [of] MMMM h:mm A')}
              </p>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default OrderedTestViewModal;
