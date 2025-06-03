'use client';
import React, { useEffect } from 'react';
import PatientCareTable from '@/src/components/organisms/patient-care/patient-care-table';
import Header from '@/src/components/organisms/patients/header';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import { usePathname } from 'next/navigation';

export default function PatientCareTemplate() {
  const pathname = usePathname();
  const title = pathname?.split('/')[2].charAt(0).toUpperCase() + pathname?.split('/')[2].slice(1);

  const { getTask, data } = useGetTasks({
    select: '*',
    name: 'vitals',
  });

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <Header title={title} subTitle="Click to select a patient" />
      <div className="flex justify-between items-start mt-12">
        <div className="flex items-center justify-between mb-4 gap-8">
          <input
            type="text"
            placeholder="Search for patient by name"
            className="w-[300px] px-4 py-2 border rounded"
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <PatientCareTable patients={data} />
      </div>
    </div>
  );
}
