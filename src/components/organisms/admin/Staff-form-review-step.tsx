'use client';

import { useFormContext } from 'react-hook-form';
import { useNewStaffStore } from '@/src/store/new-staff-store';
import Button from '../../atoms/button/button';
import { usePathname, useRouter } from 'next/navigation';
import { useInsertStaff } from '@/src/hooks/staff/use-insert-staff';
import { useUpdateStaff } from '@/src/hooks/staff/use-update-staff';

type StaffReviewStep = {
  staff_id?: string;
};

export default function StaffReviewStep({ staff_id }: StaffReviewStep) {
  const { getValues } = useFormContext();
  const values = getValues();
  const { currentStep, setStep } = useNewStaffStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleBackStep = () => {
    setStep(currentStep - 1);
  };

  const staffData = {
    ...values,
    gender: values?.gender?.value,
    marital_status: values?.marital_status?.value,
    role: values?.role?.value,
    employment_type: values?.employment_type?.value,
    department: values?.department?.label,
    department_id: values?.department?.value,
  };

  const { insertStaff } = useInsertStaff({ columns: staffData });
  const { updateStaff } = useUpdateStaff({
    columns: staffData,
    staff_id: staff_id ?? '',
  });

  const insertForm = async () => {
    const response = await insertStaff();
    if (response === 'success') {
      setStep(1);
      router.push('/admin/staff');
    }
  };

  const updateForm = async () => {
    const response = await updateStaff();
    if (response === 'success') {
      setStep(1);
      router.push('/admin/staff');
    }
  };

  const rows = [
    { key: 'first_name', label: 'First Name', value: values?.first_name },
    { key: 'last_name', label: 'Last Name', value: values?.last_name },
    { key: 'other_names', label: 'Other Names', value: values?.other_names },
    { key: 'date_of_birth', label: 'Date of Birth', value: values?.date_of_birth },
    { key: 'gender', label: 'Gender', value: values?.gender?.value },
    { key: 'marital_status', label: 'Marital Status', value: values?.marital_status?.value },
    { key: 'nationality', label: 'Nationality', value: values?.nationality },
    { key: 'religion', label: 'Religion', value: values?.religion },
    { key: 'email', label: 'Email', value: values?.email },
    { key: 'phone_number', label: 'Phone Number', value: values?.phone_number },
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
    { key: 'role', label: 'Role', value: values?.role?.label },
    { key: 'department', label: 'Department', value: values?.department?.label },
    { key: 'job_title', label: 'Job Title', value: values?.job_title },
    { key: 'employment_type', label: 'Employment Type', value: values?.employment_type?.value },
    { key: 'date_hired', label: 'Date Hired', value: values?.date_hired },
  ];

  return (
    <div className="">
      <div className="bg-white p-6">
        {rows?.map((item: { key: string; label: string; value: string }) => (
          <div key={item.key} className="text-xs flex justify-between items-center border-b py-3">
            <p className="text-gray-600 font-medium">{item.label}</p>
            <p className="text-gray-900 font-semibold">{item.value || '—'}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-6">
        <Button
          type="button"
          value="Back"
          onClick={handleBackStep}
          className="w-[100px] text-sm bg-gray-300 py-2 text-black rounded-lg hover:bg-gray-400"
        />
        <Button
          type="button"
          value="Submit"
          onClick={pathname.includes('edit-staff') ? updateForm : insertForm}
          className="text-sm bg-blue-500 w-[100px] py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
