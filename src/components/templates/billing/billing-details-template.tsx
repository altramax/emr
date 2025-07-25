'use client';
import { useState, useEffect } from 'react';
import BillingDetailsHeader from '../../organisms/billing/billing-patient-details-header';
import { useParams } from 'next/navigation';
import { useQueryBillableTask } from '@/src/hooks/task/use-query-billable-task';
import Loading from '../../atoms/loading-bar/loading-bar-page';
import LoadingBar from '../../atoms/loading-bar/loading-bar-section';
import BillingDetailsTable from '../../organisms/billing/billing-details-table';
import { UseCalculateSubtotal } from '@/src/hooks/billing/use-calculate-subtotal';
import Button from '../../atoms/button/button';
import { useInsertBilling } from '@/src/hooks/billing/use-insert-billing';
import { toast } from 'react-toastify';
import { usePDF } from 'react-to-pdf';
import ReceiptLayout from '../../organisms/billing/receipt-layout';
import { TaskItem } from '../../organisms/billing/billing-details-table';

export interface SelectedTask {
  name: string;
  quantity: number;
  discount: number;
}

export default function BillingDetailsPage() {
  const param = useParams();
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const detailsId: any = param?.detailsId;
  const [receiptItems, setReceiptItems] = useState<any>([]);
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const { queryBillableTask, data, loading, refetch } = useQueryBillableTask({
    select: '*',
    name: detailsId,
    status: 'all',
  });

  const {
    calculateSubtotal,
    data: totalData,
    loading: loadingSubtotal,
  } = UseCalculateSubtotal({
    items: selectedTasks,
  });

  const billInfo = data?.[0];

  useEffect(() => {
    if (!detailsId) return;
    queryBillableTask();
  }, [detailsId]);

  useEffect(() => {
    const items: TaskItem[] = [];
    const patientInfo = {
      fullname: billInfo?.patient?.first_name + ' ' + billInfo?.patient?.last_name,
      patientId: billInfo?.patient?.id,
      patientGender: billInfo?.patient?.gender,
    };
    console.log(billInfo);

    if (billInfo) {
      billInfo?.tasks?.map((item: any) => {
        item?.task_data?.map((task: TaskItem) => {
          if (task?.bill === 'paid') {
            items.push(task);
          }
        });
      });
    }

    setReceiptItems({ patientInfo: patientInfo, items: items });
  }, [billInfo]);

  // console.log(receiptItems);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateSubtotal();
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedTasks]);

  const subtotal = totalData?.[0];

  const paymentData = {
    visit_id: billInfo?.visit_id,
    patient_id: billInfo?.patient_id,
    payment_method: 'cash',
    amount_paid: subtotal?.final_amount,
    paid_items: selectedTasks,
  };

  const { insertBill } = useInsertBilling({ column: paymentData });

  const payBill = async () => {
    const response = await insertBill();
    if (response === 'success') {
      toast.success('Bill paid successfully');
      refetch();
    }
  };

  const downloadHandler = () => {
    toPDF();
    setTimeout(() => {
      toast.success('Receipt downloaded successfully');
    }, 1000);
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8 max-w-7xl mx-auto text-sm bg-gray-50 min-h-screen">
      <div className="mb-8">
        <BillingDetailsHeader
          data={billInfo}
          back_path="/billing"
          buttonAction={downloadHandler}
          buttonText="Download Receipt"
          disabled={receiptItems?.items?.length === 0}
        />
      </div>

      <BillingDetailsTable billInfo={billInfo} setFinalTasks={setSelectedTasks} />

      {/* Payment Summary */}
      {loadingSubtotal ? (
        <div className="bg-white shadow-md rounded-2xl p-6 border h-[238px]">
          <LoadingBar />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-2xl p-6 border">
          <h3 className="text-base font-semibold mb-4 text-gray-700">Payment Summary</h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Total Cost:</span>
              <span>
                {subtotal?.final_amount
                  ? new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(subtotal?.total_billed)
                  : '0'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>
                -{' '}
                {subtotal?.total_discount
                  ? new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(subtotal?.total_discount)
                  : '0'}
              </span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-3">
              <span>SubTotal</span>
              <span>
                {subtotal?.total_billed
                  ? new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(subtotal?.final_amount)
                  : '0'}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              disabled={subtotal?.final_amount === 0}
              type="button"
              className="mt-4 bg-blue-600 text-white p-2 rounded-md w-[300px]"
              value={`Pay Now`}
              onClick={payBill}
            />
          </div>
        </div>
      )}

      <div className="absolute left-[-9999px] top-0">
        <ReceiptLayout receiptData={receiptItems} Ref={targetRef} />
      </div>
    </div>
  );
}
