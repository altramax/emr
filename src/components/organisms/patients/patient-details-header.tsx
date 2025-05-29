import { useRouter } from 'next/navigation';

import { ArrowLeft, User2, Pencil } from 'lucide-react';

const PatientDetailsHeader = () => {
  const router = useRouter();

  return (
    <div className="px-10 py-4 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors"
          onClick={() => router.push('/patients')}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <button className="flex items-center gap-2 text-sm px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all">
          <Pencil size={16} />
          Edit Patient
        </button>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex justify-between items-start gap-6">
        <div className="flex flex-col items-center gap-3 w-[20%]">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            <User2 size={38} />
          </div>
          <span className="px-4 py-1 rounded-full text-green-700 bg-green-100 text-sm font-medium shadow-sm">
            Active
          </span>
        </div>

        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm w-[35%]">
          <div className="flex justify-between items-center gap-6 border-b border-gray-200 pb-2">
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium text-gray-700 text-wrap text-end">John Doe</p>
          </div>

          <div className="flex justify-between items-center gap-6 border-b border-gray-200 pb-2">
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="font-medium text-gray-700 text-wrap text-end">Male</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm w-[35%]">
          <div className="flex justify-between items-center gap-6 border-b border-gray-200 pb-2">
            <p className="text-gray-500 text-sm">Date of Birth</p>
            <p className="font-medium text-gray-700 text-wrap text-end">12/12/2000</p>
          </div>
          <div className="flex justify-between items-center gap-6 border-b border-gray-200 pb-2">
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-medium text-gray-700 text-wrap text-end">+234 701 234 5678</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsHeader;
