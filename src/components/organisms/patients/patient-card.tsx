import Avatar from '../../atoms/Avatar/Avatar';
import CalculateAge from '../../atoms/calculate-age/calculate-age';

type PatientCardProps = {
  first_name: string;
  last_name: string;
  id: string;
  gender: string;
  date_of_birth: string;
  onChange?: () => void;
  status: string;
  key: string;
};

export default function PatientCard({
  first_name,
  last_name,
  id,
  gender,
  date_of_birth,
  onChange,
  status,
  key,
}: PatientCardProps) {
  const renderStatus = () => {
    switch (status) {
      case 'active':
        return (
          <div className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-sm font-semibold">
            Active
          </div>
        );
      case 'deactivated':
        return (
          <div className="bg-yellow-100 text-yellow-600 rounded-full px-3 py-1 text-sm font-semibold">
            Deactivated
          </div>
        );
      case 'diseased':
        return (
          <div className="bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm font-semibold">
            diseased
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-black rounded-full px-3 py-1 text-sm font-semibold">
            unavailable
          </div>
        );
    }
  };

  return (
    <button
      className="mb-4 w-full cursor-pointer shadow-inner border-b rounded-xl border-gray-200 py-4 px-6 flex justify-between items-center"
      onClick={onChange}
      key={key}
    >
      <div className="flex items-center justify-between gap-4">
        <Avatar firstname={first_name} lastname={last_name} />
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-medium">
            {first_name} {last_name}
          </p>
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm font-sm">{gender}</p> •
            <p className="text-sm font-sm">{CalculateAge(date_of_birth)}</p>
          </div>
        </div>
      </div>
      <div className="flex  items-center justify-start gap-4">
        <p className="text-sm font-sm text-blue-500">{id}</p> •{renderStatus()}
      </div>
    </button>
  );
}
