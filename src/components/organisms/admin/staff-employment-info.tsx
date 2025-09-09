'use client';

import Input from '../../atoms/Input/input-field';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import Button from '../../atoms/button/button';
import { useFormContext } from 'react-hook-form';
import { useNewStaffStore } from '@/src/store/new-staff-store';
import { useEffect, useState } from 'react';
import SelectDropdownAsync from '../../molecules/select-dropdown-async/select-dropdown-async';
import { useQueryData } from '@/src/hooks/use-query-data';

type staffType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  defaultData?: any;
};

export default function StaffEmploymentInfo({ defaultData }: staffType) {
  const { control, trigger, setValue } = useFormContext();
  const { currentStep, setStep } = useNewStaffStore();
  const [search, setSearch] = useState<string | undefined>('');

  const { queryData: getDepartments, data } = useQueryData({
    table: 'departments',
    singleName: search,
  });

  useEffect(() => {
    if (!data) {
      getDepartments();
    }
    if (defaultData) {
      setValue('role', { label: defaultData?.role, value: defaultData?.role });
      setValue('department', { label: defaultData?.department, value: defaultData?.department_id });
      setValue('job_title', defaultData?.job_title);
      setValue('employment_type', {
        label: defaultData?.employment_type,
        value: defaultData?.employment_type,
      });
      setValue('date_hired', defaultData?.date_hired);
    }
  }, [data, defaultData]);

  useEffect(() => {
    getDepartments();
  }, [search]);

  const roleOptions = [
    { label: 'Doctor', value: 'doctor' },
    { label: 'Nurse', value: 'nurse' },
    { label: 'Lab Technician', value: 'lab_technician' },
    { label: 'Pharmacist', value: 'pharmacist' },
    { label: 'Account', value: 'account' },
    { label: 'Admin', value: 'admin' },
    { label: 'Reception', value: 'reception' },
    { label: 'Radiographer', value: 'radiographer' },
    { label: 'Cleaner', value: 'cleaner' },
    { label: 'Security', value: 'security' },
    { label: 'Other', value: 'other' },
    { label: 'Super Admin', value: 'super_admin' },
  ];

  const employmentTypeOptions = [
    { label: 'Full Time', value: 'full_time' },
    { label: 'Part Time', value: 'part_time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Locum', value: 'locum' },
  ];

  const validateFields = async () => {
    const isValid = await trigger([
      'role',
      'department',
      'job_title',
      'employment_type',
      'date_hired',
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

  console.log(data);

  return (
    <div className="space-y-4">
      {/* Role */}
      <div className="w-full">
        <SelectDropdown
          label="Role"
          asterisk
          name="role"
          placeholder="Select staff role"
          options={roleOptions}
          control={control}
        />
      </div>

      {/* Department */}
      <div className="w-full">
        <SelectDropdownAsync
          isValueId={true}
          data={data}
          searchTerm={setSearch}
          label="Department"
          asterisk
          name="department"
          placeholder="select department"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      {/* Job Title */}
      <div className="w-full">
        <Input
          label="Job Title"
          asterisk
          name="job_title"
          placeholder="Enter job title"
          type="text"
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      {/* Employment Type */}
      <div className="w-full">
        <SelectDropdown
          label="Employment Type"
          asterisk
          name="employment_type"
          placeholder="Select employment type"
          options={employmentTypeOptions}
          control={control}
        />
      </div>

      {/* Date Hired */}
      <div className="w-full">
        <Input
          label="Date Hired"
          asterisk
          name="date_hired"
          placeholder="YYYY-MM-DD"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          control={control}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
        />
      </div>

      {/* Step Navigation */}
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
