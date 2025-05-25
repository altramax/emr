import RecentPatientEntry from '@/src/components/molecules/dashboard-molecules/recent-patient-entry';

export default function RecentPatients() {
  const patients = [
    {
      name: 'Emma Thompson',
      id: 'P-1245',
      age: 45,
      status: 'Admitted',
      dept: 'Cardiology',
      statusColor: 'bg-blue-200',
    },
    {
      name: 'Michael Brown',
      id: 'P-1246',
      age: 32,
      status: 'Discharged',
      dept: 'Orthopedics',
      statusColor: 'bg-green-200',
    },
    {
      name: 'Sophia Garcia',
      id: 'P-1247',
      age: 28,
      status: 'OutPatient',
      dept: 'Neurology',
      statusColor: 'bg-yellow-200',
    },
    {
      name: 'Robert Martinez',
      id: 'P-1248',
      age: 67,
      status: 'OutPatient',
      dept: 'Neurology',
      statusColor: 'bg-yellow-200',
    },
  ];

  return (
    <div className="bg-white py-4 rounded-lg shadow">
      <div>
        <div className="font-semibold text-xl mb-2 px-6 pb-4 border-b">Recent Patients</div>
      </div>
      {patients.map((p) => (
        <RecentPatientEntry key={p.id} {...p} />
      ))}
    </div>
  );
}
