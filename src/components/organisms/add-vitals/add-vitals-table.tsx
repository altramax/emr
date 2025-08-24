import CalculateAge from '@/src/components/atoms/calculate-age/calculate-age';
import Avatar from '@/src/components/atoms/Avatar/Avatar';
import { useRouter } from 'next/navigation';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';

interface PatientCareTableProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patients: Record<string, any>[];
}

export default function AddVitalsTable({ patients }: PatientCareTableProps) {
  const router = useRouter();

  const navigateToPatientDetails = (id: string) => {
    router.push(`/add-vitals/${id}`);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-xs text-gray-600">
          <th className="px-4 py-1">Name</th>
          <th className="px-4 py-1">Patient id</th>
          <th className="px-4 py-1">Age</th>
          <th className="px-4 py-1">Gender</th>
          <th className="px-4 py-1 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {patients?.map((patient: any, index: number) => (
          <tr
            key={patient?.patient?.id + index}
            className="border-b text-xs cursor-pointer"
            onClick={() => navigateToPatientDetails(patient?.patient?.id)}
          >
            <td className="p-4 flex items-center gap-4">
              {patients && (
                <Avatar
                  firstname={patient?.patient?.first_name}
                  lastname={patient?.patient?.last_name}
                />
              )}
              {`${patient?.patient?.first_name.charAt(0).toUpperCase() + patient?.patient?.first_name.slice(1)} ${patient?.patient?.last_name.charAt(0).toUpperCase() + patient?.patient?.last_name.slice(1)}`}
            </td>

            <td className="p-4">{patient?.patient?.id}</td>
            <td className="p-4">{CalculateAge(patient?.patient?.date_of_birth)}</td>
            <td className="p-4 item">
              {patient?.patient?.gender.charAt(0).toUpperCase() + patient?.patient?.gender.slice(1)}
            </td>
            <td className="p-4">
              <div className="flex item-center justify-center">
                <StatusBar status={patient?.status} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
