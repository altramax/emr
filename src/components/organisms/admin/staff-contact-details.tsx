'use client';

import Input from '../../atoms/Input/input-field';
import { useFormContext } from 'react-hook-form';
import { useNewStaffStore } from '@/src/store/new-staff-store';
import Button from '../../atoms/button/button';

export default function StaffContactInfo() {
  const { control, trigger } = useFormContext();
  const { currentStep, setStep } = useNewStaffStore();

  const validateFields = async () => {
    const isValid = await trigger([
      'email',
      'phone_number',
      'address',
      'emergency_contact_name',
      'emergency_contact_number',
      'emergency_contact_relationship',
    ]);
    return isValid;
  };

  const handleNextStep = async () => {
    const isValid = await validateFields();
    if (isValid) {
      setStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    setStep(currentStep - 1);
  };

  return (
    <div className="space-y-4">
      {/* Contact Email */}
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

      {/* Contact Phone */}
      <div className="w-full">
        <Input
          label="Phone Number"
          asterisk
          name="phone_number"
          id="phone_number"
          type="tel"
          placeholder="Enter phone number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      {/* Residential Address */}
      <div className="w-full">
        <Input
          label="Address"
          asterisk
          name="address"
          id="address"
          type="text"
          placeholder="Residential address"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      {/* Emergency Contact Name */}
      <div className="w-full">
        <Input
          label="Emergency Contact Name"
          asterisk
          name="emergency_contact_name"
          id="emergency_contact_name"
          type="text"
          placeholder="Full name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      {/* Emergency Contact Phone */}
      <div className="w-full">
        <Input
          label="Emergency Contact Number"
          asterisk
          name="emergency_contact_number"
          id="emergency_contact_number"
          type="tel"
          placeholder="Phone number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      {/* Emergency Relationship */}
      <div className="w-full">
        <Input
          label="Emergency Contact Relationship"
          asterisk
          name="emergency_contact_relationship"
          id="emergency_contact_relationship"
          type="text"
          placeholder="e.g., Spouse, Friend, Sister"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
          control={control}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between py-6">
        <Button
          type="button"
          value="Back"
          onClick={handleBackStep}
          className="w-[100px] text-sm bg-gray-300 py-2 text-black rounded-lg hover:bg-gray-400"
        />
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
