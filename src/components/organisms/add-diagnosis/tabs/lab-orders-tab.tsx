import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Input from '@/src/components/atoms/Input/input-field';
import Button from '@/src/components/atoms/button/button';
import { useState, useEffect } from 'react';
import ConfirmationReviewModal from '@/src/components/molecules/confirmation-review-modal/confirmation-review-modal';
import { toast } from 'react-toastify';
import { useInsertTask } from '@/src/hooks/task/use-insert-task';
import { useGetTasks } from '@/src/hooks/task/use-get-tasks';
import ViewModal from '@/src/components/molecules/view-modal/view-modal';

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
      ? formData?.test.map((item: option) => item.value)
      : [];

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isTestOrderModalOpen, setIsTestOrderModalOpen] = useState(false);

  const {
    getTask,
    data: orderData,
    loading,
    refetch,
  } = useGetTasks({
    select: '*',
    task_name: 'lab_order',
    visit_id: data?.visit_id,
    // status: 'pending',
  });

  useEffect(() => {
    getTask();
  }, []);

  const tests = [
    { label: 'Complete Blood Count', value: 'Complete blood count', status: 'pending' },
    { label: 'Basic Metabolic Panel ', value: 'Basic metabolic panel', status: 'pending' },
    { label: 'Lipid Panel', value: 'Lipid panel', status: 'pending' },
    { label: 'Thyroid Function Tests', value: 'Thyroid tests', status: 'pending' },
    { label: 'Liver Function Tests', value: 'Liver tests', status: 'pending' },
    { label: 'Urinalysis', value: 'Urinalysis', status: 'pending' },
    { label: 'Chest X-Ray', value: 'Chest xray', status: 'pending' },
    { label: 'ECG', value: 'ECG', status: 'pending' },
    { label: 'Blood Glucose', value: 'Blood glucose', status: 'pending' },
    { label: 'Hemoglobin A1C', value: 'Hemoglobin A1C', status: 'pending' },
  ];

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
    test: testArr.join(' , '),
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
        <ViewModal
          isOpen={isTestOrderModalOpen}
          onCancel={handleShowTestOrder}
          title="Test Order"
          formdata={orderData}
        />
      );
    }
  };

  console.log(testArr);

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
