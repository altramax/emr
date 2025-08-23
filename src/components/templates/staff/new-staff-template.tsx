'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewStaffSchema, InputType } from '@/src/validations/new-staff-schema';
import { useNewStaffStore } from '@/src/store/new-staff-store';
import StepIndicator from '@/src/components/molecules/step-indicator/step-indicator';
import StaffBiodata from '@/src/components/organisms/admin/staff-biodata';
import StaffContactInfo from '@/src/components/organisms/admin/staff-contact-details';
import StaffReviewStep from '@/src/components/organisms/admin/Staff-form-review-step';
import StaffEmploymentInfo from '../../organisms/admin/staff-employment-info';
import { IdCard } from 'lucide-react';

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: undefined,
  gender: { label: '', value: '' },
  marital_status: { label: '', value: '' },
  religion: '',
  email: '',
  phone_number: '',
  address: '',
  emergency_contact_name: '',
  emergency_contact_number: '',
  emergency_contact_relationship: '',
  role: { label: '', value: '' },
  department: { label: '', value: '' },
  job_title: '',
  employment_type: { label: '', value: '' },
  date_hired: '',
};

export default function NewStaffTemplate() {
  const methods = useForm<InputType>({
    resolver: yupResolver(NewStaffSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const { currentStep } = useNewStaffStore();

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <StaffBiodata />;
      case 2:
        return <StaffContactInfo />;
      case 3:
        return <StaffEmploymentInfo />;
      case 4:
        return <StaffReviewStep />;
      default:
        return <StaffBiodata />;
    }
  };

  return (
    <div className="text-sm w-full h-screen p-8 flex justify-center items-center">
      <div className="w-[550px]  h-[700px] rounded-xl shadow-xl bg-white py-4  relative overflow-auto no-scrollbar">
        <div className="px-4 flex items-center justify-start pb-4 border-b">
          <div className=" text-sm flex items-center text-blue-400 px-2 py-1 rounded-md">
            <IdCard size={20} />
          </div>
          <div>
            {currentStep === 1 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Staff biodata</h1>
            )}
            {currentStep === 2 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Staff contact information</h1>
            )}
            {currentStep === 3 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Staff Employment Information</h1>
            )}
            {currentStep === 4 && (
              <h1 className="text-lg font-semibold text-gray-800 ">Review Staff Information</h1>
            )}
          </div>
        </div>

        <div className="py-4 px-4">
          <StepIndicator steps={4} currentStep={currentStep} />
        </div>

        <FormProvider {...methods}>
          <form className="px-8 h-[550px] overflow-auto no-scrollbar">{renderForm()}</form>
        </FormProvider>
      </div>
    </div>
  );
}
