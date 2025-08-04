import { useRouter } from 'next/navigation';
import { ArrowLeft, User2 } from 'lucide-react';
import PatientInfoColumn from '../../molecules/patient-info-row/patient-info-column';
import CalculateAge from '../../atoms/calculate-age/calculate-age';
import Avatar from '../../atoms/Avatar/Avatar';

type PatientInfoRowProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  back_path?: string;
};

const DiagnosisHeader = ({ data, back_path }: PatientInfoRowProps) => {
  const router = useRouter();

  const renderStatus = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="bg-green-100 text-green-600 rounded-full  px-2 py-1 text-xs w-fit font-base">
            Active
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-100 text-yellow-600 rounded-full text-center px-2 py-1 text-xs w-fit font-base">
            Pending
          </div>
        );
      case 'cancelled':
        return (
          <div className="bg-red-100 text-red-600 rounded-full text-center px-2 py-1 text-xs w-fit font-base">
            Cancelled
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-black rounded-full text-center px-2 py-1 text-xs w-fit font-base">
            unavailable
          </div>
        );
    }
  };

  const backHandler = () => {
    if (back_path) {
      return router.push(back_path);
    }
    return router.back();
  };

  return (
    <div className="p-4 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100 w-[200px] h-full">
      <div className="flex items-center justify-start gep-4">
        <button
          className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors"
          onClick={backHandler}
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-medium">Back</span>
        </button>
        <p className="px-4 text-blue-600 text-sm font-medium ">{data?.patient?.id}</p>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex justify-center items-center flex-col gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="w-[90px] h-[90px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            {data?.patient?.first_name && data?.patient?.last_name ? (
              <Avatar
                firstname={data?.patient?.first_name}
                lastname={data?.patient?.last_name}
                size={100}
              />
            ) : (
              <User2 size={40} />
            )}
          </div>

          {renderStatus(data?.patient?.status)}
        </div>

        <button className="w-fit py-1 px-3 rounded-lg  text-xs bg-green-500 hover:bg-green-600 text-white">
          Admit Patient
        </button>

        <div className=" border rounded-lg border-gray-100 px-2 py-1 bg-gray-50 shadow-sm mt-2 w-full">
          <PatientInfoColumn
            label="Name"
            value={`${data?.patient?.first_name} ${data?.patient?.last_name}`}
          />
          <PatientInfoColumn label="Gender" value={data?.patient?.gender} />
          <PatientInfoColumn label="Age" value={CalculateAge(data?.patient?.date_of_birth)} />
          <PatientInfoColumn label="Email" value={data?.patient?.email} />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisHeader;
