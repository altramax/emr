import VitalCard from '@/src/components/molecules/vitals-card/vitals-card';
import { useState } from 'react';
import dayjs from 'dayjs';

type vitalsType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};
export default function VitalsDropdown({ data }: vitalsType) {
  const [isSelectedVitalsOpen, setIsSelectedVitalsOpen] = useState<boolean>(false);

  const openhandler = () => {
    setIsSelectedVitalsOpen(!isSelectedVitalsOpen);
  };

  const vitalsArray = data ? Object.entries(data?.task_result) : [];
  return (
    <div className="mb-6">
      <button
        className=" font-semibold bg-blue-100 text-left text-xs text-gray-600 px-4 py-2 flex justify-center items-center gap-6 w-full border-b rounded-sm"
        onClick={openhandler}
      >
        <p>{`${dayjs(data?.created_at).format('dddd D [of] MMMM h:mm A')}`}</p>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden 
    ${isSelectedVitalsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {data
          ? vitalsArray.map((item: Record<string, any>, index: number) => {
              if (item[0] === 'blood_pressure') {
                return (
                  <div key={index + 1}>
                    <VitalCard
                      label="Blood pressure"
                      value={`${item[1]?.systolic} / ${item[1]?.diastolic} mmHg`}
                    />
                  </div>
                );
              }
              return (
                <div key={item[0]} className="w-full">
                  <VitalCard label={item[0]} value={item[1]} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
