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
  const vitalsArray: any = isSelectedVital ? Object.entries(isSelectedVital?.task_result) : [];
  const weight = isSelectedVital ? Number(isSelectedVital?.task_result?.weight) : 0;
  const height = isSelectedVital ? Number(isSelectedVital?.task_result?.height) : 0;
  const bmi = weight / (height / 100) ** 2;

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="w-full">
        <p className="text-lg font-semibold flex items-center gap-1 mb-2">
          <Activity size={16} className="text-blue-400" />
          Current vital signs
        </p>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden flex md:justify-start lg:justify-between items-start gap-4 w-full flex-wrap
  `}
        >
          {vitalsArray ? (
            <>
              {vitalsArray.map((item: Record<string, any>, index: number) => {
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
              })}
              {!!bmi && <VitalCard label="B.M.I" value={`${bmi.toFixed(2)}`} />}
            </>
          ) : null}
        </div>
      </div>

      <div className="w-[180px] flex flex-col gap-2 justify-start items-end">
        <button
          onClick={() => router.push(`/add-vitals/${id}?from=/diagnosis`)}
          className=" w-fit py-1 px-3 rounded-lg  text-xs bg-blue-500 hover:bg-blue-600 text-white"
        >
          Retake vitals
        </button>
        <div className="overflow-y-auto h-[200px] lg:h-[100px] text-end">
          {data
            ? data.map((item: any) => {
                return (
                  <button
                    key={item?.id}
                    className={`px-1 my-1 text-xs ${item?.id === isSelectedVital?.id ? 'text-blue-500 border-b border-blue-500' : 'text-gray-600'}`}
                    onClick={() => setIsSelectedVital(item)}
                  >
                    <p>{`${dayjs(item?.created_at).format(' h:mmA DD/MM/YYYY')}`}</p>
                  </button>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
