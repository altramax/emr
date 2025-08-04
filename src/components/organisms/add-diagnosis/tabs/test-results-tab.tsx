import { useGetLabResults } from '@/src/hooks/lab-test-result/use-get-lab-result';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import { useState, useEffect } from 'react';
// import ResultsDropdown from '@/src/components/molecules/results-dropdown/results_dropdown';
import dayjs from 'dayjs';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';

type LabResultsDisplayProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  visitId: any;
  patientId: any;
};

export default function TestResults({ visitId, patientId }: LabResultsDisplayProps) {
  const [test, setTest] = useState([]);
  const { getLabResult, data, loading } = useGetLabResults({
    select: '*',
    patient_id: patientId,
    visit_id: visitId,
  });

  const {
    getTask,
    data: orderData,
    loading: isLoading,
  } = useGetTasks({
    task_name: 'lab_order',
    visit_id: visitId,
    // status: 'pending',
  });

  useEffect(() => {
    const tests = orderData?.flatMap((data: any) =>
      data?.task_data.map((item: any) => {
        return { name: item?.name, bill: item?.bill, createdAt: data?.created_at };
      })
    );
    setTest(tests);
    console.log(tests);
  }, [orderData]);

  useEffect(() => {
    getLabResult();
    getTask();
  }, []);

  const status = data?.map((result: any) => [result?.test_name, result?.status]);

  if (loading || isLoading) {
    return <Loading />;
  }
  console.log(orderData);

  return (
    <table className="w-full border-collapse mt-5">
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
              className="border-b text-xs cursor-pointer text-black"
              // onClick={() => navigateToPatientDetails(patient?.patient?.id)}
            >
              <td className="p-4">{result?.name}</td>
              {/* {/* <td className="p-4">{CalculateAge(patient?.patient?.date_of_birth)}</td> */}
              <td className="p-4">{dayjs(result?.createdAt).format('h:mm A · DD-MMM-YYYY')}</td>
              <td className={`p-4 ${result?.bill === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                {result?.bill.charAt(0).toUpperCase() + result?.bill.slice(1)}
              </td>
              <td className="p-4">
                <div className="flex item-center justify-center">
                  <StatusBar
                    status={
                      status?.find((item: any) => item[0] === result?.name)?.[1]?.toLowerCase() ??
                      'pending'
                    }
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  // return (
  //   <div className="space-y-4">
  //     {data &&
  //       data?.map((item: any, index: number) => {
  //         return (
  //           <div key={index + 1}>
  //             <ResultsDropdown data={item} />
  //           </div>
  //         );
  //       })}
  //   </div>
  // );
}
