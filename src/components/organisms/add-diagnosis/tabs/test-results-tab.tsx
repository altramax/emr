import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import { useState, useEffect } from 'react';
// import ResultsDropdown from '@/src/components/molecules/results-dropdown/results_dropdown';
import dayjs from 'dayjs';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';
import TestResultViewModal from '@/src/components/molecules/test-result-view-modal/test-result-view-modal';
import { Eye, EyeClosed } from 'lucide-react';
import TestResultPendingModal from '@/src/components/molecules/test-result-view-modal/test-result-pending-modal';
import { useGetData } from '@/src/hooks/use-get-data';
import EmptyState from '@/src/components/molecules/empty-state/empty-state';
import { useQueryDataWithId } from '@/src/hooks/use-query-data-with-id';

type LabResultsDisplayProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  visitId: any;
};

export default function TestResults({ visitId }: LabResultsDisplayProps) {
  const [test, setTest] = useState([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [isPendingResultModalOpen, setIsPendingResultModalOpen] = useState<boolean>(false);

  const { queryDataWithId: getLabResult, data, loading: labResultLoading } = useQueryDataWithId();

  const {
    getData,
    data: orderData,
    loading: isLoading,
  } = useGetData({
    table: 'tasks',
    params: [
      {
        column: 'task_name',
        value: 'lab_order',
      },
      {
        column: 'visit_id',
        value: visitId,
      },
    ],
  });

  useEffect(() => {
    const tests = orderData?.flatMap((data: any) =>
      data?.task_data.map((item: any) => {
        return {
          name: item?.name,
          bill: item?.bill,
          createdAt: data?.created_at,
          result_id: item?.result_id,
          status: data?.task_result,
        };
      })
    );
    setTest(tests);
    console.log(tests);
  }, [orderData]);

  useEffect(() => {
    getData();
  }, []);

  const handleResultModal = () => {
    setIsResultModalOpen(!isResultModalOpen);
  };

  const renderResultModal = () => {
    if (isResultModalOpen) {
      return (
        <TestResultViewModal
          isOpen={isResultModalOpen}
          onCancel={handleResultModal}
          dataLoading={labResultLoading}
          formdata={data?.[0]}
        />
      );
    }
  };

  const handleTestResultPendingModal = () => {
    setIsPendingResultModalOpen(!isPendingResultModalOpen);
  };

  const renderResultPendingModal = () => {
    if (isPendingResultModalOpen) {
      return (
        <TestResultPendingModal
          isOpen={isPendingResultModalOpen}
          onCancel={handleTestResultPendingModal}
        />
      );
    }
  };

  const handleSelectedItem = async (id: string, status: string) => {
    if (status?.toLocaleLowerCase() === 'completed') {
      await getLabResult({
        table: 'lab_test_results',
        params: [
          {
            column: 'id',
            value: id,
          },
        ],
        select: '*',
      });
      handleResultModal();
    } else {
      handleTestResultPendingModal();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-[50vh] overflow-auto ">
      {renderResultModal()}
      {renderResultPendingModal()}
      {test?.length > 0 ? (
        <table className="w-full border-collapse mt-5 ">
          <thead>
            <tr className="bg-gray-100 text-left text-xs text-gray-500">
              <th className="px-4 py-1">Test</th>
              <th className="px-4 py-1">Date ordered</th>
              <th className="px-4 py-1">Bill </th>
              <th className="px-4 py-1 text-center">Status</th>
              <th className="px-4 py-1 "></th>
            </tr>
          </thead>
          <tbody>
            {test?.map((result: any, index: number) => {
              return (
                <tr
                  key={result?.name + index}
                  className={`border-b text-xs cursor-pointer text-black`}
                  onClick={() => {
                    handleSelectedItem(result?.result_id, result?.status?.[result?.name]);
                  }}
                >
                  <td className="p-4">{result?.name}</td>
                  {/* {/* <td className="p-4">{CalculateAge(patient?.patient?.date_of_birth)}</td> */}
                  <td className="p-4">{dayjs(result?.createdAt).format('h:mm A · DD-MMM-YYYY')}</td>
                  <td
                    className={`p-4 ${result?.bill === 'paid' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {result?.bill.charAt(0).toUpperCase() + result?.bill.slice(1)}
                  </td>
                  <td className="p-4">
                    <div className="flex item-center justify-center">
                      <StatusBar
                        status={result?.status?.[result?.name]?.toLowerCase() ?? 'pending'}
                      />
                    </div>
                  </td>
                  <td className={`p-4`}>
                    {result?.status?.[result?.name]?.toLowerCase() === 'completed' ? (
                      <Eye size={18} className="text-green-500" />
                    ) : (
                      <EyeClosed size={18} className="text-yellow-500" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <EmptyState
          title="No test results found"
          message="No test results found for this patient"
        />
      )}
    </div>
  );
}
