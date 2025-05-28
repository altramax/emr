'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPatientSchema, inputType } from '@/src/validations/new-patient-schema';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import StepIndicator from '@/src/components/molecules/step-indicator/step-indicator';
import PatientBiodata from '@/src/components/organisms/patients/patient-biodata';
import PatientContactInfo from '@/src/components/organisms/patients/patient-contact-details';
import PatientMedicalInfo from '@/src/components/organisms/patients/patient-medical-info';
import { useRouter } from 'next/navigation';

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: undefined,
  gender: { label: '', value: '' },
  marital_status: { label: '', value: '' },
  occupation: '',
  blood_group: { label: '', value: '' },
  email: '',
  phone_number: '',
  status: { label: '', value: '' },
  religion: '',
  address: '',
  emergency_contact_name: '',
  emergency_contact_number: '',
  emergency_contact_relationship: '',
  genotype: { label: '', value: '' },
  allergies: '',
  existing_conditions: '',
  current_medications: '',
};

export default function NewPatientTemplate() {
  const router = useRouter();
  const methods = useForm<inputType>({
    resolver: yupResolver(NewPatientSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const { currentStep } = useNewPatientStore();

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <PatientBiodata />;
      case 2:
        return <PatientContactInfo />;
      case 3:
        return <PatientMedicalInfo />;
      default:
        return <PatientBiodata />;
    }
  };

  return (
    <div className="w-full h-[100vh] py-6 flex flex-col justify-center items-center">
      <div className="w-[700px] rounded-xl shadow-xl bg-white py-4  relative overflow-auto no-scrollbar">
        <div className="px-8 flex items-center justify-start gap-4 pb-4 border-b">
          <button
            onClick={() => router.push('/patients')}
            className=" text-lg flex items-center gap-2 text-black px-4 py-1 rounded-lg  hover:bg-gray-200 transition"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Patient
          </button>
        </div>

        <div className="py-4 px-8">
          <StepIndicator steps={3} currentStep={currentStep} />
        </div>

        <FormProvider {...methods}>
          <form className="px-8">{renderForm()}</form>
        </FormProvider>
      </div>
    </div>
  );
}
