import { useState } from 'react';
import LabOrders from './lab-orders-tab';
import { Pill, FlaskConical } from 'lucide-react';
import TestResults from './test-results-tab';

type dataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

export default function TestTab({ data }: dataType) {
  const [activeTab, setActiveTab] = useState('labs');

  return (
    <div className="">
      <div className="flex space-x-8 border-b w-fit m-auto justify-center">
        <button
          className={`${activeTab === 'labs' ? 'text-xs text-blue-500 border-b-2 border-blue-500 px-4 py-1 font-medium' : 'text-gray-500 bg-white'}  text-xs flex justify-start items-center gap-2`}
          onClick={() => setActiveTab('labs')}
        >
          <FlaskConical size={18} /> Orders test
        </button>
        <button
          className={`${activeTab === 'meds' ? 'text-xs text-blue-500 border-b-2 border-blue-500 px-4 py-1 font-medium' : 'text-gray-500 bg-white'}  text-xs flex justify-start items-center gap-2`}
          onClick={() => setActiveTab('meds')}
        >
          <Pill size={18} /> Test results
        </button>
      </div>

      <div className={`${activeTab === 'labs' ? 'block' : 'hidden'}`}>
        <LabOrders data={data} />
      </div>
      <div className={`${activeTab === 'meds' ? 'block' : 'hidden'}`}>
        <TestResults visitId={data?.visit_id} patientId={data?.patient_id} />
      </div>
    </div>
  );
}
