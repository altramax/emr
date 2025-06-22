'use client';

import { useState } from 'react';
import Button from '@/src/components/atoms/button/button';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';

type dataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

export default function AddDiagnosisTab({ data }: dataType) {
  const [symptoms, setSymptoms] = useState('');
  const [observations, setObservations] = useState('');
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const { control } = useForm();

  const options = [
    { label: 'pending', value: 'pending' },
    { label: 'in progress', value: 'in progress' },
    { label: 'completed', value: 'completed' },
  ];

  console.log(data);
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center justify-start w-[50%] mb-4">
        <div className=" w-[50%] text-xs text-blue-500">
          <SelectDropdown
            options={options}
            name="status"
            placeholder="Care status"
            control={control}
            className="text-xs text-blue-500"
          />
        </div>
        <Button
          value={'Admit patient'}
          className="bg-blue-400 text-white font-medium text-xs text-center px-4 py-2 rounded-lg w-fit"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 items-center justify-between mb-4">
          <div className="w-[50%]">
            <label className="block text-xs mb-1 font-medium text-gray-700">Symptoms</label>
            <textarea
              className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={5}
              required
            ></textarea>
          </div>

          <div className="w-[50%]">
            <label className="block text-xs mb-1 font-medium text-gray-700">Observations</label>
            <textarea
              className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={5}
            ></textarea>
          </div>
        </div>
        <div>
          <label htmlFor="diagnosis" className=" text-xs block mb-1 font-medium text-gray-700">
            Diagnosis
          </label>
          <textarea
            className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-400 text-xs text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Submit Diagnosis
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 text-xs text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
