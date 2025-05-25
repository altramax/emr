'use client';
import React, { useState } from 'react';
import PatientTable from '@/src/components/organisms/patients/patient-table';
import Header from '@/src/components/organisms/patients/header';
import SelectDropdown from '@/src/components/atoms/select-dropdown/select-dropdown';
import AddPatientModal from '../../organisms/patients/add-patients';

export default function PatientTemplate() {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'admitted', label: 'Admitted' },
    { value: 'discharged', label: 'Discharged' },
    { value: 'critical', label: 'Critical' },
    { value: 'outpatient', label: 'Outpatient' },
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
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="filter by"
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
        <PatientTable />
      </div>
      <AddPatientModal isOpen={isOpen} onClose={addPatientModalHandler} />
    </div>
  );
}
