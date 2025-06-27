'use client';

import { useFormContext } from 'react-hook-form';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import Button from '../../atoms/button/button';
import { useRouter, usePathname } from 'next/navigation';
import { useInsertPatient } from '@/src/hooks/patient/use-insert-patient';
import { useUpdatePatient } from '@/src/hooks/patient/use-update-patient';

type patientReviewStep = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  id?: any;
};

export default function PatientReviewStep({ id }: patientReviewStep) {
  const { getValues } = useFormContext();
  const { currentStep, setStep } = useNewPatientStore();
  const pathname = usePathname();
  const router = useRouter();
  const values = getValues();

  const submitData = {
    ...values,
    // blood_group: values?.blood_group?.value,
    status: 'active',
    gender: values?.gender?.value,
    marital_status: values?.marital_status?.value,
    // genotype: values?.genotype?.value,
  };

  const { insertPatient } = useInsertPatient({ columns: submitData });
  const { updatePatient } = useUpdatePatient({
    columns: submitData,
    id: id,
  });

  const insertForm = async () => {
    const response = await insertPatient();
    if (response === 'success') {
      setStep(1);
      router.push('/patients');
    }
  };

  const updateForm = async () => {
    const response = await updatePatient();
    if (response === 'success') {
      setStep(1);
      router.push('/patients');
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
          type="button"
          value="Submit"
          onClick={pathname.includes('edit-patient') ? updateForm : insertForm}
          className="text-sm bg-blue-500 w-[100px] py-2  text-white rounded-lg hover:bg-blue-600 focus:outline-none "
        />
      </div>
    </div>
  );
}
