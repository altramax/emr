'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
// import PatientDetailsHeader from '../../organisms/patient/patient-details-header';
import { useParams } from 'next/navigation';
import { useQueryBillableTask } from '@/src/hooks/task/use-query-billable-task';
import Loading from '../../atoms/loading-bar/loading-bar-page';
import BillingDetailsTable from '../../organisms/billing/billing-details-table';

const billables = [
  { id: '1', name: 'CBC Test', category: 'Lab', cost: 3000, quantity: 1 },
  { id: '2', name: 'Paracetamol', category: 'Pharmacy', cost: 200, quantity: 5 },
  { id: '3', name: 'Consultation', category: 'Service', cost: 5000, quantity: 1 },
];

export interface SelectedTask {
  key: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  discount: number;
  subTotal: number;
}

export default function BillingDetailsPage() {
  const param = useParams();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const detailsId: any = param?.detailsId;
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);

  const { queryBillableTask, data, loading } = useQueryBillableTask({
    select: '*',
    name: detailsId,
  });

  const billInfo = data?.[0];

  useEffect(() => {
    if (!detailsId) return;
    queryBillableTask();
  }, [detailsId]);

  // const [discount, setDiscount] = useState(0);
  // const [payments, setPayments] = useState<any>([]);
  // const [newPayment, setNewPayment] = useState({ method: '', amount: 0 });

  const payments: any = [];
  const discount = 0;
  const total = billables.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  const paid = payments.reduce((sum: any, p: any) => sum + p.amount, 0);
  const balance = Math.max(total - discount - paid, 0);

  // const handleAddPayment = () => {
  //   if (!newPayment.method || newPayment.amount <= 0) return;
  //   setPayments([...payments, newPayment]);
  //   setNewPayment({ method: '', amount: 0 });
  // };

  console.log(selectedTasks);

  if (loading) return <Loading />;

  return (
    <div className="p-8 max-w-7xl mx-auto text-sm bg-gray-50 min-h-screen">
      {/* Header */}

      <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-8">
        <button className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="text-sm flex items-bottom gap-4 text-blue-500">{billInfo?.patient?.id}</div>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground text-cm ">
          Patient: <span className="font-medium">John Doe</span> | Visit ID: OPD-2025-004
        </p>
      </div>

      <BillingDetailsTable billInfo={billInfo} setFinalTasks={setSelectedTasks} />

      {/* Payment Summary */}
      <div className="bg-white shadow-md rounded-2xl p-6 border">
        <h3 className="text-base font-semibold mb-4 text-gray-700">Payment Summary</h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>Total:</span>
            <span>₦{total}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>- ₦{discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Paid:</span>
            <span>- ₦{paid}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 border-t pt-3">
            <span>Balance:</span>
            <span>₦{balance}</span>
          </div>
        </div>

        {balance === 0 && (
          <div className="mt-5 text-sm text-green-700 bg-green-100 border border-green-300 px-4 py-3 rounded-lg">
            ✅ Payment Complete. Ready to finalize bill.
          </div>
        )}
      </div>
    </div>
  );
}
