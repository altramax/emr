'use client';
import React, { useEffect } from 'react';
import PatientTable from '@/src/components/organisms/patients/patient-table';
import Header from '@/src/components/organisms/patients/header';
import { useGetData } from '@/src/hooks/get-data';
import { useRouter } from 'next/navigation';

export default function PatientTemplate() {
  const router = useRouter();
  const { getData, data } = useGetData({
    tableName: 'patients',
    select: 'id,first_name,last_name,date_of_birth,status,gender,phone_number',
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <Header title="Patients" subTitle="Click to select a patient" />
      <div className="flex justify-between items-start mt-12">
        <div className="flex items-center justify-between mb-4 gap-8">
          <input
            type="text"
            placeholder="Search for patient by name"
            className="w-[300px] px-4 py-2 border rounded"
          />
        </div>
        <button
          onClick={() => router.push('/patients/new-patient')}
          className=" bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Patient
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <PatientTable patients={data} />
      </div>
    </div>
  );
}
