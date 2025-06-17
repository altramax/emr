import { useState } from 'react';
import LabOrders from './lab-orders-tab';
import Medications from './medication-orders-tab';
import { Pill, FlaskConical } from 'lucide-react';

type dataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

export default function OrdersTab({ data }: dataType) {
  const [activeTab, setActiveTab] = useState('labs');

  return (
    <div className="">
      <div className="flex space-x-8 border-b pb-2 mb-4">
        <button
          className={`${activeTab === 'labs' ? 'text-sm text-black bg-blue-200 rounded-lg px-4 py-2 font-medium' : 'text-gray-500 bg-white'}  text-xs flex justify-start items-center gap-2`}
          onClick={() => setActiveTab('labs')}
        >
          <FlaskConical size={18} /> Laboratory Orders
        </button>
        <button
          className={`${activeTab === 'meds' ? 'text-sm text-black bg-blue-200 rounded-lg px-4 py-2 font-medium' : 'text-gray-500 bg-white'}  text-xs flex justify-start items-center gap-2`}
          onClick={() => setActiveTab('meds')}
        >
          <Pill size={18} /> Medications
        </button>
      </div>

      <div className={`${activeTab === 'labs' ? 'block' : 'hidden'}`}>
        <LabOrders data={data} />
      </div>
      <div className={`${activeTab === 'meds' ? 'block' : 'hidden'}`}>
        <Medications />
      </div>
    </div>
  );
}
