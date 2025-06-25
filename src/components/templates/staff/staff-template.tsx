'use client';
import React, { useEffect, useState } from 'react';
import StaffTable from '../../organisms/admin/staff-table';
import Header from '@/src/components/organisms/patients/header';
import { useQueryStaff } from '@/src/hooks/staff/use-query-staff';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';

export default function StaffTemplate() {
  const [name, setName] = useState('');
  const debouncedName = useDebounce(name, 500);
  const { queryStaff, data, loading, clearData } = useQueryStaff({
    select: 'first_name,last_name,department,id,gender,date_of_birth,status',
    name: debouncedName,
  });

  useEffect(() => {
    if (debouncedName) {
      queryStaff();
    }
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

  return (
    <div className="p-8 bg-white min-h-screen">
      <Header title="Staffs" subTitle="Search for staffs here" />
      <div className="flex justify-between items-start mt-8 w-full ">
        <div className="flex items-center justify-between mb-2 gap-8 w-[50%] relative">
          <input
            type="text"
            placeholder="Search for staff here by name"
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
      </div>
      <div className=" w-[800px] border-b border-gray-200 pb-4"></div>
      <div className="overflow-x-auto mt-6">
        <StaffTable patients={data} />
      </div>
    </div>
  );
}
