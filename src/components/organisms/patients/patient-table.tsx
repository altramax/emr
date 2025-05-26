import CalculateAge from '../../atoms/calculate-age/calculate-age';
import Avatar from '../../atoms/Avatar/Avatar';
import dayjs from 'dayjs';

interface PatientTableProps {
  patients: Record<string, string>[];
}

export default function PatientTable({ patients }: PatientTableProps) {
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'admitted':
        return 'bg-blue-100 text-blue-600';
      case 'discharged':
        return 'bg-green-100 text-green-600';
      case 'outpatient':
        return 'bg-yellow-100 text-yellow-600';
      case 'emergency':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-sm text-gray-600">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Registered</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {patients
          ? patients?.map((patient: Record<string, string>) => (
              <tr key={patient?.id} className="border-b text-sm">
                <td className="p-4 flex items-center gap-4 text-base">
                  {patients && (
                    <Avatar firstname={patient?.first_name} lastname={patient?.last_name} />
                  )}
                  {`${patient?.first_name.charAt(0).toUpperCase() + patient?.first_name.slice(1)} ${patient?.last_name.charAt(0).toUpperCase() + patient?.last_name.slice(1)}`}
                </td>
                <td className="p-4">{CalculateAge(patient?.date_of_birth)}</td>
                <td className="p-4">{dayjs(patient?.created_at).format('HH:mm a, MMM D, YYYY')}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${getStatusColorClass(patient.status)}`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-4  text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="4" r="2" />
                    <circle cx="10" cy="10" r="2" />
                    <circle cx="10" cy="16" r="2" />
                  </svg>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}
