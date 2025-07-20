import { useRouter } from 'next/navigation';
import { ArrowLeft, User2 } from 'lucide-react';
import PatientInfoRow from '../../molecules/patient-info-row/patient-info-row';
import CalculateAge from '../../atoms/calculate-age/calculate-age';
import Button from '../../atoms/button/button';

type PatientInfoRowProps = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  back_path?: string;
  buttonAction: () => void;
  buttonText: string;
  disabled?: boolean;
};

const DetailsHeaderWithButton = ({
  data,
  back_path,
  buttonAction,
  buttonText,
  disabled = false,
}: PatientInfoRowProps) => {
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
    <div className="px-10 py-4 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between gep-4">
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
        <Button
          className="bg-blue-600 text-white rounded-md px-4 py-1.5 text-xs"
          onClick={buttonAction}
          value={buttonText}
          type="button"
          disabled={disabled}
        />
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex justify-between items-start gap-6">
        <div className="flex flex-col items-center gap-2 w-[20%]">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            <User2 size={38} />
          </div>

          {renderStatus(data?.patient?.status)}
        </div>

        <div className="flex flex-col border rounded-lg border-gray-100 px-4 py-2 bg-gray-50 shadow-sm w-[35%]">
          <PatientInfoRow
            label="Name"
            value={`${data?.patient?.first_name} ${data?.patient?.last_name}`}
          />

          <PatientInfoRow label="Gender" value={data?.patient?.gender} />
        </div>

        <div className="flex flex-col border rounded-lg border-gray-100 px-4 py-2 bg-gray-50 shadow-sm w-[35%]">
          <PatientInfoRow label="Age" value={CalculateAge(data?.patient?.date_of_birth)} />
          <PatientInfoRow label="Email" value={data?.patient?.email} />
        </div>
      </div>
    </div>
  );
};

export default DetailsHeaderWithButton;
