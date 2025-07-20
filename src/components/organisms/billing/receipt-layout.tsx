import dayjs from 'dayjs';
import { TaskItem } from './billing-details-table';
import { UseCalculateSubtotal } from '@/src/hooks/billing/use-calculate-subtotal';
import { useEffect, useState } from 'react';
import { SelectedTask } from '@/src/components/templates/billing/billing-details-template';

type receiptDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  receiptData: any;
  Ref: any;
};

export default function ReceiptLayout({ receiptData, Ref }: receiptDataType) {
  const date = new Date();
  const formatted = date.toLocaleString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const receiptDate = `${dayjs(date).format('DD of MMMM YYYY')}`;
  const receiptTime = `${formatted}`;
  const [paidTasks, setPaidTasks] = useState<SelectedTask[]>([]);

  useEffect(() => {
    const items = receiptData?.items?.map((item: TaskItem) => {
      return {
        name: item.name,
        quantity: item.quantity ?? 1,
        discount: item.discount ?? 0,
      };
    });
    setPaidTasks(items);
  }, [receiptData]);

  useEffect(() => {
    if (paidTasks.length === 0) return;
    calculateSubtotal();
  }, [paidTasks]);

  const { calculateSubtotal, data: totalData } = UseCalculateSubtotal({
    items: paidTasks,
  });
  const finalCalculation = totalData?.[0] ?? 0;

  return (
    <div
      id="receipt"
      className="w-[720px] mx-auto bg-white text-black text-sm p-6 rounded-md border border-gray-300 shadow-md font-sans"
      style={{ fontFamily: 'Arial, sans-serif' }}
      ref={Ref}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="">
          <div className="flex gap-2 items-center">
            <div className="bg-white text-blue-600 rounded flex items-center justify-center p-2 pt-0 px-1">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.24 23.84c-.04 0-.04 0-.08 0-.4-.04-.72-.36-.76-.76l-1-9.96-.88 2.72c-.12.36-.44.56-.8.56H.84A.83.83 0 0 1 0 15.6c0-.44.36-.84.84-.84h5.32l1.92-6c.12-.36.48-.6.88-.56s.68.36.72.76l.96 9.72 2.04-6.96c.12-.36.4-.6.8-.6.36 0 .68.28.8.64l1.12 4.84.84-1.24c.16-.24.4-.36.68-.36h5.28c.44 0 .84.36.84.84s-.36.84-.84.84h-4.84l-1.64 2.44c-.2.28-.52.4-.84.36s-.6-.32-.64-.64l-.84-3.6-2.36 8.08c-.12.28-.44.52-.8.52z"
                  fill="#1E40AF"
                />
              </svg>
            </div>
            <h1 className="text-lg font-bold">LiLy HealthCare</h1>
          </div>
          <p className="text-xs text-gray-500 text-end pl-12">Plot 42, Medical Way, Lagos</p>
        </div>

        <div className="text-right text-xs text-gray-600">
          <p>
            <strong>Time:</strong> {receiptTime}
          </p>
          <p>
            <strong>Date:</strong> {receiptDate}
          </p>
          {/* <p>
            <strong>Receipt No:</strong> RCP-20250712-02
          </p> */}
        </div>
      </div>

      <hr className="mb-4 border-gray-300" />

      <div className="mb-4">
        {/* <h3 className="text-sm font-semibold text-gray-800 mb-2">Patient Information</h3> */}
        <div className="text-xs space-y-1">
          <p>
            <strong>Full Name:</strong> {receiptData?.patientInfo?.fullname || 'N/A'}
          </p>
          <p>
            <strong>Patient ID:</strong> {receiptData?.patientInfo?.patientId || 'N/A'}
          </p>
          <p>
            <strong>Gender:</strong> {receiptData?.patientInfo?.patientGender || 'N/A'}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Billed Items</h3>
        <table className="w-full border text-xs">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border text-left">Item</th>
              <th className="p-2 border text-center">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>

          <tbody>
            {receiptData
              ? receiptData.items?.map((task: TaskItem, i: number) => {
                  return (
                    <tr className="text-gray-800" key={i + 1}>
                      <td className="p-2 border text-center">{i + 1}</td>
                      <td className="p-2 border">{task.name}</td>
                      <td className="p-2 border text-center">{task.quantity ?? 1}</td>
                      <td className="p-2 border text-center">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(task.price)}
                      </td>
                      <td className="p-2 border text-center">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(task.discount ?? 0)}
                      </td>

                      <td className="p-2 border text-center font-semibold">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                        }).format(task?.price * (task.quantity ?? 1) - (task?.discount ?? 0))}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      <div className="w-fit ml-auto text-left text-sm mb-6">
        <p className="mb-1 flex gap-2">
          <strong>Total:</strong>
          {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
            finalCalculation?.total_billed ?? 0
          )}
        </p>
        <p className="mb-1 flex gap-2">
          <strong>Discount:</strong>
          {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
            finalCalculation?.total_discount ?? 0
          )}
        </p>
        <p className="text-red-600 font-bold flex gap-2">
          <strong>Subtotal:</strong>
          {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
            finalCalculation?.final_amount ?? 0
          )}
        </p>
      </div>

      <div className="text-center text-xs text-gray-500 border-t pt-3">
        <p>Thank you for choosing Lily HealthCare.</p>
      </div>
    </div>
  );
}
