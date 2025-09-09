'use client';
import React, { useEffect, useState } from 'react';
import LabOrderTable from '@/src/components/organisms/lab-order/lab-order-table';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import Pagination from '../../organisms/pagination/pagination';
import SummaryCards from '../../molecules/summary-card/summary-cards';
import { useGetSummary } from '@/src/hooks/RPC/get-table-summary';
import { useQueryData } from '@/src/hooks/use-query-data';

export default function LabOrderTemplate() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { control, watch, setValue } = useForm({
    defaultValues: { search: '', status: { label: 'Pending', value: 'pending' } },
    mode: 'onChange',
  });

  const status = watch('status');
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const searchValue: any = watch('search');
  const debouncedName = useDebounce(searchValue, 500);

  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { getSummary, data: labSummary } = useGetSummary({
    tableName: 'get_lab_order_count',
  });

  const {
    queryData: queryTask,
    data: queryData,
    loading,
    clearData,
    count,
  } = useQueryData({
    table: 'tasks',
    params: [
      {
        column: 'task_name',
        value: 'lab_order',
      },
      {
        column: 'status',
        value: status.value ?? 'all',
      },
    ],
    nameSearch: debouncedName,
    from: from,
    to: to,
  });

  useEffect(() => {
    queryTask();
    getSummary();
  }, [debouncedName, status, from]);

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 10));
      setTotalPages(Math.ceil((count || 0) / pageSize));
    }
  }, [count]);

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
    <div className="p-5 bg-white min-h-screen">
      <Header title="Lab orders" subTitle="Select patient to begin test" />
      <div className="flex justify-start gap-4 items-start mt-4 w-full border-gray-200">
        <SummaryCards
          title="Pending Test"
          count={`${labSummary?.pending ?? 0}`}
          variant="pending"
        />
        <SummaryCards
          title="Test In Progress"
          count={`${labSummary?.in_progress ?? 0}`}
          variant="inprogress"
        />
        <SummaryCards
          title="Completed Test"
          count={`${labSummary?.completed ?? 0}`}
          variant="success"
        />
      </div>
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
      <div className="overflow-x-auto mt-2">
        {!loading &&
          (queryData?.length > 0 ? (
            <>
              <LabOrderTable patients={queryData} />
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
                count={count}
              />
            </>
          ) : (
            <EmptyState title="No task found" message="No task found for lab order" />
          ))}
      </div>
    </div>
  );
}
