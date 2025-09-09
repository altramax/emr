'use client';
import React, { useEffect, useState } from 'react';
import InventoryTable from '@/src/components/organisms/admin/inventory-table';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import { useQueryData } from '@/src/hooks/use-query-data';
import { useGetData } from '@/src/hooks/use-get-data';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import Button from '@/src/components/atoms/button/button';
import { useRouter } from 'next/navigation';
import Loading from '../../atoms/loading-bar/loading-bar-page';
import Pagination from '@/src/components/organisms/pagination/pagination';

export default function InventoryTemplate() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const { getData: getDepartments, data } = useGetData({
    table: 'departments',
    from: 0,
    to: 50,
  });

  const param = department_id?.value
    ? [{ column: 'department_id', value: department_id?.value }]
    : [];

  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {
    queryData: queryInventory,
    data: queryData,
    loading,
    clearData,
    count,
  } = useQueryData({
    table: 'inventory',
    select: '*',
    params: param,
    singleName: debouncedName,
    from: from,
    to: to,
  });

  useEffect(() => {
    if (param?.length === 0) return;
    queryInventory();
  }, [debouncedName, department_id, from, to]);

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

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 10));
      setTotalPages(Math.ceil((count || 0) / pageSize));
    }
  }, [count]);

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
            <>
              <InventoryTable items={queryData} department={departmentOptions} />
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
                count={count}
              />
            </>
          ) : (
            <EmptyState
              title="Nothing to show"
              message="search or filter by departments to view items"
            />
          ))}
        {loading && <Loading />}
      </div>
    </div>
  );
}
