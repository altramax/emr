'use client';

import { useState } from 'react';
import { HeartPulse, Thermometer, Activity, Droplets, Wind, Ruler } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import { inputType } from '@/src/validations/add-vitals-schema';
import { useUpdateTask } from '@/src/hooks/task/use-update-task';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useInsertTask } from '@/src/hooks/task/use-insert-task';
import ConfirmationReviewModal from '@/src/components/molecules/confirmation-review-modal/confirmation-review-modal';

type vitalsType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  from?: string | null;
};

const AddVitals = ({ data, from }: vitalsType) => {
  const router = useRouter();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const initialVitals = {
    heartRate: '',
    systolic: '',
    diastolic: '',
    temperature: '',
    respiration: '',
    oxygenSaturation: '',
    height: '',
    weight: '',
  };

  const { control, getValues } = useForm<inputType>({
    defaultValues: initialVitals,
    mode: 'onChange',
  });

  const values = getValues();
  const submitData = {
    status: 'completed',
    patient_id: data?.patient_id,
    task_result: {
      blood_pressure: { systolic: values.systolic, diastolic: values.diastolic },
      heart_rate: values.heartRate,
      respiratory_rate: values.respiration,
      temperature: values.temperature,
      oxygen_saturation: values.oxygenSaturation,
      weight: values.weight,
      height: values.height,
    },
  };

  const createData = {
    status: 'completed',
    patient_id: data?.patient_id,
    task_name: 'vitals',
    visit_id: data?.id,
    task_result: {
      blood_pressure: { systolic: values.systolic, diastolic: values.diastolic },
      heart_rate: values.heartRate,
      respiratory_rate: values.respiration,
      temperature: values.temperature,
      oxygen_saturation: values.oxygenSaturation,
      weight: values.weight,
      height: values.height,
    },
    task_data: [
      'blood_pressure',
      'heart_rate',
      'respiratory_rate',
      'temperature',
      'oxygen_saturation',
      'weight',
      'height',
    ],
  };

  const { updateTask, error } = useUpdateTask({ columns: submitData, id: `${data?.id}` });
  const { insertTask } = useInsertTask({ tableName: 'tasks', columns: createData });

  const submitVitals = async () => {
    try {
      let response;
      if (from) {
        response = await insertTask();
        toast.success('Vitals added successfully');
        router.push(`/patients/add-diagnoses/${data?.patient?.id}`);
      } else {
        response = await updateTask();
        toast.success('Vitals updated successfully');
        router.push('/patients/add-vitals');
      }
      console.log(response);
    } catch (err) {
      toast.error('Error saving vitals');
      console.log(err, error);
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const renderModal = () => {
    if (isConfirmationModalOpen) {
      return (
        <ConfirmationReviewModal
          isOpen={isConfirmationModalOpen}
          onCancel={closeConfirmationModal}
          onConfirm={submitVitals}
          title="Confirm Vitals Submission"
          formdata={values}
        />
      );
    }
  };

  return (
    <form>
      {renderModal()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          key={'Heart Rate'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
              <HeartPulse size={15} />
            </div>
            <p className="font-base text-xs text-gray-800">Heart Rate</p>
          </div>

          <div className={`relative`}>
            <Input
              control={control}
              name="heartRate"
              type="string"
              className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
            />
            <span className="absolute  top-1/4 right-2  text-xs text-black">bpm</span>
          </div>
        </div>

        <div
          key={'blood pressure'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
              <Droplets size={15} />
            </div>
            <p className="font-base text-xs text-gray-800">Blood Pressure</p>
          </div>

          <div className={`flex justify-between items-center gap-4`}>
            <div>
              <label htmlFor="systolic" className="text-xs text-gray-500">
                Systolic
              </label>

              <div className={` relative`}>
                <Input
                  control={control}
                  type="string"
                  name="systolic"
                  className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
                />
                <span className="absolute  top-1/4 right-2  text-xs text-black">mmHg</span>
              </div>
            </div>
            <div>
              <label htmlFor="diastolic" className="text-xs text-gray-500">
                Diastolic
              </label>
              <div className={`relative`}>
                <Input
                  control={control}
                  type="string"
                  name="diastolic"
                  className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
                />
                <span className="absolute  top-1/4 right-2  text-xs text-black">mmHg</span>
              </div>
            </div>
          </div>
        </div>

        <div
          key={'Temperature'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
              <Thermometer size={15} />
            </div>
            <p className="font-base text-xs text-gray-800">Temperature</p>
          </div>

          <div className={`grid grid-cols gap-2`}>
            <div className={`relative`}>
              <Input
                control={control}
                type="string"
                name="temperature"
                className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
              />
              <span className="absolute  top-1/4 right-2  text-xs text-black">°C</span>
            </div>
          </div>
        </div>

        <div
          key={'Respiration Rate'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
              <Wind size={15} />
            </div>
            <p className="font-base text-xs text-gray-800">Respiration Rate</p>
          </div>

          <div className={`relative`}>
            <Input
              control={control}
              name="respiration"
              type="string"
              className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
            />
            <span className="absolute  top-1/4 right-2  text-xs text-black">breaths/min</span>
          </div>
        </div>

        <div
          key={'Oxygen Saturation'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
              <Activity size={15} />
            </div>
            <p className="font-base text-xs text-gray-800">Oxygen Saturation</p>
          </div>

          <div className={`relative`}>
            <Input
              control={control}
              name="oxygenSaturation"
              type="string"
              className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
            />
            <span className="absolute  top-1/4 right-2  text-xs text-black">%</span>
          </div>
        </div>

        <div
          key={'Height & Weight'}
          className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
              <Ruler size={15} />
            </div>
            <p className="font-base text-xs text-gray-800">Height & Weight</p>
          </div>

          <div className={`flex justify-between items-center gap-4`}>
            <div>
              <label htmlFor="Height" className="text-xs text-gray-500">
                Height
              </label>
              <div className={`relative`}>
                <Input
                  control={control}
                  name="height"
                  type="string"
                  className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
                />
                <span className="absolute  top-1/4 right-2  text-xs text-black">cm</span>
              </div>
            </div>
            <div>
              <label htmlFor="Weight" className="text-xs text-gray-500">
                Weight
              </label>
              <div className={`relative`}>
                <Input
                  control={control}
                  type="string"
                  name="weight"
                  className="text-black border border-gray-300 text-sm rounded-md px-2 py-1 mt-1 w-full"
                />
                <span className="absolute  top-1/4 right-2  text-xs text-black">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right mt-4">
        <button
          type="button"
          onClick={openConfirmationModal}
          className="text-xs px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Save Vitals
        </button>
      </div>
    </form>
  );
};

export default AddVitals;
