'use client';

import Input from '../../atoms/Input/input-field';
import { useFormContext } from 'react-hook-form';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import Button from '../../atoms/button/button';

export default function PatientContactInfo() {
  const { control, trigger } = useFormContext();
  const { currentStep, setStep } = useNewPatientStore();

  const handleNextStep = async () => {
    const isValid = await trigger([
      'email',
      'phone_number',
      'address',
      'emergency_contact_name',
      'emergency_contact_number',
      'emergency_contact_relationship',
    ]);
    if (isValid) {
      setStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    setStep(currentStep - 1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800 pt-1">Contact Information</h1>

      <div className="w-full">
        <Input
          label="Email"
          asterisk
          name="email"
          id="email"
          type="email"
          placeholder="Enter email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          type="button"
          value="Back"
          onClick={handleBackStep} // You need to define this function
          className="w-[150px] text-lg bg-gray-300 text-black rounded-xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <Button
          type="button"
          value="Next"
          onClick={handleNextStep}
          className="w-[150px] text-lg bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
