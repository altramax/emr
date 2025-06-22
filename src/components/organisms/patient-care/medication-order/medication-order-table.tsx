import CalculateAge from '@/src/components/atoms/calculate-age/calculate-age';
import Avatar from '@/src/components/atoms/Avatar/Avatar';
import { useRouter } from 'next/navigation';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';
import PriorityBar from '@/src/components/molecules/priority-bar/priority-bar';

interface PatientCareTableProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  patients: Record<string, any>[];
}

export default function MedicationOrderTable({ patients }: PatientCareTableProps) {
  const router = useRouter();

  const navigateToPatientDetails = (id: string) => {
    router.push(`/patients/lab-order/${id}`);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-xs text-gray-600">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Patient id</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Gender</th>
          <th className="px-4 py-2 text-center">Priority</th>
          <th className="px-4 py-2 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {patients?.map((patient: any, index) => (
          <tr
            key={index + 1}
            className="border-b text-xs cursor-pointer"
            onClick={() => navigateToPatientDetails(patient?.id)}
          >
            <td className="p-4 flex items-center gap-4">
              {patients && (
                <Avatar
                  firstname={patient?.patient?.first_name}
                  lastname={patient?.patient?.last_name}
                  size={2}
                />
              )}
              {`${patient?.patient?.first_name.charAt(0).toUpperCase() + patient?.patient?.first_name.slice(1)} ${patient?.patient?.last_name.charAt(0).toUpperCase() + patient?.patient?.last_name.slice(1)}`}
            </td>
            <td className="p-4">{patient?.patient?.id}</td>
            <td className="p-4">{CalculateAge(patient?.patient?.date_of_birth)}</td>
            <td className="p-4">
              {patient?.patient?.gender.charAt(0).toUpperCase() + patient?.patient?.gender.slice(1)}
            </td>
            <td className="p-4 ">
              <div className="flex justify-center">
                {<PriorityBar priority={patient?.priority ?? 'N/A'} />}
              </div>
            </td>
            <td className="p-4 ">
              <div className="flex justify-center">
                {<StatusBar status={patient?.status ?? 'N/A'} />}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
