type StatCardProps = {
  title: string;
  count: string;
  description: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  icon?: any;
  color: string;
};

const SummaryCards = ({ title, count, description, icon, color }: StatCardProps) => {
  return (
    <div className={`${color} rounded-lg shadow p-6 flex flex-col`}>
      <div className="flex items-center justify-between gap-4 ">
        <h3 className="text-blue-800 text-base font-medium">{title}</h3>
        <div className="h-6 w-6 text-gray-400">{icon}</div>
      </div>

      <div className=" mt-4">
        <p className="text-3xl font-semibold text-gray-900">{count}</p>
      </div>
      <div className=" mt-4">
        <p className="text-base font-semibold text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SummaryCards;

// export default function SummaryCards() {
//   const stats = [
//     { label: 'Total Patients', value: '1,485', subtext: 'Active patients in system', trend: '+12%', color: 'bg-blue-100', text: 'text-blue-800' },
//     { label: "Today's Appointments", value: '42', subtext: '8 appointments pending', trend: '+8%', color: 'bg-green-100', text: 'text-green-800' },
//     { label: 'Bed Occupancy', value: '78%', subtext: '425 out of 545 beds', trend: '-5%', color: 'bg-yellow-100', text: 'text-yellow-800' },
//     { label: 'Emergency Visits', value: '24', subtext: 'Last 24 hours', trend: '+10%', color: 'bg-red-100', text: 'text-red-800' }
//   ];

//   return (
//     <>
//       {stats.map(stat => (
//         <div key={stat.label} className={`p-4 rounded shadow ${stat.color}`}>
//           <div className={`text-lg font-bold ${stat.text}`}>{stat.value}</div>
//           <div className="text-sm text-gray-700">{stat.label}</div>
//           <div className="text-xs text-gray-500">{stat.subtext} • <span className="font-medium">{stat.trend} from last month</span></div>
//         </div>
//       ))}
//     </>
//   );
// }
