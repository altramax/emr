'use client';
type PatientInfoRowProps = {
  label: string;
  value: string | undefined;
};

const PatientInfoRow = ({ label, value }: PatientInfoRowProps) => (
  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-3 border-b border-gray-200">
    <p className="text-sm text-gray-500 font-medium w-full sm:w-1/3">{label}</p>
    <p className="text-sm text-gray-700 w-full sm:w-2/3 text-left sm:text-right">
      {value || <span className="italic text-gray-400">Not specified</span>}
    </p>
  </div>
);

export default PatientInfoRow;
