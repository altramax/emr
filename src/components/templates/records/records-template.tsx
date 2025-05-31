'use client';
import React, { useEffect, useState } from 'react';
import RecordTable from '../../organisms/records/record-table';
import Header from '@/src/components/organisms/patients/header';
import { useGetPatient } from '@/src/hooks/get-patient';
import { useRouter } from 'next/navigation';
import { UserRoundPlus, Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/use-debounce';

export default function RecordsTemplate() {
  const router = useRouter();
  const [name, setName] = useState('');
  const { getPatient, data, loading, clearData } = useGetPatient({
    tableName: 'patients',
    select: 'first_name,last_name,id,gender,date_of_birth,status',
    name,
  });
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    if (debouncedName) {
      getPatient();
    }
  }, [debouncedName]);

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
            onChange={(e) => setName(e.target.value)}
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
        <button
          onClick={() => router.push('/records/new-patient')}
          className=" bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex justify-center gap-2 items-center"
        >
          <UserRoundPlus size={18} />
          Add Patient
        </button>
      </div>
      <div className="overflow-x-auto mt-6">
        <RecordTable patients={data} />
      </div>
    </div>
  );
}
