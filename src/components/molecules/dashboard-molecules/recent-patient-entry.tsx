import Avatar from '../../atoms/Avatar/Avatar';

type RecentPatientEntryProps = {
  name: string;
  id: string;
  age: number;
  status: string;
};

export default function RecentPatientEntry({ name, id, age, status }: RecentPatientEntryProps) {
  return (
    <div key={id} className="flex justify-between items-center px-6 py-4 border-b last:border-b-0">
      <div className="flex items-center justify-start gap-4">
        <Avatar firstname={name[0]} lastname={name[1]} size={50} />

        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500 mt-1">
            {id} • {age} years •
          </div>
        </div>
      </div>

      <div>
        {status === 'Admitted' && (
          <p className={`text-sm w-[100px] py-1 rounded-2xl bg-blue-200 text-center`}>{status}</p>
        )}
        {status === 'Discharged' && (
          <p className={`text-sm w-[100px] py-1 rounded-2xl bg-green-200 text-center`}>{status}</p>
        )}
        {status === 'OutPatient' && (
          <p className={`text-sm w-[100px] py-1 rounded-2xl bg-yellow-200 text-center`}>{status}</p>
        )}
      </div>
    </div>
  );
}
