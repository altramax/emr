import Avatar from '../../atoms/Avatar/Avatar';

type RecentPatientEntryProps = {
  name: string;
  id: string;
  status: string;
  time: string;
};

export default function AppointmentCard({ name, id, status, time }: RecentPatientEntryProps) {
  return (
    <div key={id} className="flex justify-between items-center px-6 py-4 border-b last:border-b-0">
      <div className="flex items-center justify-start gap-4">
        <Avatar firstname={name[0]} lastname={name[1]} size={50} />

        <div>
          <div className="font-medium">{name}</div>
          <div className="flex items-start justify-start gap-2 text-xs text-gray-500 mt-1">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {time} •
          </div>
        </div>
      </div>

      <div>
        {status === 'Cancelled' && (
          <p className={`text-sm w-[100px] py-1 rounded-2xl bg-red-200 text-red-600 text-center`}>
            {status}
          </p>
        )}
        {status === 'Confirmed' && (
          <p
            className={`text-sm w-[100px] py-1 rounded-2xl bg-green-200 text-green-600 text-center`}
          >
            {status}
          </p>
        )}
        {status === 'Pending' && (
          <p
            className={`text-sm w-[100px] py-1 rounded-2xl bg-yellow-200 text-yellow-600 text-center`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
