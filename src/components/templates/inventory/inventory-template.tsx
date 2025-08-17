'use client';
import React, { useEffect, useState } from 'react';
import InventoryTable from '@/src/components/organisms/admin/inventory-table';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import { useQueryInventory } from '@/src/hooks/inventory/use-query-inventory';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import { useGetDepartments } from '@/src/hooks/departments/use-get-departments';
import Button from '@/src/components/atoms/button/button';
import { useRouter } from 'next/navigation';
import Loading from '../../atoms/loading-bar/loading-bar-page';

export default function InventoryTemplate() {
  const { control, watch, setValue } = useForm({
    mode: 'onChange',
  });
  const [departmentOptions, setDepartmentOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const router = useRouter();

  const department_id = watch('department_id');
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const searchValue: any = watch('search');
  const debouncedName = useDebounce(searchValue, 500);

  const { getDepartments, data } = useGetDepartments({ select: '*' });

  const {
    queryInventory,
    data: queryData,
    loading,
    clearData,
  } = useQueryInventory({
    name: debouncedName,
    department_id: department_id?.value ?? '',
  });

  useEffect(() => {
    queryInventory();
  }, [debouncedName, department_id]);

  const resetField = () => {
    setValue('search', '');
    clearData();
  };

  useEffect(() => {
    if (!data) {
      getDepartments();
    }
    if (data) {
      handleOptions();
    }
  }, [data]);

  const handleOptions = () => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const options = data
      ? data?.map((items: any) => {
          return {
            label: items?.name,
            value: items?.id,
            isDeactivated: items?.status !== 'active',
          };
        })
      : [];

    setDepartmentOptions(options);
  };

  return (
    <div className="p-5 bg-white min-h-screen">
      <Header title="Inventory" subTitle="Search for inventory here" />
      <div className=" flex justify-start items-center gap-4 mt-6 w-full border-gray-200 pb-4">
        <div className=" w-[40%] relative gap-8">
          <Input
            type="text"
            name="search"
            placeholder="Search for item by name"
            className="w-full px-4 py-2 border rounded-lg text-xs"
            control={control}
            onChange={(e) => {
              if (e.target.value.length < 1) {
                resetField();
                clearData();
              }
            }}
          />
          {searchValue && (
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
        <div className="w-[200px] ">
          <SelectDropdown
            placeholder="Select department"
            name="department_id"
            options={departmentOptions}
            control={control}
          />
        </div>
        <div className="self-end ml-auto">
          <Button
            type="button"
            value="Add Inventory"
            onClick={() => router.push('/admin/inventory/add-inventory')}
            className=" text-sm bg-blue-500 py-2 px-3 text-white rounded-lg hover:bg-blue-600 transition"
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        {!loading &&
          (queryData?.length > 0 ? (
            <InventoryTable items={queryData} department={departmentOptions} />
          ) : (
            <EmptyState title="No item found" message="No item found for this department" />
          ))}
        {loading && <Loading />}
      </div>
    </div>
  );
}
