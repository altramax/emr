'use client';

import Input from '../../atoms/Input/input-field';
import { useFormContext } from 'react-hook-form';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import Button from '../../atoms/button/button';
import { useEffect } from 'react';

type patientType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data?: any;
};
export default function PatientContactInfo({ data }: patientType) {
  const { control, trigger, setValue } = useFormContext();
  const { currentStep, setStep } = useNewPatientStore();

  useEffect(() => {
    if (data) {
      setValue('email', data?.email);
      setValue('phone_number', data?.phone_number);
      setValue('address', data?.address);
      setValue('emergency_contact_name', data?.emergency_contact_name);
      setValue('emergency_contact_number', data?.emergency_contact_number);
      setValue('emergency_contact_relationship', data?.emergency_contact_relationship);
    }
  }, [data]);

  const triggerValidation = async () => {
    const isValid = await trigger([
      'email',
      'phone_number',
      'address',
      'emergency_contact_name',
      'emergency_contact_number',
      'emergency_contact_relationship',
    ]);
    if (!isValid) {
      return false;
    } else {
      return true;
    }
  };

  const nextStep = async () => {
    const isValid = await triggerValidation();
    if (isValid) {
      setStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    setStep(currentStep - 1);
  };

  return (
    <div className="space-y-4">
      <div className="w-full">
        <Input
          label="Email"
          asterisk
          name="email"
          id="email"
          type="email"
          placeholder="Enter email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Phone number"
          asterisk
          name="phone_number"
          id="phone_number"
          placeholder="Enter phone number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Address"
          asterisk
          name="address"
          id="address"
          type="text"
          placeholder="Enter address"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Emergency contact name"
          asterisk
          name="emergency_contact_name"
          id="emergency_contact_name"
          type="text"
          placeholder="Enter full name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Emergency contact number"
          asterisk
          name="emergency_contact_number"
          id="emergency_contact_number"
          type="tel"
          placeholder="Enter phone number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Emergency contact relationship"
          asterisk
          name="emergency_contact_relationship"
          id="emergency_contact_relationship"
          type="text"
          placeholder="e.g. Sister, Friend, etc."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      <div className="flex items-center justify-between py-6">
        <Button
          type="button"
          value="Back"
          onClick={handleBackStep}
          className="w-[100px] text-sm bg-gray-300 py-2 text-black rounded-lg hover:bg-gray-400 "
        />
        <Button
          type="button"
          value="Next"
          onClick={nextStep}
          className="text-sm bg-blue-500 w-[100px] py-2  text-white rounded-lg hover:bg-blue-600 focus:outline-none "
        />
      </div>
    </div>
  );
}
