import SummaryCards from '@/src/components/molecules/dashboard-molecules/summary-cards';

export default function SummaryCardGroup() {
  const stats = [
    {
      title: 'Total Patients',
      count: '1,485',
      description: 'Active patients in system',
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#1E40AF"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 0C5.96 0 3.5 2.46 3.5 5.5S5.96 11 9 11s5.5-2.46 5.5-5.5S12.04 0 9 0zm-3.5 5.5C5.5 3.57 7.07 2 9 2s3.5 1.57 3.5 3.5S10.93 9 9 9 5.5 7.43 5.5 5.5z"
          />
          <path d="M15.5 0a1 1 0 000 2c1.93 0 3.5 1.57 3.5 3.5S17.43 9 15.5 9a1 1 0 000 2c3.04 0 5.5-2.46 5.5-5.5S18.54 0 15.5 0z" />
          <path d="M19.08 14.02a1 1 0 011.32-.52C22.52 14.42 24 16.54 24 19v2a1 1 0 11-2 0v-2c0-1.64-0.99-3.05-2.4-3.67a1 1 0 01-.52-1.31z" />
          <path d="M6 13c-3.31 0-6 2.69-6 6v2a1 1 0 002 0v-2c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v2a1 1 0 102 0v-2c0-3.31-2.69-6-6-6H6z" />
        </svg>
      ),
      color: 'bg-blue-100',
    },
    {
      title: "Today's Appointments",
      count: '42',
      description: '8 appointments pending',
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
            stroke="#1E40AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      secondaryValue: '8 pending',
      color: 'bg-green-100',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
      {stats.map((stat) => (
        <SummaryCards key={stat.title} {...stat} />
      ))}
    </div>
  );
}
