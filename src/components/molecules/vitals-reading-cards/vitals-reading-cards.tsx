import VitalCard from '@/src/components/molecules/vitals-card/vitals-card';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

type vitalsType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  id?: string;
};
export default function VitalsReadingCards({ data, id }: vitalsType) {
  const [isSelectedVital, setIsSelectedVital] = useState<any>(data ? data[0] : null);
  const router = useRouter();
  const vitalsArray = isSelectedVital ? Object.entries(isSelectedVital?.task_result) : [];

  console.log('iselected', isSelectedVital);
  return (
    <div className="">
      <div className="flex justify-between items-center gap-4 mb-2">
        <p className="text-lg font-semibold flex items-center gap-1">
          <Activity size={16} className="text-blue-400" />
          Current vital signs
        </p>
        <div className="flex items-center gap-3">
          <div className="flex justify-end items-center gap-4">
            {data
              ? data.map((item: any) => {
                  console.log('item', item);
                  return (
                    <button
                      key={item?.id}
                      className={`  px-2 py-1 text-xs  rounded-xl ${item?.id === isSelectedVital?.id ? 'bg-black text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-300'}`}
                      onClick={() => setIsSelectedVital(item)}
                    >
                      <p>{`${dayjs(item?.created_at).format(' h:mm A DD-MM-YYYY')}`}</p>
                    </button>
                  );
                })
              : null}
          </div>
          <button
            onClick={() => router.push(`/add-vitals/${id}?from=/diagnosis`)}
            className="ml-auto w-fit py-1 px-3 rounded-lg  text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
          >
            Retake vitals
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex md:justify-start lg:justify-between items-start gap-4 w-full flex-wrap
  `}
      >
        {vitalsArray
          ? vitalsArray.map((item: Record<string, any>, index: number) => {
              if (item[0] === 'blood_pressure') {
                return (
                  <div key={index + 1}>
                    <VitalCard
                      label="B.P (mmHg)"
                      value={`${item[1]?.systolic} / ${item[1]?.diastolic}`}
                    />
                  </div>
                );
              }
              if (item[0] === 'respiratory_rate') {
                return (
                  <div key={index + 1}>
                    <VitalCard label="Resp. Rate (b/m)" value={`${item[1]} `} />
                  </div>
                );
              }
              if (item[0] === 'oxygen_saturation') {
                return (
                  <div key={index + 1}>
                    <VitalCard label="SpO₂ (%)" value={`${item[1]}`} />
                  </div>
                );
              }
              if (item[0] === 'heart_rate') {
                return (
                  <div key={index + 1}>
                    <VitalCard label="Heart Rate (bpm)" value={`${item[1]}`} />
                  </div>
                );
              }
              if (item[0] === 'temperature') {
                return (
                  <div key={index + 1}>
                    <VitalCard label="Temp. (°C)" value={`${item[1]}`} />
                  </div>
                );
              }
              if (item[0] === 'weight') {
                return (
                  <div key={index + 1}>
                    <VitalCard label="Weight (kg)" value={`${item[1]}`} />
                  </div>
                );
              }
              if (item[0] === 'height') {
                return (
                  <div key={index + 1}>
                    <VitalCard label="Height (cm)" value={`${item[1]}`} />
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
}
