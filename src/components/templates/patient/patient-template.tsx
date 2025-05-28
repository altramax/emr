'use client';
import React, { useEffect } from 'react';
import PatientTable from '@/src/components/organisms/patients/patient-table';
import Header from '@/src/components/organisms/patients/header';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPatientSchema, inputType } from '@/src/validations/new-patient-schema';
import { useGetData } from '@/src/hooks/get-data-hook';
import { useRouter } from 'next/navigation';

export default function PatientTemplate() {
  const { getData, data } = useGetData({
    roleName: 'patients',
    select: 'id,first_name,last_name,date_of_birth,status,gender,phone_number',
  });
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const { control } = useForm<inputType>({
    resolver: yupResolver(NewPatientSchema),
    mode: 'onChange',
    defaultValues: {
      status: { label: '', value: '' },
    },
  });

  const options = [
    { label: 'Observation', value: 'observation' },
    { label: 'Admitted', value: 'admitted' },
    { label: 'Discharged', value: 'discharged' },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <Header title="Patients" subTitle="View and manage patient records" />
      <div className="flex justify-between items-start mt-12">
        <div className="flex items-center justify-between mb-4 gap-8">
          <input
            type="text"
            placeholder="Search by name"
            className="w-[300px] px-4 py-2 border rounded"
          />
          <SelectDropdown
            name="status"
            options={options}
            placeholder="Patient Status"
            control={control}
            className="w-[300px] h-[46px]"
          />
        </div>
        <button
          onClick={() => router.push('/patients/new-patient')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
