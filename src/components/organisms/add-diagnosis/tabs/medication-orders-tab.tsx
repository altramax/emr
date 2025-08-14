'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import Button from '@/src/components/atoms/button/button';
import MedicationRow from '@/src/components/molecules/medications-row/medication-row';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ConfirmationReviewModalMedsOrder from '@/src/components/molecules/confirmation-review-modal-meds-order/confirmation-review-modal-meds-order';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';

export default function Medications() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      medications: [{ Medication: '', Dosage: '', Frequency: '', Duration: '', Instructions: '' }],
    },
  });
  const [count, setCount] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  });

  const appendRowsByCount = () => {
    if (isNaN(count) || count < 1 || count > 20) {
      toast.error('Please enter a valid number greater than 0 and less than 20');
      return;
    }

    const rows = Array.from({ length: count }, () => ({
      Medication: '',
      Dosage: '',
      Frequency: '',
      Duration: '',
      Instructions: '',
    }));

    append(rows);
  };

  const formData = getValues();

  const submitValue = formData?.medications;

  const submitForm = () => {
    console.log(submitValue);
  };

  const handleIsConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const renderConfirmationModal = () => {
    if (isConfirmationModalOpen) {
      return (
        <ConfirmationReviewModalMedsOrder
          isOpen={isConfirmationModalOpen}
          onCancel={handleIsConfirmationModalOpen}
          onConfirm={submitForm}
          title="Confirm Test Order"
          formdata={submitValue}
        />
      );
    }
  };

  const options = [
    { value: '1', label: '14 tab' },
    { value: '2', label: '21 tab' },
    { value: '3', label: '32 tab' },
    { value: '4', label: '43 tab' },
  ];

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white rounded-md shadow-sm p-4 space-y-6"
    >
      {renderConfirmationModal()}
      <div className="flex justify-end items-center gap-2">
        <input
          type="number"
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-[10%] text-black px-3 py-1 rounded-lg block p-2 border h-8 text-xs border-blue-300"
        />
        <button
          type="button"
          onClick={appendRowsByCount}
          className={`px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 text-xs ${count < 1 || count > 20 ? 'opacity-50' : ''}`}
          disabled={count < 1 || count > 20}
        >
          + Add rows
        </button>
      </div>

      {fields.map((field, index) => (
        <MedicationRow
          key={field.id}
          control={control}
          index={index}
          onRemove={() => remove(index)}
          canRemove={fields.length > 1}
        />
      ))}

      <SelectDropdown
        options={options}
        placeholder="Select number of tabs"
        className="mt-4"
        label="Number of tabs"
        name="number_of_tabs"
        control={control}
      />

      <Button
        type="button"
        onClick={handleIsConfirmationModalOpen}
        className="mt-4 px-3 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 text-xs"
        value="Prescribe Medication"
      />
    </form>
  );
}
