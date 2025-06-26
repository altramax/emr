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
import { useRouter, useParams } from 'next/navigation';
import { XCircleIcon } from 'lucide-react';
import { useQueryStaff } from '@/src/hooks/staff/use-query-staff';
import { useEffect } from 'react';
import Loading from '../../atoms/loading-bar/loading-bar-page';

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

export default function EditStaffTemplate() {
  const router = useRouter();
  const methods = useForm<InputType>({
    resolver: yupResolver(NewStaffSchema),
    mode: 'all',
    defaultValues: initialValues,
  });
  const param = useParams();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const id: any = param ? param?.editstaffid : '';

  const { queryStaff, data, loading } = useQueryStaff({ staff_id: id });

  useEffect(() => {
    queryStaff();
  }, []);

  const { currentStep } = useNewStaffStore();

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <StaffBiodata data={data?.[0]} />;
      case 2:
        return <StaffContactInfo data={data?.[0]} />;
      case 3:
        return <StaffEmploymentInfo defaultData={data?.[0]} />;
      case 4:
        return <StaffReviewStep staff_id={data?.[0]?.id} />;
      default:
        return <StaffBiodata />;
    }
  };

  if (id && loading) {
    return <Loading />;
  }

  return (
    <div className="text-sm w-full h-[100vh] p-8 flex flex-col justify-center items-center">
      <div className="w-[550px] rounded-xl shadow-xl bg-white py-4  relative overflow-auto no-scrollbar">
        <div className="px-4 flex items-center justify-start gap-2 pb-4 border-b">
          <button
            onClick={() => router.push('/staff')}
            className=" text-sm flex items-center gap-1 text-red-400 px-2 py-1 rounded-md"
          >
            <XCircleIcon size={20} />
          </button>
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
          <form className="px-8">{renderForm()}</form>
        </FormProvider>
      </div>
    </div>
  );
}
