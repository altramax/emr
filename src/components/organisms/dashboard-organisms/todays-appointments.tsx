import AppointmentCard from '../../molecules/dashboard-molecules/appointment-card';

export default function TodaysAppointments() {
  const patients = [
    {
      name: 'Robert Martinez',
      id: 'P-1248',
      age: 67,
      status: 'Confirmed',
      time: '01:15 PM',
    },
    {
      name: 'Emma Thompson',
      id: 'P-1245',
      age: 45,
      status: 'Cancelled',
      time: '10:00 AM',
    },
    {
      name: 'Michael Brown',
      id: 'P-1246',
      age: 32,
      status: 'Pending',
      time: '10:30 AM',
    },
    {
      name: 'Sophia Garcia',
      id: 'P-1247',
      age: 28,
      status: 'Confirmed',
      time: '11:45 AM',
    },
  ];

  return (
    <div className="bg-white py-4 rounded-lg shadow">
      <div>
        <div className="font-semibold text-xl mb-2 px-6 pb-4 border-b">Today Appointments</div>
      </div>
      {patients.map((p) => (
        <AppointmentCard key={p.id} {...p} />
      ))}
    </div>
  );
}
