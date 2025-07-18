'use client';
import React, { useEffect, useState } from 'react';
import { useQueryPatient } from '@/src/hooks/patient/use-query-patient';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import PatientCard from '../../organisms/patient/patient-card';
import EmptyState from '../../molecules/empty-state/empty-state';
import { useRouter } from 'next/navigation';

export default function PatientTemplate() {
  const [name, setName] = useState('');
  const debouncedName = useDebounce(name, 500);
  const {
    queryPatient,
    data: patients,
    loading,
    clearData,
  } = useQueryPatient({
    select: 'first_name,last_name,id,gender,date_of_birth,status',
    name: debouncedName,
  });
  const router = useRouter();

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
    <div className="p-8 bg-white min-h-screen">
      <Header title="Patients" subTitle="Search for patients here" />
      <div className="flex justify-between items-start mt-8 w-full ">
        <div className="flex items-center justify-between mb-2 gap-8 w-[50%] relative">
          <input
            type="text"
            placeholder="Search for staff here by name"
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
      <div className=" w-[800px] border-b border-gray-200 pb-4"></div>
      <div className="overflow-x-auto mt-6">
        {patients &&
          (patients?.length > 0 ? (
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            patients.map((patient: any) => (
              <div key={patient?.id}>
                <PatientCard
                  {...patient}
                  onChange={() => router.push(`/patients/${patient?.id}`)}
                  key={patient?.id}
                />
              </div>
            ))
          ) : (
            <EmptyState title="No Patient found" message="No record found for this patient" />
          ))}
      </div>
    </div>
  );
}
