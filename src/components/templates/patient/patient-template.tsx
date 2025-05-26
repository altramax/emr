'use client';
import React, { useState, useEffect } from 'react';
import PatientTable from '@/src/components/organisms/patients/patient-table';
import Header from '@/src/components/organisms/patients/header';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import AddPatientModal from '../../organisms/patients/add-patients';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddPatientSchema, inputType } from '@/src/validations/add-patient-schema';
import { useGetData } from '@/src/hooks/get-data-hook';

export default function PatientTemplate() {
  const [selectedValue, setSelectedValue] = useState<{ label: string; value: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { getData, data, refetch } = useGetData({ roleName: 'patients', select: '*' });

  useEffect(() => {
    getData();
  }, []);

  const { control } = useForm<inputType>({
    resolver: yupResolver(AddPatientSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      status: { label: '', value: '' },
    },
  });

  const options = [
    { value: 'admitted', label: 'Admitted (Inpatient)' },
    { value: 'discharged', label: 'Discharged' },
    { value: 'critical', label: 'Critical Condition' },
    { value: 'outpatient', label: 'Outpatient Care' },
    { value: 'observation', label: 'Under Observation' },
    { value: 'emergency', label: 'Emergency Care' },
    { value: 'recovering', label: 'Recovering' },
  ];

  const addPatientModalHandler = () => {
    setIsOpen(!isOpen);
  };

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
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Patient Status"
            control={control}
            className="w-[300px] h-[46px]"
          />
        </div>
        <button
          onClick={addPatientModalHandler}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Patient
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <PatientTable patients={data} />
      </div>
      <AddPatientModal isOpen={isOpen} onClose={addPatientModalHandler} refetch={() => refetch()} />
    </div>
  );
}
