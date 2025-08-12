'use client';
import React, { useEffect, useState } from 'react';
import AddDiagnosisTable from '@/src/components/organisms/add-diagnosis/add-diagnosis-table';
import Header from '@/src/components/organisms/patient/header';
import { Search, Loader, XIcon } from 'lucide-react';
import { useDebounce } from '@/src/hooks/debounce/use-debounce';
import { useQueryDiagnosis } from '@/src/hooks/diagnosis/use-query-diagnosis';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import SummaryCards from '../../molecules/dashboard-molecules/summary-cards';
import Input from '../../atoms/Input/input-field';
import { useForm } from 'react-hook-form';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import Pagination from '../../organisms/pagination/pagination';
import { useDiagnosisCount } from '@/src/hooks/RPC/get-diagnosis-count';

export default function AddDiagnoseTemplate() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { control, watch, setValue } = useForm({
    defaultValues: {
      search: '',
      status: { label: 'Awaiting Examination', value: 'awaiting_examination' },
    },
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
    queryDiagnosis,
    data: queryData,
    loading,
    clearData,
    count,
  } = useQueryDiagnosis({
    select: '*',
    name: debouncedName,
    status: status.value ?? 'awaiting_examination',
    from: from,
    to: to,
  });

  const { getDiagnosisCount, data: diagnosisData } = useDiagnosisCount();

  useEffect(() => {
    if (count) {
      setTotalPages(Math.ceil(count / 10));
      setTotalPages(Math.ceil((count || 0) / pageSize));
    }
  }, [count]);

  useEffect(() => {
    queryDiagnosis();
    getDiagnosisCount();
  }, [debouncedName, status, from]);

  const resetField = () => {
    setValue('search', '');
    clearData();
  };

  const options = [
    { label: 'Awaiting Examination', value: 'awaiting_examination' },
    { label: 'Under Evaluation', value: 'under_evaluation' },
    { label: 'Treatment Administered', value: 'treatment_administered' },
    { label: 'Evaluation Completed', value: 'evaluation_completed' },
  ];

  console.log(diagnosisData);

  return (
    <div className=" bg-white min-h-screen p-5">
      <Header title=" Diagnose patient" subTitle="Select patient to add diagnosis" />
      <div className="flex justify-start gap-4 items-start mt-4 w-full border-gray-200">
        <SummaryCards
          title="Awaiting Examination"
          count={`${diagnosisData?.[0].awaiting_examination_count ?? 0}`}
          variant="pending"
        />
        <SummaryCards
          title="Under Evaluation"
          count={`${diagnosisData?.[0].under_evaluation_count ?? 0}`}
          variant="inprogress"
        />
        <SummaryCards
          title="Evaluation Completed"
          count={`${diagnosisData?.[0].evaluation_completed_count ?? 0}`}
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
      <div className="overflow-x-auto mt-4">
        {!loading &&
          (queryData?.length > 0 ? (
            <>
              <AddDiagnosisTable patients={queryData} />
              <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </>
          ) : (
            <EmptyState title="No task found" message="No task found for this patient" />
          ))}
      </div>
    </div>
  );
}
