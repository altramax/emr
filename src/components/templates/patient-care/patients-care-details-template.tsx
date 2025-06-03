'use client';

import { useEffect } from 'react';
import PatientDetailsHeader from '../../organisms/patient-care/patient-care-details-header';
import PatientDetailsBody from '../../organisms/patient-care/patients-care-details-body';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import { useParams } from 'next/navigation';
import LoadingBar from '../../atoms/loading-bar/loading-bar';

export default function PatientCareDetailsTemplate() {
  const param = useParams();
  const id = param?.detailsId ?? '';

  const { getTask, data, loading } = useGetTasks({
    select: '*',
    filter: id,
    status: 'pending',
    name: 'vitals',
  });

  useEffect(() => {
    getTask();
  }, []);

  if (loading) return <LoadingBar />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div>
        <PatientDetailsHeader data={data ? data[0] : null} />
        <PatientDetailsBody />
      </div>
    </div>
  );
}
