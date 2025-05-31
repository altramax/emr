'use client';

import Input from '../../atoms/Input/input-field';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import { useFormContext } from 'react-hook-form';
// import { useNewPatientStore } from '@/src/store/new-patient-store';
// import Button from '../../atoms/button/button';
// import { toast } from 'react-toastify';
// import { createClient } from '@/src/utils/supabase/client';
// import { useRouter } from 'next/navigation';

export default function PatientMedicalInfo() {
  const { control } = useFormContext();
  // const { currentStep, setStep } = useNewPatientStore();
  // const supabase = createClient();
  // const router = useRouter();

  const bloodGroupOptions = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
  ];

  const genotypeOptions = [
    { label: 'AA', value: 'AA' },
    { label: 'AS', value: 'AS' },
    { label: 'SS', value: 'SS' },
    { label: 'AC', value: 'AC' },
    { label: 'SC', value: 'SC' },
  ];

  const statusOptions = [
    { label: 'Observation', value: 'observation' },
    { label: 'Admitted', value: 'admitted' },
    { label: 'Discharged', value: 'discharged' },
  ];

  // const submitForm = async () => {
  //   const submitData = getValues();
  //   /* eslint-disable  @typescript-eslint/no-explicit-any */
  //   const data: any = {
  //     ...submitData,
  //     blood_group: submitData?.blood_group?.value,
  //     status: submitData?.status?.value,
  //     gender: submitData?.gender?.value,
  //     marital_status: submitData?.marital_status?.value,
  //     genotype: submitData?.genotype?.value,
  //   };

  //   try {
  //     const { status } = await supabase.from('patients').insert(data);
  //     if (status === 201) {
  //       toast.success('Patient added successfully');
  //       router.push('/patients');
  //     }
  //     if (status >= 400) {
  //       toast.error('Patient already exists');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Error adding patient');
  //   }
  // };

  // const handleBackStep = () => {
  //   setStep(currentStep - 1);
  // };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800 pt-1">Medical Information</h1>

      <div className="w-full">
        <SelectDropdown
          name="blood_group"
          label="Blood group"
          placeholder="Select blood group"
          options={bloodGroupOptions}
          control={control}
        />
      </div>

      <div className="w-full">
        <SelectDropdown
          name="genotype"
          label="Genotype"
          placeholder="Select genotype"
          options={genotypeOptions}
          control={control}
        />
      </div>

      <div className="w-full">
        <SelectDropdown
          name="status"
          label="Status"
          placeholder="Select status"
          options={statusOptions}
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Allergies"
          name="allergies"
          type="text"
          placeholder="List known allergies"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Existing medical conditions"
          name="existing_conditions"
          type="text"
          placeholder="E.g. diabetes, asthma"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>

      <div className="w-full">
        <Input
          label="Current medications"
          name="current_medications"
          type="text"
          placeholder="E.g. paracetamol, insulin"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-12"
          control={control}
        />
      </div>
    </div>
  );
}
