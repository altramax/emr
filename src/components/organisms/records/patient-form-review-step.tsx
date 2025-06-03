'use client';

import { useFormContext } from 'react-hook-form';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import Button from '../../atoms/button/button';
import { toast } from 'react-toastify';
import { createClient } from '@/src/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function PatientReviewStep() {
  const { getValues } = useFormContext();
  const values = getValues();
  const { currentStep, setStep } = useNewPatientStore();
  const supabase = createClient();
  const router = useRouter();

  const submitForm = async () => {
    const submitData = getValues();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const data: any = {
      ...submitData,
      blood_group: submitData?.blood_group?.value,
      status: 'active',
      gender: submitData?.gender?.value,
      marital_status: submitData?.marital_status?.value,
      genotype: submitData?.genotype?.value,
    };

    try {
      const { status } = await supabase.from('patients').insert(data);
      if (status === 201) {
        toast.success('Patient added successfully');
        router.push('/patients');
      } else if (status >= 400) {
        toast.error('Patient already exists');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding patient');
    }
  };

  const handleBackStep = () => {
    setStep(currentStep - 1);
  };

  const rows = [
    { key: 'first_name', label: 'First Name', value: values?.first_name },
    { key: 'last_name', label: 'Last Name', value: values?.last_name },
    { key: 'date_of_birth', label: 'Date of Birth', value: values?.date_of_birth },
    { key: 'gender', label: 'Gender', value: values?.gender?.label },
    { key: 'marital_status', label: 'Marital Status', value: values?.marital_status?.label },
    { key: 'occupation', label: 'Occupation', value: values?.occupation },
    { key: 'email', label: 'Email', value: values?.email },
    { key: 'phone_number', label: 'Phone Number', value: values?.phone_number },
    { key: 'religion', label: 'Religion', value: values?.religion },
    { key: 'address', label: 'Address', value: values?.address },
    {
      key: 'emergency_contact_name',
      label: 'Emergency Contact Name',
      value: values?.emergency_contact_name,
    },
    {
      key: 'emergency_contact_number',
      label: 'Emergency Contact Number',
      value: values?.emergency_contact_number,
    },
    {
      key: 'emergency_contact_relationship',
      label: 'Emergency Contact Relationship',
      value: values?.emergency_contact_relationship,
    },
  ];

  return (
    <div className="">
      <div className="bg-white p-6">
        {rows.map(({ label, value }) => (
          <div key={label} className="text-xs flex justify-between items-center border-b py-3">
            <p className="text-gray-600 font-medium">{label}</p>
            <p className="text-gray-900 font-semibold">{value || '—'}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-6">
        <Button
          type="button"
          value="Back"
          onClick={handleBackStep}
          className="w-[100px] text-sm bg-gray-300 py-2 text-black rounded-lg hover:bg-gray-400 "
        />
        <Button
          type="submit"
          value="Submit"
          onClick={submitForm}
          className="text-sm bg-blue-500 w-[100px] py-2  text-white rounded-lg hover:bg-blue-600 focus:outline-none "
        />
      </div>
    </div>
  );
}
