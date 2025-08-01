import {
  Ruler,
  Scale,
  HeartPulse,
  Activity,
  HeartPulseIcon,
  Thermometer,
  Waypoints,
} from 'lucide-react';

type vtype = {
  label: string;
  value: string;
};

const VitalCard = ({ label, value }: vtype) => {
  const renderIcon = () => {
    switch (label) {
      case 'Height (cm)':
        return <Ruler size={24} className="text-green-600 m-auto" />;
      case 'Weight (kg)':
        return <Scale size={24} className="text-purple-600 m-auto" />;
      case 'B.P (mmHg)':
        return <HeartPulse size={24} className="text-red-600 m-auto" />;
      case 'Heart Rate (bpm)':
        return <HeartPulseIcon size={24} className="text-red-600 m-auto" />;
      case 'Resp. Rate (b/m)':
        return <Activity size={24} className="text-yellow-600 m-auto" />;
      case 'Temp. (°C)':
        return <Thermometer size={24} className="text-orange-500 m-auto" />;
      case 'SpO₂ (%)':
        return <Waypoints size={24} className="text-blue-600 m-auto" />;
      default:
        return <></>;
    }
  };

  return (
    <div className="p-2   bg-gray-50 rounded-md flex flex-col justify-center items-center w-[100px] h-[90px]">
      {renderIcon()}
      <span className="text-gray-900 font-semibold text-sm">{value ?? 'N/A'}</span>
      <div className=" text-[10px] text-gray-600 flex items-center gap-2 ">
        {(label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()).split('_').join(' ')}
      </div>
    </div>
  );
};

export default VitalCard;
