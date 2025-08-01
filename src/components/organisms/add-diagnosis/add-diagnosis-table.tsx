import CalculateAge from '@/src/components/atoms/calculate-age/calculate-age';
import Avatar from '@/src/components/atoms/Avatar/Avatar';
import { useRouter } from 'next/navigation';

interface PatientCareTableProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patients: Record<string, any>[];
}

export default function AddDiagnosisTable({ patients }: PatientCareTableProps) {
  const router = useRouter();

  const navigateToPatientDetails = (id: string) => {
    router.push(`/add-diagnosis/${id}`);
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="bg-green-100 text-green-600 rounded-full  px-2 py-1 text-xs w-fit font-base">
            completed
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-100 text-yellow-600 rounded-full text-center px-2 py-1 text-xs w-fit font-base">
            Pending
          </div>
        );
      case 'cancelled':
        return (
          <div className="bg-red-100 text-red-600 rounded-full text-center px-2 py-1 text-xs w-fit font-base">
            Cancelled
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-black rounded-full text-center px-2 py-1 text-xs w-fit font-base">
            unavailable
          </div>
        );
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-xs text-gray-600">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Patient id</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Gender</th>
          <th className="px-4 py-2 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {patients?.map((patient: any) => (
          <tr
            key={patient?.patient?.id}
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
            <td className="p-4">
              {patient?.patient?.gender.charAt(0).toUpperCase() + patient?.patient?.gender.slice(1)}
            </td>
            <td className="p-4">{renderStatus(patient?.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
