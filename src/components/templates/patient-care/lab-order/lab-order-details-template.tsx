'use client';

import { useEffect } from 'react';
import PatientDetailsHeader from '@/src/components/organisms/patient-care/patient-care-details-header';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import { useParams } from 'next/navigation';
import LoadingBar from '@/src/components/atoms/loading-bar/loading-bar';
import LabOrderDetails from '@/src/components/organisms/patient-care/lab-order/lab-order-details';

export default function LabOrderDetailsTemplate() {
  const param = useParams();
  const id = param?.detailsId ?? '';

  const { getTask, data, loading } = useGetTasks({
    select: '*',
    patient_lhc_id: id,
    task_name: 'lab_order',
  });

  useEffect(() => {
    getTask();
  }, []);

  const pageData = data ? data[0] : null;

  if (loading) return <LoadingBar />;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <PatientDetailsHeader data={pageData} />
      <div className="mt-6 text-white bg-white rounded-lg p-6">
        {/* <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <h2 className=" text-blue-500 text-base font-semibold pl-2 flex justify-start items-center gap-2">
            <HeartPulse size={18} /> Lab Orders
          </h2>
        </div> */}
        <div className={``}>{pageData && <LabOrderDetails data={pageData} />}</div>
      </div>
    </div>
  );
}
