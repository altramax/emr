'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPatientSchema, inputType } from '@/src/validations/new-patient-schema';
import { useNewPatientStore } from '@/src/store/new-patient-store';
import StepIndicator from '@/src/components/molecules/step-indicator/step-indicator';
import PatientBiodata from '@/src/components/organisms/records/patient-biodata';
import PatientContactInfo from '@/src/components/organisms/records/patient-contact-details';
import PatientReviewStep from '../../organisms/records/patient-form-review-step';
import { IdCard } from 'lucide-react';

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
        return <PatientReviewStep />;
      default:
        return <PatientBiodata />;
    }
  };

  return (
    <div className="text-sm w-full h-[100vh] p-8 flex flex-col justify-center items-center">
      <div className="w-[550px] rounded-xl shadow-xl bg-white py-4  relative overflow-auto no-scrollbar">
        <div className="px-4 flex items-center justify-start gap-2 pb-4 border-b">
          <div className=" text-sm flex items-center text-blue-400 px-2 py-1 rounded-md">
            <IdCard size={20} />
          </div>
          <div>
            {currentStep === 1 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Patient biodata</h1>
            )}
            {currentStep === 2 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Patient contact information</h1>
            )}
            {currentStep === 3 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Review Patient Information</h1>
            )}
          </div>
        </div>

        <div className="py-4 px-4">
          <StepIndicator steps={3} currentStep={currentStep} />
        </div>

        <FormProvider {...methods}>
          <form className="px-8">{renderForm()}</form>
        </FormProvider>
      </div>
    </div>
  );
}
