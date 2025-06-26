import { useGetLabResults } from '@/src/hooks/lab-test-result/use-get-lab-result';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import { useEffect } from 'react';
import ResultsDropdown from '@/src/components/molecules/results-dropdown/results_dropdown';

type LabResultsDisplayProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  results: any;
};

export default function Results({ results }: LabResultsDisplayProps) {
  const { getLabResult, data, loading } = useGetLabResults({
    select: '*',
    patient_id: results?.patient_id,
    visit_id: results?.visit_id,
  });

  useEffect(() => {
    getLabResult();
  }, []);

  if (loading) return <Loading />;

  console.log(data);

  return (
    <div className="space-y-4">
      {data &&
        data?.map((item: any, index: number) => {
          return (
            <div key={index + 1}>
              <ResultsDropdown data={item} />
            </div>
          );
        })}
    </div>
  );
}
