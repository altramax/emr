'use client';

import { useState, useEffect } from 'react';
import { HeartPulse, Thermometer, Activity, Droplets, Wind, Ruler } from 'lucide-react';

//

// type VitalSchema = {
//   label: string;
//   /* eslint-disable  @typescript-eslint/no-explicit-any */
//   icon: any;
//   fields: VitalField[];
// };

const defaultVitals = {
  heartRate: 72,
  systolic: 120,
  diastolic: 80,
  temperature: 36.7,
  respiration: 16,
  oxygenSaturation: 98,
  height: 170,
  weight: 65,
};

const AddVitals = () => {
  // const [vitals, setVitals] = useState(defaultVitals);
  const [formData, setFormData] = useState(defaultVitals);
  // const [isEditing, setIsEditing] = useState(false);
  // const [bmi, setBmi] = useState(0);

  // const calculateBmi = (height: number, weight: number) => {
  //   if (!height || !weight) return 0;
  //   const heightInMeters = height / 100;
  //   return +(weight / (heightInMeters * heightInMeters)).toFixed(1);
  // };

  useEffect(() => {
    // const height = parseFloat(formData.height as any);
    // const weight = parseFloat(formData.weight as any);
    // setBmi(calculateBmi(height, weight));
  }, [formData.height, formData.weight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSave = () => {
  //   setVitals(formData);
  //   setIsEditing(false);
  // };

  return (
    <div className="space-y-6 mt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          key={'Heart Rate'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <HeartPulse size={20} />
            </div>
            <p className="font-medium text-gray-800">Heart Rate</p>
          </div>

          <div className={`grid grid-cols gap-2`}>
            <input
              type="text"
              onChange={handleChange}
              className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
            />
          </div>
        </div>

        <div
          key={'blood pressure'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Droplets size={20} />
            </div>
            <p className="font-medium text-gray-800">Blood Pressure</p>
          </div>

          <div className={`flex justify-between items-center gap-4`}>
            <div>
              <label className="text-xs text-gray-500">Systolic</label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Diastolic</label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <div
          key={'Temperature'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Thermometer size={20} />
            </div>
            <p className="font-medium text-gray-800">Temperature</p>
          </div>

          <div className={`grid grid-cols gap-2`}>
            <div>
              <label className="text-xs text-gray-500"></label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <div
          key={'Respiration Rate'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Wind size={20} />
            </div>
            <p className="font-medium text-gray-800">Respiration Rate</p>
          </div>

          <div className={`grid grid-cols gap-2`}>
            <div>
              <label className="text-xs text-gray-500"></label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <div
          key={'Oxygen Saturation'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Activity size={20} />
            </div>
            <p className="font-medium text-gray-800">Oxygen Saturation</p>
          </div>

          <div className={`grid grid-cols gap-2`}>
            <div>
              <label className="text-xs text-gray-500"></label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
          </div>
        </div>

        <div
          key={'Height & Weight'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Ruler size={20} />
            </div>
            <p className="font-medium text-gray-800">Height & Weight</p>
          </div>

          <div className={`flex justify-between items-center gap-4`}>
            <div>
              <label htmlFor="Height" className="text-xs text-gray-500">
                Height
              </label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="Weight" className="text-xs text-gray-500">
                Weight
              </label>

              <input
                type="text"
                onChange={handleChange}
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
            </div>
          </div>
        </div>

        {/* BMI Display */}
        {/* <div className="bg-white border rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Weight size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Body Mass Index (BMI)</p>
            <p className="text-md font-medium text-gray-800 mt-1">{bmi}</p>
          </div>
        </div> */}
      </div>

      <div className="text-right">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Save Vitals
        </button>
      </div>
    </div>
  );
};

export default AddVitals;
