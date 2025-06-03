'use client';
import React, { useEffect, useState } from 'react';
import RecordTable from '../../organisms/records/record-table';
import Header from '@/src/components/organisms/patients/header';
import { useQueryPatient } from '@/src/hooks/patient/use-query-patient';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';

export default function RecordsTemplate() {
  const [name, setName] = useState('');
  const { queryPatient, data, loading, clearData } = useQueryPatient({
    tableName: 'patients',
    select: 'first_name,last_name,id,gender,date_of_birth,status',
    name,
  });
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    if (debouncedName) {
      queryPatient();
    }
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
    <div className="p-6 bg-white min-h-screen">
      <Header title="Patients" subTitle="Search for a patient or add a new patient" />
      <div className="flex justify-between items-start mt-12 w-full border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-4 gap-8 w-[50%] relative">
          <input
            type="text"
            placeholder="Search for patient by name or id"
            className="w-full px-4 py-2 border rounded-lg"
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
      <div className="overflow-x-auto mt-6">
        <RecordTable patients={data} />
      </div>
    </div>
  );
}
