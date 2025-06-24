import { useRouter } from 'next/navigation';
import StaffCard from './staff-card';
import EmptyState from '../../molecules/empty-state/empty-state';

type StaffTableProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patients: any;
};

export default function StaffTable({ patients }: StaffTableProps) {
  const router = useRouter();

  const navigateToPatientDetails = (id: string) => {
    router.push(`/admin/staff/${id}`);
  };

  return (
    <div className="">
      {patients &&
        (patients?.length > 0 ? (
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          patients.map((patient: any) => (
            <div key={patient?.id}>
              <StaffCard
                {...patient}
                onChange={() => {
                  navigateToPatientDetails(patient?.id);
                }}
              />
            </div>
          ))
        ) : (
          <EmptyState title="No Patient found" message="No record found for this patient" />
        ))}
    </div>
  );
}
