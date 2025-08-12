'use client';
import React, { useEffect, useState } from 'react';
import AddVitalsTable from '@/src/components/organisms/add-vitals/add-vitals-table';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import { useQueryTask } from '@/src/hooks/task/use-query-task';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import SummaryCards from '../../molecules/dashboard-molecules/summary-cards';
import { useVitalsCount } from '@/src/hooks/RPC/get-vitals-count';
import Input from '../../atoms/Input/input-field';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Pagination from '../../organisms/pagination/pagination';

export default function AddVitalsTemplate() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { control, watch, setValue } = useForm({
    defaultValues: { search: '', status: { label: 'Pending', value: 'pending' } },
    mode: 'onChange',
  });

  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const status = watch('status');
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const searchValue: any = watch('search');
  const debouncedName = useDebounce(searchValue, 500);

  const {
    queryTask,
    data: queryData,
    count,
    loading,
    clearData,
  } = useQueryTask({
    name: debouncedName,
    task_name: 'vitals',
    status: status ? status?.value : '',
    from: from,
    to: to,
  });

  const { getVitalsCount, data: vitalsData } = useVitalsCount();

  useEffect(() => {
    queryTask();
    getVitalsCount();
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
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className=" bg-white min-h-screen p-5">
      <Header title="Add Vitals" subTitle="Select patient to add vitals" />

      <div className="flex justify-start gap-4 items-start mt-4 w-full border-gray-200">
        <SummaryCards
          title="Pending vitals"
          count={vitalsData?.[0].pending_count}
          variant="pending"
        />
        <SummaryCards
          title="Completed vitals"
          count={vitalsData?.[0].completed_count}
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
              <AddVitalsTable patients={queryData} />
              <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </>
          ) : (
            <EmptyState title="No task found" message="No task found for this patient" />
          ))}
      </div>
    </div>
  );
}
