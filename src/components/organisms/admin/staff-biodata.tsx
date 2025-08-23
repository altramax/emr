'use client';

import Input from '../../atoms/Input/input-field';
import { useFormContext } from 'react-hook-form';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import Button from '../../atoms/button/button';
import { useNewStaffStore } from '@/src/store/new-staff-store';
import { useEffect } from 'react';

type staffType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data?: any;
};

export default function StaffBiodata({ data }: staffType) {
  const { control, trigger, setValue } = useFormContext();
  const { currentStep, setStep } = useNewStaffStore();
  console.log(data);
  useEffect(() => {
    if (data) {
      setValue('first_name', data?.first_name);
      setValue('last_name', data?.last_name);
      setValue('other_names', data?.other_names);
      setValue('date_of_birth', data?.date_of_birth);
      setValue('gender', { label: data?.gender, value: data?.gender });
      setValue('marital_status', { label: data?.marital_status, value: data?.marital_status });
      setValue('nationality', data?.nationality);
      setValue('religion', data?.religion);
      setValue('address', data?.address);
    }
  }, [data]);

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
      'other_names',
      'date_of_birth',
      'gender',
      'marital_status',
      'nationality',
      'religion',
      'address',
    ]);

    if (isValid) {
      setStep(currentStep + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full">
        <Input
          label="First Name"
          asterisk
          name="first_name"
          id="first_name"
          type="text"
          placeholder="First Name"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="w-full">
        <Input
          label="Last Name"
          asterisk
          name="last_name"
          id="last_name"
          type="text"
          placeholder="Last Name"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="w-full">
        <Input
          label="Other Names"
          name="other_names"
          id="other_names"
          type="text"
          placeholder="Middle or Other Names"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="w-full">
        <Input
          label="Date of Birth"
          asterisk
          name="date_of_birth"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="w-full">
        <SelectDropdown
          label="Gender"
          asterisk
          name="gender"
          options={genderOptions}
          placeholder="Select Gender"
          control={control}
        />
      </div>

      <div className="w-full">
        <SelectDropdown
          label="Marital Status"
          asterisk
          name="marital_status"
          options={maritalStatusOptions}
          placeholder="Select Marital Status"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Nationality"
          asterisk
          name="nationality"
          placeholder="Nationality"
          type="text"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="w-full">
        <Input
          label="Religion"
          name="religion"
          placeholder="Religion (optional)"
          type="text"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="w-full">
        <Input
          label="Address"
          name="address"
          placeholder="Residential Address"
          asterisk
          type="text"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      <div className="flex items-center justify-end py-4">
        <Button
          type="button"
          value="Next"
          onClick={handleNextStep}
          className="text-sm bg-blue-500 w-[100px] py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
