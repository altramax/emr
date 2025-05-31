'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPatientSchema, inputType } from '@/src/validations/new-patient-schema';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import StepIndicator from '@/src/components/molecules/step-indicator/step-indicator';
import PatientBiodata from '@/src/components/organisms/patients/patient-biodata';
import PatientContactInfo from '@/src/components/organisms/patients/patient-contact-details';
// import PatientMedicalInfo from '@/src/components/organisms/patients/patient-medical-info';
import { useRouter } from 'next/navigation';

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: undefined,
  gender: { label: '', value: '' },
  marital_status: { label: '', value: '' },
  occupation: '',
  email: '',
  phone_number: '',
  religion: '',
  address: '',
  emergency_contact_name: '',
  emergency_contact_number: '',
  emergency_contact_relationship: '',
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
      default:
        return <PatientBiodata />;
    }
  };

  return (
    <div className="text-sm w-full h-[100vh] py-6 flex flex-col justify-center items-center">
      <div className="w-[700px] rounded-xl shadow-xl bg-white py-4  relative overflow-auto no-scrollbar">
        <div className="px-8 flex items-center justify-start gap-4 pb-4 border-b">
          <button
            onClick={() => router.push('/records')}
            className=" text-lg flex items-center gap-1 text-black px-4 py-1 rounded-lg  hover:text-blue-500 transition"
          >
            <svg
              width="20"
              height="20"
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
            back
          </button>
        </div>

        <div className="py-4 px-8 w-[50%] m-auto">
          <StepIndicator steps={2} currentStep={currentStep} />
        </div>

        <FormProvider {...methods}>
          <form className="px-8">{renderForm()}</form>
        </FormProvider>
      </div>
    </div>
  );
}
