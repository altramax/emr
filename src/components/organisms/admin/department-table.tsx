import Avatar from '@/src/components/atoms/Avatar/Avatar';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';

interface PatientCareTableProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  departments: Record<string, any>[];
}

export default function DepartmentTable({ departments }: PatientCareTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-xs text-gray-600 w-full">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {departments?.map((dept: any, index: number) => (
          <tr
            key={index + 1}
            className="border-b text-xs cursor-pointer"
            // onClick={() => navigateTodeptDetails(dept?.dept?.id)}
          >
            <td className="p-4 flex items-center gap-4">
              {departments && <Avatar firstname={dept?.name} size={2} />}
              {`${dept?.name.charAt(0).toUpperCase() + dept?.name.slice(1)}`}
            </td>

            <td className="p-4 truncate">{dept?.description}</td>
            <td className="p-4">
              <div className="flex item-center justify-center">
                <StatusBar status={dept?.status} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
