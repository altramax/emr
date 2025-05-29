import CalculateAge from '../../atoms/calculate-age/calculate-age';
import Avatar from '../../atoms/Avatar/Avatar';
import { useRouter, usePathname } from 'next/navigation';

interface PatientTableProps {
  patients: Record<string, string>[];
}

export default function PatientTable({ patients }: PatientTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToPatientDetails = (id: string) => {
    router.push(`${pathname}/${id}`);
  };

  console.log(pathname);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-sm text-gray-600">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Gender</th>
        </tr>
      </thead>
      <tbody>
        {patients
          ? patients?.map((patient: Record<string, string>) => (
              <tr
                key={patient?.name}
                className="border-b text-sm cursor-pointer"
                onClick={() => navigateToPatientDetails(patient?.id)}
              >
                <td className="p-4 flex items-center gap-4 text-base">
                  {patients && (
                    <Avatar firstname={patient?.first_name} lastname={patient?.last_name} />
                  )}
                  {`${patient?.first_name.charAt(0).toUpperCase() + patient?.first_name.slice(1)} ${patient?.last_name.charAt(0).toUpperCase() + patient?.last_name.slice(1)}`}
                </td>
                <td className="p-4">{CalculateAge(patient?.date_of_birth)}</td>
                <td className="p-4">
                  {patient?.gender.charAt(0).toUpperCase() + patient?.gender.slice(1)}
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}
