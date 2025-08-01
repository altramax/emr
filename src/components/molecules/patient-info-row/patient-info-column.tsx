'use client';
type PatientInfoRowProps = {
  label: string;
  value: string | undefined;
};

const PatientInfoColumn = ({ label, value }: PatientInfoRowProps) => (
  <div className="py-2 border-b border-gray-200">
    <p className="text-xs text-gray-500 ">{label}:</p>
    <p className="text-xs text-gray-700 font-medium  text-left ">
      {value || <span className="italic text-gray-400">Not specified</span>}
    </p>
  </div>
);

export default PatientInfoColumn;
