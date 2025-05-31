'use client';

import Input from '../../atoms/Input/input-field';
import { useFormContext } from 'react-hook-form';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import Button from '../../atoms/button/button';

export default function PatientBiodata() {
  const { control, trigger } = useFormContext();
  const { currentStep, setStep } = useNewPatientStore();

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'unspecified' },
  ];

  const maritalStatusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    { label: 'Cohabiting', value: 'cohabiting' },
    { label: 'Separated', value: 'separated' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
  ];

  const handleNextStep = async () => {
    const isValid = await trigger([
      'first_name',
      'last_name',
      'date_of_birth',
      'gender',
      'marital_status',
      'occupation',
      'religion',
    ]);
    if (isValid) {
      setStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-4 ">
      <h1 className="text-xl font-semibold text-gray-800 pt-1">Patient Biodata</h1>

      <div className="w-full">
        <Input
          label="First name"
          asterisk
          name="first_name"
          id="first_name"
          type="text"
          placeholder="First Name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>
      <div className="w-full">
        <Input
          label="Last name"
          asterisk
          name="last_name"
          id="last_name"
          type="text"
          placeholder="Last Name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Date of birth"
          asterisk
          name="date_of_birth"
          type="date"
          placeholder="Date of Birth"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>
      <div className="w-full">
        <SelectDropdown
          name="gender"
          label="Gender"
          placeholder="Select Gender"
          asterisk
          options={genderOptions}
          control={control}
        />
      </div>

      <div className="w-full">
        <SelectDropdown
          name="marital_status"
          label="Marital status"
          placeholder="Select Marital Status"
          asterisk
          options={maritalStatusOptions}
          control={control}
        />
      </div>
      <div className="w-full">
        <Input
          label="Religion"
          name="religion"
          type="text"
          placeholder="Enter religion"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>
      <div className="w-full">
        <Input
          label="Occupation"
          asterisk
          name="occupation"
          type="text"
          placeholder="Occupation"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>

      <div className="flex items-center justify-end pt-4">
        <Button
          type="button"
          value="Next"
          onClick={handleNextStep}
          className="w-[150px] text-lg bg-blue-700  text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
