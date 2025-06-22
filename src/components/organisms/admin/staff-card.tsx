import Avatar from '../../atoms/Avatar/Avatar';
import CalculateAge from '../../atoms/calculate-age/calculate-age';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function StaffCard(data: any) {
  const renderStatus = () => {
    switch (data?.status) {
      case 'active':
        return (
          <div className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs font-medium">
            Active
          </div>
        );
      case 'deactivated':
        return (
          <div className="bg-yellow-100 text-yellow-600 rounded-full px-3 py-1 text-xs font-medium">
            Deactivated
          </div>
        );
      case 'diseased':
        return (
          <div className="bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs font-medium">
            diseased
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-black rounded-full px-3 py-1 text-xs font-medium">
            unavailable
          </div>
        );
    }
  };

  return (
    <button
      className="mb-4 w-[700px] cursor-pointer shadow-inner border-b rounded-xl border-gray-200 py-2.5 px-6 flex justify-between items-center"
      onClick={data?.onChange}
    >
      <div className="flex items-center justify-between gap-2">
        <Avatar firstname={data?.first_name} lastname={data?.last_name} />
        <div className="flex flex-col items-start justify-start">
          <p className="text-sm font-medium">
            {data?.first_name} {data?.last_name}
          </p>
          <div className="flex justify-center items-center gap-2 mt-[-2px]">
            <p className="text-xs font-sm">{data?.gender}</p> •
            <p className="text-xs font-sm">{CalculateAge(data?.date_of_birth)}</p>
          </div>
        </div>
      </div>
      <div className="flex  items-center justify-start gap-4">
        <p className="text-xs font-sm text-blue-500">
          Dept: {data?.department.charAt(0)?.toUpperCase() + data?.department?.slice(1)}
        </p>{' '}
        •{renderStatus()}
      </div>
    </button>
  );
}
