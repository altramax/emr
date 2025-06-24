'use client';
type StaffInfoRowProps = {
  label: string;
  value: string | undefined;
};

const StaffInfoRow = ({ label, value }: StaffInfoRowProps) => (
  <div className="flex  items-center justify-between gap-4 py-2 border-b border-gray-200 w-full">
    <p className="text-xs text-gray-500 ">{label}</p>
    <p className="text-xs text-gray-700 font-medium  text-left ">
      {value || <span className="italic text-gray-400">Not specified</span>}
    </p>
  </div>
);

export default StaffInfoRow;
