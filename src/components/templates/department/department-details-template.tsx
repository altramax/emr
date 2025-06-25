'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LoadingBar from '@/src/components/atoms/loading-bar/loading-bar-page';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';
import { useQueryDepartment } from '@/src/hooks/departments/use-query-department';
import { useGetStaff } from '@/src/hooks/staff/use-get-staff';
import StaffCard from '../../organisms/admin/staff-card';
import Button from '../../atoms/button/button';
import DepartmentActionMenu from '../../molecules/action-menu/department-action-menu';
import EditDepartmentModal from '../../organisms/admin/Edit-department';
import { useUpdateDepartment } from '@/src/hooks/departments/use-update-department';

const DepartmentDetailsPage = () => {
  const router = useRouter();
  const param = useParams();
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const id: any = param?.detailsId ?? '';
  const [isActionMenuopen, setIsActionMenuopen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [manualRefetch, setManualRefetch] = useState(false);
  const { queryDepartment, data, loading } = useQueryDepartment({
    id: id,
  });

  const {
    getStaff,
    data: staffData,
    loading: staffLoading,
  } = useGetStaff({
    department_id: id,
  });

  const deptInfo = data ? data[0] : '';

  const { updateDepartment, data: updateData } = useUpdateDepartment({
    columns: { status: deptInfo?.status === 'active' ? 'deactivated' : 'active' },
    dept_id: id,
  });

  useEffect(() => {
    queryDepartment();
    getStaff();
  }, [manualRefetch]);

  const handleActionMenu = () => {
    setIsActionMenuopen(!isActionMenuopen);
  };

  const handleEditmodal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setIsActionMenuopen(false);
  };

  const handleManualRefetch = () => {
    setManualRefetch(!manualRefetch);
    setIsActionMenuopen(false);
  };

  const renderEditModal = () => {
    if (isEditModalOpen)
      return (
        <EditDepartmentModal
          data={deptInfo}
          onclose={handleEditmodal}
          refetch={handleManualRefetch}
        />
      );
  };

  const handleStatusChange = async () => {
    try {
      await updateDepartment();
      if (updateData === 'success') {
        handleManualRefetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || staffLoading) return <LoadingBar />;

  return (
    <>
      {renderEditModal()}
      <div className=" m-auto p-5 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <button
            onClick={() => router.push('/admin/departments')}
            className="flex items-center text-blue-600 hover:text-blue-700 gap-2 text-sm"
          >
            <ArrowLeft size={18} /> Back to departments
          </button>
        </div>

        <div className="flex items-center justify-between  gap-16">
          <div className="flex items-end gap-20">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{deptInfo?.name}</h2>
              <p className="text-xs text-gray-500">{deptInfo?.description}</p>
            </div>
            <StatusBar status={deptInfo?.status ?? 'unavailable'} />
          </div>
          <div className="relative">
            <Button
              className="flex items-center gap-2 text-xs px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
              onClick={handleActionMenu}
              value="options"
            />
            <DepartmentActionMenu
              onEdit={handleEditmodal}
              onDeactivate={handleStatusChange}
              onActivate={handleStatusChange}
              open={isActionMenuopen}
              isActive={deptInfo?.status === 'active'}
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Staffs assigned to this department
          </h3>
          <div>
            {staffData && staffData.length > 0 ? (
              staffData.map((staff: Record<string, string>, index: number) => (
                <div key={index + 1}>
                  <StaffCard {...staff} />
                </div>
              ))
            ) : (
              <p className="text-xs text-red-500">No staffs assigned to this department.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentDetailsPage;
