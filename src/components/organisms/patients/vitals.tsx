'use client';

import { useState, useEffect } from 'react';
import { HeartPulse, Thermometer, Activity, Droplets, Wind, Ruler, Weight } from 'lucide-react';

type VitalField = {
  key: string;
  label: string;
  unit?: string;
};

type VitalSchema = {
  label: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  icon: any;
  fields: VitalField[];
};

const vitalsSchema: VitalSchema[] = [
  {
    label: 'Heart Rate',
    icon: <HeartPulse size={20} />,
    fields: [{ key: 'heartRate', label: 'Heart Rate', unit: 'bpm' }],
  },
  {
    label: 'Blood Pressure',
    icon: <Droplets size={20} />,
    fields: [
      { key: 'systolic', label: 'Systolic', unit: 'mmHg' },
      { key: 'diastolic', label: 'Diastolic', unit: 'mmHg' },
    ],
  },
  {
    label: 'Temperature',
    icon: <Thermometer size={20} />,
    fields: [{ key: 'temperature', label: 'Temperature', unit: '°C' }],
  },
  {
    label: 'Respiration Rate',
    icon: <Wind size={20} />,
    fields: [{ key: 'respiration', label: 'Respiration Rate', unit: 'breaths/min' }],
  },
  {
    label: 'Oxygen Saturation',
    icon: <Activity size={20} />,
    fields: [{ key: 'oxygenSaturation', label: 'O₂ Saturation', unit: '%' }],
  },
  {
    label: 'Height & Weight',
    icon: <Ruler size={20} />,
    fields: [
      { key: 'height', label: 'Height', unit: 'cm' },
      { key: 'weight', label: 'Weight', unit: 'kg' },
    ],
  },
];

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

const Vitals = () => {
  // const [vitals, setVitals] = useState(defaultVitals);
  const [formData, setFormData] = useState(defaultVitals);
  const [isEditing, setIsEditing] = useState(false);
  const [bmi, setBmi] = useState(0);

  const calculateBmi = (height: number, weight: number) => {
    if (!height || !weight) return 0;
    const heightInMeters = height / 100;
    return +(weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  useEffect(() => {
    const height = parseFloat(formData.height as any);
    const weight = parseFloat(formData.weight as any);
    setBmi(calculateBmi(height, weight));
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Patient Vitals</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitalsSchema.map(({ label, icon, fields }) => (
          <div key={label} className="bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
              <p className="font-medium text-gray-800">{label}</p>
            </div>

            <div className={`grid grid-cols-${fields.length > 1 ? '2' : '1'} gap-2`}>
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-500">{field.label}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={field.key}
                      onChange={handleChange}
                      className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
                    />
                  ) : (
                    <p className="text-sm text-gray-800 mt-1 font-medium">
                      {/* {vitals[field.key]} {field.unit} */}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* BMI Display */}
        <div className="bg-white border rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Weight size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Body Mass Index (BMI)</p>
            <p className="text-md font-medium text-gray-800 mt-1">{bmi}</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="text-right">
          <button
            // onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save Vitals
          </button>
        </div>
      )}
    </div>
  );
};

export default Vitals;
