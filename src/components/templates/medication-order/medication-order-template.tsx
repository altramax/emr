'use client';
import React, { useEffect } from 'react';
import MedicationOrderTable from '@/src/components/organisms/medication-order/medication-order-table';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import { useQueryData } from '@/src/hooks/use-query-data';

export default function MedOrderTemplate() {
  const { control, watch, setValue } = useForm({
    defaultValues: { search: '', status: { label: 'Pending', value: 'pending' } },
    mode: 'onChange',
  });

  const status = watch('status');
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const searchValue: any = watch('search');
  const debouncedName = useDebounce(searchValue, 500);

  const {
    queryData: queryTask,
    data: queryData,
    loading,
    clearData,
    // count,
  } = useQueryData({
    table: 'tasks',
    params: [
      {
        column: 'task_name',
        value: 'lab_order',
      },
      {
        column: 'status',
        value: status.value ?? '',
      },
    ],
    name: debouncedName,
    // from: from,
    // to: to,
  });

  useEffect(() => {
    queryTask();
  }, [debouncedName, status]);

  const resetField = () => {
    setValue('search', '');
    clearData();
  };

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className=" bg-white min-h-screen">
      <Header title="Medication orders" subTitle="Select patient to view medication order" />
      <div className=" flex justify-start items-center gap-4 mt-6 w-full border-gray-200 pb-4">
        <div className=" w-[40%] relative gap-8">
          <Input
            type="text"
            name="search"
            placeholder="Search for patient by name or id"
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
        <div className="w-[200px]">
          <SelectDropdown name="status" options={options} control={control} />
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        {!loading &&
          (queryData?.length > 0 ? (
            <MedicationOrderTable patients={queryData} />
          ) : (
            <EmptyState title="No task found" message="No task found for lab order" />
          ))}
      </div>
    </div>
  );
}
