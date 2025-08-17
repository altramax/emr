'use client';

'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import { useQueryDepartment } from '@/src/hooks/departments/use-query-department';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import Button from '@/src/components/atoms/button/button';
import DepartmentTable from '../../organisms/admin/department-table';
import AddDepartmentModal from '../../organisms/admin/add-department';

export default function DepartmentTemplate() {
  const [name, setName] = useState('');
  const debouncedName = useDebounce(name, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    queryDepartment,
    data: queryData,
    loading,
    clearData,
    refetch,
  } = useQueryDepartment({
    name: debouncedName,
  });

  useEffect(() => {
    queryDepartment();
  }, [debouncedName]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const inputHandler = (e: any) => {
    setName(e.target.value);
    if (e.target.value.length < 1) {
      resetField();
    }
  };

  const resetField = () => {
    setName('');
    clearData();
  };

  const openAddDepartmentModal = () => {
    setIsModalOpen(true);
  };

  const closeAddDepartmentModal = () => {
    setIsModalOpen(false);
  };

  const renderAddDepartmentModal = () => {
    if (isModalOpen) {
      return <AddDepartmentModal onclose={closeAddDepartmentModal} refetch={refetch} />;
    }
  };

  return (
    <>
      {renderAddDepartmentModal()}
      <div className="p-5 bg-white min-h-screen">
        <Header title="Departments" subTitle="View Departments below" />
        <div className="flex justify-between items-start mt-6 w-full border-gray-200 pb-4">
          <div className="flex  justify-between mb-4 gap-8 w-full items-center relative">
            <div className="flex items-center justify-between gap-8 w-[50%] relative">
              <input
                type="text"
                placeholder="Search for patient by name or id"
                className="w-full px-4 py-2 border rounded-lg text-sm"
                onChange={(e) => inputHandler(e)}
                value={name}
              />
              {name && (
                <XIcon
                  size={18}
                  className="cursor-pointer absolute right-12 top-1/2 transform -translate-y-1/2 border rounded-full p-1 w-6 h-6 border-red-600 text-red-600"
                  onClick={resetField}
                />
              )}
              {loading ? (
                <Loader
                  size={18}
                  className=" text-gray-950 absolute right-4 top-1/2 transform -translate-y-1/2"
                />
              ) : (
                <Search
                  size={18}
                  className="text-gray-950 absolute right-4 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
            <Button
              className="flex items-center gap-2 text-xs px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
              onClick={openAddDepartmentModal}
              value="Add Department"
            />
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          {!loading &&
            (queryData?.length > 0 ? (
              <DepartmentTable departments={queryData} />
            ) : (
              <EmptyState title="No task found" message="No task found for this patient" />
            ))}
        </div>
      </div>
    </>
  );
}
