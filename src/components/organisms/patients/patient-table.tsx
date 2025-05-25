export default function PatientTable() {
  const patients = [
    {
      id: 'P-1245',
      initials: 'ET',
      name: 'Emma Thompson',
      age: 45,
      status: 'Admitted',
      department: 'Cardiology',
      doctor: 'Dr. Richard Wilson',
      statusColor: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'P-1246',
      initials: 'MB',
      name: 'Michael Brown',
      age: 32,
      status: 'Discharged',
      department: 'Orthopedics',
      doctor: 'Dr. Sarah Johnson',
      statusColor: 'bg-green-100 text-green-600',
    },
    {
      id: 'P-1247',
      initials: 'SG',
      name: 'Sophia Garcia',
      age: 28,
      status: 'Outpatient',
      department: 'Neurology',
      doctor: 'Dr. James Smith',
      statusColor: 'bg-yellow-100 text-yellow-600',
    },
    {
      id: 'P-1248',
      initials: 'RM',
      name: 'Robert Martinez',
      age: 67,
      status: 'Critical',
      department: 'ICU',
      doctor: 'Dr. Maria Rodriguez',
      statusColor: 'bg-red-100 text-red-600',
    },
    {
      id: 'P-1249',
      initials: 'ED',
      name: 'Emily Davis',
      age: 39,
      status: 'Admitted',
      department: 'Gastroenterology',
      doctor: 'Dr. David Anderson',
      statusColor: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'P-1250',
      initials: 'WJ',
      name: 'William Johnson',
      age: 54,
      status: 'Outpatient',
      department: 'Oncology',
      doctor: 'Dr. Jennifer Lee',
      statusColor: 'bg-yellow-100 text-yellow-600',
    },
  ];
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-sm text-gray-600">
          <th className="p-3">Name</th>
          <th className="p-3">Age</th>
          <th className="p-3">Status</th>
          <th className="p-3">Doctor</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index} className="border-t text-sm">
            <td className="p-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                {patient.initials}
              </span>
              {patient.name}
            </td>
            <td className="p-3">{patient.age}</td>
            <td className="p-3">
              <span className={`px-2 py-1 text-xs font-medium rounded ${patient.statusColor}`}>
                {patient.status}
              </span>
            </td>
            <td className="p-3">{patient.doctor}</td>
            <td className="p-3 flex gap-3 text-gray-500">
              <svg
                className="w-5 h-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                className="w-5 h-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16h8m-4-4v4m0-4h4m-4 0H8m5-10a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
              <svg
                className="w-5 h-5 cursor-pointer text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
