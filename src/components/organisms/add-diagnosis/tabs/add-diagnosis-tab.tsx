'use client';

import { useState } from 'react';
import Textarea from '@/src/components/atoms/TextArea/text-area';
import { useForm } from 'react-hook-form';
// import { useUpdateDiagnosis } from '@/src/hooks/diagnosis/use-update-diagnosis';

type dataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

export default function AddDiagnosisTab({ data }: dataType) {
  const [symptoms, setSymptoms] = useState('');
  const [observations, setObservations] = useState('');
  const initialValues = {
    symptoms: '',
    observations: '',
    diagnosis: '',
  };

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: initialValues,
  });

  // const { UpdateDiagnosis, loading } = useUpdateDiagnosis({
  //   columns: "",
  //   id: data?.id,
  // });

  const submit = async () => {};

  const resetFields = () => {
    setValue('symptoms', '');
    setValue('observations', '');
    setValue('diagnosis', '');
  };

  console.log(data);

  return (
    <div className="w-full mt-4">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex gap-[5%] items-center justify-center mb-4">
          <div className="w-[45%]">
            {/* <label className="block text-xs mb-1 font-medium text-gray-700">Symptoms</label> */}
            <Textarea
              className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              required
              name="symptoms"
              control={control}
              label="Symptoms"
            />
          </div>

          <div className="w-[45%]">
            {/* <label className="block text-xs mb-1 font-medium text-gray-700">Observations</label> */}
            <Textarea
              className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={4}
              name="observations"
              control={control}
              label="Observations"
            />
          </div>
        </div>
        <div className="w-[94%] m-auto">
          {/* <label htmlFor="diagnosis" className=" text-xs block mb-1 font-medium text-gray-700">
            Diagnosis
          </label> */}
          <Textarea
            className="w-full px-4 py-2 text-black text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows={5}
            name="diagnosis"
            control={control}
            label="Diagnosis"
          />
        </div>

        <div className="flex items-center justify-end gap-4 mt-10 w-[94%] m-auto">
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 text-xs text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
            onClick={resetFields}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-xs text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
