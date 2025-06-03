import { useRouter } from 'next/navigation';
import PatientCard from '../patients/patient-card';
import EmptyState from '../../molecules/empty-state/empty-state';

type recordTableProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patients: any;
};

export default function RecordTable({ patients }: recordTableProps) {
  const router = useRouter();

  const navigateToPatientDetails = (id: string) => {
    router.push(`records/${id}`);
  };

  return (
    <div className="">
      {patients &&
        (patients?.length > 0 ? (
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          patients.map((patient: any) => (
            <div key={patient?.id}>
              <PatientCard
                {...patient}
                onChange={() => {
                  navigateToPatientDetails(patient?.id);
                }}
                key={patient?.id}
              />
            </div>
          ))
        ) : (
          <EmptyState title="No Patient found" message="No record found for this patient" />
        ))}
    </div>
  );
}
