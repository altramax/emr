'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User2 } from 'lucide-react';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import LoadingBar from '../../atoms/loading-bar/loading-bar-page';
import StaffInfoRow from '../../molecules/staff-info-row/staff-info-row';
import { useQueryStaff } from '@/src/hooks/staff/use-query-staff';
import { useUpdateStaff } from '@/src/hooks/staff/use-update-staff';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import { useForm, useWatch } from 'react-hook-form';
import StatusBar from '../../molecules/status-bar/status-bar';

type StaffStatusForm = {
  status: { label: string; value: string };
};

const StaffDetailsTemplate = () => {
  const router = useRouter();
  const param = useParams();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const id: any = param?.detailsId ?? '';

  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'On Leave', value: 'on_leave' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Resigned', value: 'resigned' },
    { label: 'Terminated', value: 'terminated' },
  ];

  const { queryStaff, data, loading, refetch } = useQueryStaff({
    staff_id: id,
  });

  const staffInfo = data ? data[0] : '';

  const { control } = useForm<StaffStatusForm>({
    defaultValues: { status: { label: '', value: '' } },
  });

  const status = useWatch({ control, name: 'status' });

  const { updateStaff, loading: insertLoading } = useUpdateStaff({
    columns: { status: status.value },
    staff_id: staffInfo?.id,
  });

  const changeStatus = async () => {
    const response = await updateStaff();
    if (response === 'success') {
      refetch();
    }
  };

  useEffect(() => {
    queryStaff();
  }, []);

  useEffect(() => {
    if (status.value && status.value !== staffInfo?.status) {
      changeStatus();
    }
  }, [status.value]);

  if (loading || insertLoading) return <LoadingBar />;

  return (
    <div className="px-10 py-4 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors"
          onClick={() => router.push('/admin/staff')}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-bottom gap-4">
          <div className="w-[200px]">
            <SelectDropdown
              name="status"
              options={statusOptions}
              placeholder="Change staff status"
              control={control}
              defaultValue={
                staffInfo?.status && {
                  label: staffInfo?.status.charAt(0).toUpperCase() + staffInfo?.status.slice(1),
                  value: staffInfo?.status,
                }
              }
              // onchange={(val) => {
              //   val && changeStatus();
              // }}
            />
          </div>
          <Button
            className="flex items-center gap-2 text-xs px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
            loading={loading}
            value="Edit"
            onClick={() => router.push(`/admin/edit-staff/${staffInfo?.id}`)}
          />
        </div>
      </div>
      <div className="border-t border-gray-200" />

      <div className="flex justify-between items-start gap-6 my-6">
        {/* Avatar + Status */}
        <div className="flex flex-col items-center gap-3 w-[15%]">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            <User2 size={38} />
          </div>
          <StatusBar status={staffInfo?.status} />
        </div>

        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col border rounded-lg border-gray-100 px-4 py-2 bg-gray-50 shadow-sm w-full">
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 py-2">
              Personal information
            </h3>
            <StaffInfoRow label="First name" value={staffInfo?.first_name} />
            <StaffInfoRow label="Last name" value={staffInfo?.last_name} />
            <StaffInfoRow label="Other names" value={staffInfo?.other_names ?? '-'} />
            <StaffInfoRow label="Gender" value={staffInfo?.gender} />
            <StaffInfoRow label="Date of Birth" value={staffInfo?.date_of_birth} />
            <StaffInfoRow label="Nationality" value={staffInfo?.nationality} />
            <StaffInfoRow label="Marital status" value={staffInfo?.marital_status} />
          </div>

          <div className="flex flex-col border rounded-lg border-gray-100 px-4 py-2 bg-gray-50 shadow-sm w-full">
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 py-2">
              Contact information
            </h3>
            <StaffInfoRow label="Phone number" value={staffInfo?.phone_number} />
            <StaffInfoRow label="Email" value={staffInfo?.email} />
            <StaffInfoRow label="Address" value={staffInfo?.address} />
            <StaffInfoRow label="Emergency contact" value={staffInfo?.emergency_contact_name} />
            <StaffInfoRow label="Emergency phone" value={staffInfo?.emergency_contact_number} />
            <StaffInfoRow
              label="Emergency contact relationship"
              value={staffInfo?.emergency_contact_relationship}
            />
          </div>

          <div className="flex flex-col border rounded-lg border-gray-100 px-4 py-2 bg-gray-50 shadow-sm w-full">
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 py-2">
              Employment information
            </h3>
            <StaffInfoRow label="Role" value={staffInfo?.role} />
            <StaffInfoRow label="Department" value={staffInfo?.department} />
            <StaffInfoRow label="Job title" value={staffInfo?.job_title} />
            <StaffInfoRow label="Employment type" value={staffInfo?.employment_type} />
            <StaffInfoRow label="Date hired" value={staffInfo?.date_hired} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsTemplate;
