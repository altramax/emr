'use client';

import { useEffect } from 'react';
import PatientDetailsHeader from '@/src/components/organisms/patient/patient-details-header';
import { useParams } from 'next/navigation';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import LabOrderDetails from '@/src/components/organisms/lab-order/lab-order-details';
import { useGetData } from '@/src/hooks/use-get-data';

export default function LabOrderDetailsTemplate() {
  const param = useParams();
  const id = param?.detailsId ?? '';

  const { getData, data, loading, refetch } = useGetData({
    table: 'tasks',
    select: '*',
    params: [
      {
        column: 'task_name',
        value: 'lab_order',
      },
      {
        column: 'task_id',
        value: id,
      },
    ],
  });

  useEffect(() => {
    getData();
  }, []);
  const pageData = data ? data[0] : null;

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <PatientDetailsHeader data={pageData} />
      <div className="mt-6 text-white bg-white rounded-lg p-6">
        {/* <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <h2 className=" text-blue-500 text-base font-semibold pl-2 flex justify-start items-center gap-2">
            <HeartPulse size={18} /> Lab Orders
          </h2>
        </div> */}
        <div className={``}>
          {pageData && <LabOrderDetails data={pageData} refetch={refetch} />}
        </div>
      </div>
    </div>
  );
}
