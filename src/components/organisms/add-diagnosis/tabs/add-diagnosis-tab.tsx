'use client';

import { useState } from 'react';

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

  console.log(data);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 items-center justify-between mb-4">
          <div className="w-[50%]">
            <label className="block text-xs mb-1 font-medium text-gray-700">Symptoms</label>
            <textarea
              className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>

          <div className="w-[50%]">
            <label className="block text-xs mb-1 font-medium text-gray-700">Observations</label>
            <textarea
              className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={4}
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
            rows={5}
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-4 mt-10">
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 text-xs text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-xs text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
