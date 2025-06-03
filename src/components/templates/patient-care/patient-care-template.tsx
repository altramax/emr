'use client';
import React, { useEffect, useState } from 'react';
import PatientCareTable from '@/src/components/organisms/patient-care/patient-care-table';
import Header from '@/src/components/organisms/patients/header';
import { usePathname } from 'next/navigation';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import { useQueryTask } from '@/src/hooks/task/use-query-task';
import EmptyState from '../../molecules/empty-state/empty-state';

export default function PatientCareTemplate() {
  const pathname = usePathname();
  const title = pathname?.split('/')[2].charAt(0).toUpperCase() + pathname?.split('/')[2].slice(1);
  const [name, setName] = useState('');
  const debouncedName = useDebounce(name, 500);
  const taskName =
    pathname?.split('/')[2].toLowerCase() === 'add-vitals'
      ? 'vitals'
      : pathname?.split('/')[2].toLowerCase();

  const {
    queryTask,
    data: queryData,
    loading,
    clearData,
  } = useQueryTask({
    select: '*',
    name: debouncedName,
    task_name: taskName,
  });

  useEffect(() => {
    queryTask();
  }, [debouncedName]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const inputHandler = (e: any) => {
    setName(e.target.value);
    if (e.target.value.length < 1) {
      resetField();
    }
  };

  const resetField = () => {
    setName('');
    clearData();
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <Header title={title} subTitle={`Select patient to ${taskName}`} />
      <div className="flex justify-between items-start mt-6 w-full border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-4 gap-8 w-[50%] relative">
          <input
            type="text"
            placeholder="Search for patient by name or id"
            className="w-full px-4 py-2 border rounded-lg text-sm"
            onChange={(e) => inputHandler(e)}
            value={name}
          />
          {name && (
            <XIcon
              size={18}
              className="cursor-pointer absolute right-12 top-1/2 transform -translate-y-1/2 border rounded-full p-1 w-6 h-6 border-red-600 text-red-600"
              onClick={resetField}
            />
          )}
          {loading ? (
            <Loader
              size={18}
              className=" text-gray-950 absolute right-4 top-1/2 transform -translate-y-1/2"
            />
          ) : (
            <Search
              size={18}
              className="text-gray-950 absolute right-4 top-1/2 transform -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        {!loading &&
          (queryData?.length > 0 ? (
            <PatientCareTable patients={queryData} />
          ) : (
            <EmptyState title="No task found" message="No task found for this patient" />
          ))}
      </div>
    </div>
  );
}
