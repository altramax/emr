'use client';

import { useEffect } from 'react';
import PatientDetailsHeader from '@/src/components/organisms/patient-care/patient-care-details-header';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import { useParams, useSearchParams } from 'next/navigation';
import LoadingBar from '@/src/components/atoms/loading-bar/loading-bar';
import AddVitals from '@/src/components/organisms/patient-care/add-vitals/add-vitals-details';
import { HeartPulse } from 'lucide-react';
import { useGetVisit } from '@/src/hooks/visits/use-get-visit';

export default function AddVitalsDetailsTemplate() {
  const param = useParams();
  const pathname = useSearchParams();
  const id = param?.detailsId ?? '';

  const { getTask, data, loading } = useGetTasks({
    select: '*',
    patient_lhc_id: id,
    task_name: 'vitals',
    status: 'pending',
  });

  const {
    getVisit,
    data: visitData,
    loading: visitLoading,
  } = useGetVisit({
    select: '*',
    patient_lhc_id: id,
    status: 'open',
  });

  useEffect(() => {
    if (pathname.get('from') === '/diagnosis') {
      getVisit();
    } else {
      getTask();
    }
  }, []);

  const pageData =
    pathname.get('from') === '/diagnosis' ? visitData && visitData[0] : data && data[0];

  if (loading || visitLoading) return <LoadingBar />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PatientDetailsHeader data={pageData} />
      <div className="mt-6 text-white bg-white rounded-lg px-10 py-4">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <h2 className=" text-blue-500 text-base font-semibold pl-2 flex justify-start items-center gap-2">
            <HeartPulse size={18} /> Add Vitals
          </h2>
        </div>
        <div className={`pt-6`}>
          {pageData && <AddVitals data={pageData} from={pathname.get('from')} />}
        </div>
      </div>
    </div>
  );
}
