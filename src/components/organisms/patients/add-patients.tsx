'use client';

import { useState } from 'react';
import Input from '../../atoms/Input/input-field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddPatientSchema, inputType } from '@/src/validations/add-patient-schema';
import SelectDropdown from '../../atoms/select-dropdown/select-dropdown';
import Textarea from '../../atoms/TextArea/text-area';
import Button from '../../atoms/button/button';
import { toast } from 'react-toastify';
import { createClient } from '@/src/utils/supabase/client';

type AddPatientModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialValues = {
  firstName: '',
  lastName: '',
  dateOfBirth: undefined,
  status: { label: '', value: '' },
};

export default function AddPatientModal({ isOpen, onClose }: AddPatientModalProps) {
  const [selectedValue, setSelectedValue] = useState<{ label: string; value: string } | null>(null);
  const supabase = createClient();
  const { control, handleSubmit } = useForm<inputType>({
    resolver: yupResolver(AddPatientSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const submitForm = async (data: inputType) => {
    const submitData = {
      first_name: data.firstName,
      last_name: data.lastName,
      date_of_birth: data.dateOfBirth,
      status: data.status?.value,
    };

    try {
      const { data: response } = await supabase.from('patients').insert([submitData]);
      console.log(response);
      toast.success('Patient added successfully');
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Error adding patient');
    }
  };

  const options = [
    { value: 'admitted', label: 'Admitted (Inpatient)' },
    { value: 'discharged', label: 'Discharged' },
    { value: 'critical', label: 'Critical Condition' },
    { value: 'outpatient', label: 'Outpatient Care' },
    { value: 'observation', label: 'Under Observation' },
    { value: 'emergency', label: 'Emergency Care' },
    { value: 'recovering', label: 'Recovering' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-[800px]">
        <div className="flex justify-between items-center p-6  border-b">
          <h3 className="text-xl font-bold text-gray-800">Add New Patient</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-[48%] pt-4">
              <Input
                label="First name"
                asterisk={true}
                name="firstName"
                id="First name"
                type="text"
                placeholder="First Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
                control={control}
              />
            </div>
            <div className="w-[48%] pt-4">
              <Input
                label="Last name"
                asterisk={true}
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
                control={control}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-[48%] pt-4">
              <Input
                label="Date of Birth"
                asterisk={true}
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
                control={control}
              />
            </div>

            <div className="w-[48%] pt-4">
              <SelectDropdown
                name="status"
                options={options}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Patient Status"
                label="Status"
                asterisk={true}
                control={control}
              />
            </div>
          </div>

          <div>
            <Textarea
              name="address"
              placeholder="Address"
              label="Address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              control={control}
            />
          </div>

          <div className="flex justify-center space-x-3 pt-4">
            <Button
              type="submit"
              value="Save"
              className="mt-4 w-[200px] text-lg bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
