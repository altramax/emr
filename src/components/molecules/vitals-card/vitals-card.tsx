type vtype = {
  label: string;
  value: string;
};

const VitalCard = ({ label, value }: vtype) => {
  return (
    <div className="flex justify-between items-center gap-4 w-full  px-2 py-2  text-xs border-b">
      <span className="font-medium text-gray-600">
        {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}:
      </span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
};

export default VitalCard;
