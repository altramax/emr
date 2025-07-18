import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import Button from '@/src/components/atoms/button/button';
import { useState, useEffect } from 'react';
import ConfirmationReviewModal from '@/src/components/molecules/confirmation-review-modal/confirmation-review-modal';
import { toast } from 'react-toastify';
import { useInsertTask } from '@/src/hooks/task/use-insert-task';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import OrderedTestViewModal from '@/src/components/molecules/ordered-test-view-modal/ordered-test-view-modal';

type option = {
  label: string;
  value: string;
  status: string;
};

type dataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

export default function LabOrders({ data }: dataType) {
  const { control, handleSubmit, getValues, setValue } = useForm();
  const formData = getValues();
  const testArr =
    formData?.test && formData?.test.length > 0
      ? formData?.test.map((item: option) => {
          return { name: item.value, bill: 'unpaid' };
        })
      : [];

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isTestOrderModalOpen, setIsTestOrderModalOpen] = useState(false);

  const {
    getTask,
    data: orderData,
    loading,
    refetch,
  } = useGetTasks({
    task_name: 'lab_order',
    visit_id: data?.visit_id,
    // status: 'pending',
  });

  useEffect(() => {
    getTask();
  }, []);

  const tests = [
    { label: 'Complete Blood Count (CBC)', value: 'Complete Blood Count (CBC)', status: 'pending' },
    { label: 'Basic Metabolic Panel', value: 'Basic Metabolic Panel', status: 'pending' },
    { label: 'Lipid Profile', value: 'Lipid Profile', status: 'pending' },
    { label: 'Thyroid Function Tests', value: 'Thyroid Function Tests', status: 'pending' },
    { label: 'Liver Function Test (LFT)', value: 'Liver Function Test (LFT)', status: 'pending' },
    { label: 'Hemoglobin A1C', value: 'Hemoglobin A1C', status: 'pending' },
    { label: 'Blood Glucose (Fasting)', value: 'Blood Glucose Fasting', status: 'pending' },
    { label: 'Urinalysis', value: 'Urinalysis', status: 'pending' },
    { label: 'HIV 1 & 2 Antibody', value: 'HIV 1+2 Antibody', status: 'pending' },
    { label: 'Malaria Parasite Test', value: 'Malaria Parasite Test', status: 'pending' },
    { label: 'Widal Test', value: 'Widal Test', status: 'pending' },
    { label: 'Hepatitis B Surface Antigen (HBsAg)', value: 'HBsAg Test', status: 'pending' },
    { label: 'HCV Antibody', value: 'HCV Antibody Test', status: 'pending' },
    { label: 'VDRL Test (Syphilis)', value: 'VDRL Test', status: 'pending' },
    { label: 'Pregnancy Test (β-hCG)', value: 'Pregnancy Test (β-hCG)', status: 'pending' },
    { label: 'ECG', value: 'ECG', status: 'pending' },
    { label: 'Troponin I', value: 'Troponin I', status: 'pending' },
    { label: 'Prothrombin Time / INR', value: 'PT/INR', status: 'pending' },
    { label: 'Chest X-Ray', value: 'Chest X-Ray', status: 'pending' },
    { label: 'Abdominal Ultrasound', value: 'Abdominal Ultrasound', status: 'pending' },
    { label: 'Pelvic Ultrasound', value: 'Pelvic Ultrasound', status: 'pending' },
    {
      label: 'CT Scan Head(With Contrast)',
      value: 'CT Scan Head (with Contrast)',
      status: 'pending',
    },
    {
      label: 'MRI Brain (Without Contrast)',
      value: 'MRI Brain (without Contrast)',
      status: 'pending',
    },
  ];

  console.log(data);

  const priorityOptions = [
    { label: 'Routine', value: 'routine' },
    { label: 'Urgent', value: 'urgent' },
    { label: 'Stat', value: 'stat' },
  ];

  const submitValue = {
    status: 'pending',
    patient_id: data?.patient_id,
    task_name: 'lab_order',
    visit_id: data?.visit_id,
    task_data: testArr,
    priority: formData?.priority?.value ?? 'routine',
    note: formData?.notes,
  };

  const { insertTask, error } = useInsertTask({ tableName: 'tasks', columns: submitValue });

  const submitForm = async () => {
    try {
      await insertTask();
      if (!error) {
        toast.success('Lab order created successfully');
        handleIsConfirmationModalOpen();
        setValue('test', []);
        setValue('priority', []);
        setValue('notes', '');
        refetch();
      } else {
        toast.error('Error saving lab order');
      }
    } catch (err) {
      toast.error('Error saving vitals');
      console.log(err);
    }
  };

  const handleIsConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const modalDisplayValue = {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    test: testArr
      ?.map((item: any) => {
        return item.name;
      })
      .join(' , '),
    priority: formData?.priority?.value,
    notes: formData?.notes,
  };

  const renderConfirmationModal = () => {
    if (isConfirmationModalOpen) {
      return (
        <ConfirmationReviewModal
          isOpen={isConfirmationModalOpen}
          onCancel={handleIsConfirmationModalOpen}
          onConfirm={submitForm}
          title="Confirm Test Order"
          formdata={modalDisplayValue}
        />
      );
    }
  };

  const handleShowTestOrder = () => {
    setIsTestOrderModalOpen(!isTestOrderModalOpen);
  };

  const renderTestOrderModal = () => {
    if (isTestOrderModalOpen) {
      return (
        <OrderedTestViewModal
          isOpen={isTestOrderModalOpen}
          onCancel={handleShowTestOrder}
          title="Test Order"
          formdata={orderData}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {renderConfirmationModal()}
      {renderTestOrderModal()}
      <div className="">
        <Button
          value={'View test ordered'}
          onClick={handleShowTestOrder}
          loading={loading}
          disabled={orderData?.length === 0}
          className="mt-4 px-3 py-2 bg-blue-500 text-white rounded text-xs ml-auto"
        />
      </div>
      <div className="flex justify-between gap-4 items-center mt-10">
        <div className="w-[32%]">
          <SelectDropdown
            options={tests}
            name="test"
            control={control}
            label="Test"
            isMulti={true}
          />
        </div>

        <div className="w-[32%]">
          <SelectDropdown
            name="priority"
            options={priorityOptions}
            control={control}
            label="Priority"
            defaultValue={priorityOptions[0]}
          />
        </div>

        <div className="w-[32%]">
          <Input
            type="text"
            name="notes"
            label="Notes"
            placeholder="Add note"
            className="w-full px-3 py-1 rounded-lg mt-1 block p-2 border h-8 text-xs border-blue-300"
            // className="w-full px-3 py-1 rounded-lg mt-1 block border-blue-300 ring-1 ring-transparent focus:ring-blue-400 p-2 border h-8 text-xs"
            control={control}
          />
        </div>
      </div>
      {/* <Input name="Lab order" type="text" label="Laboratory Orders" control={control} /> */}
      <Button
        type="button"
        className="mt-4 px-3 py-2 bg-blue-500 text-white rounded text-xs"
        value="+ order tests"
        // disabled={watch("test")}
        onClick={handleIsConfirmationModalOpen}
      />
    </form>
  );
}
