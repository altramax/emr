'use client';

import { useForm } from 'react-hook-form';
import Button from '@/src/components/atoms/button/button';
import { useEffect, useState } from 'react';
import ConfirmationReviewModalMedsOrder from '@/src/components/molecules/confirmation-review-modal-meds-order/confirmation-review-modal-meds-order';
import SelectDropdownAsync from '@/src/components/molecules/select-dropdown-async/select-dropdown-async';
import Textarea from '@/src/components/atoms/TextArea/text-area';
import { useQueryData } from '@/src/hooks/use-query-data';
import { useGetData } from '@/src/hooks/use-get-data';
import { toast } from 'react-toastify';
import { useInsertData } from '@/src/hooks/use-insert-data';

type option = {
  label: string;
  value: string;
};

type dataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

export default function Medications({ data }: dataType) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [search, setSearch] = useState<string | undefined>('');
  const { control, handleSubmit, watch, setValue } = useForm({});

  const medicine = watch('medicine');
  const instructions = watch('instructions');

  const { getData: getDepartments, data: departmentData } = useGetData({
    table: 'departments',
    params: [{ column: 'name', value: 'Pharmacy' }],
  });

  const { queryData: queryInventory, data: inventoryData } = useQueryData({
    table: 'inventory',
    select: '*',
    params: [
      {
        column: 'department_id',
        value: departmentData?.[0]?.id,
      },
    ],
    singleName: search,
  });

  useEffect(() => {
    if (departmentData?.[0]?.id) return;
    getDepartments();
  }, []);

  useEffect(() => {
    if (!departmentData?.[0]?.id) {
      return;
    }
    queryInventory();
  }, [search]);

  const testArr =
    medicine?.length > 0
      ? medicine?.map((item: option) => {
          return { name: item.value, bill: 'unpaid' };
        })
      : [];

  const submitValue = {
    status: 'pending',
    patient_id: data?.patient_id,
    task_name: 'medication_order',
    visit_id: data?.visit_id,
    task_data: testArr,
    note: instructions,
  };

  const { insertData: insertTask } = useInsertData({ table: 'tasks', params: submitValue });

  const submitForm = async () => {
    try {
      const res = await insertTask();
      if (res === 'success') {
        toast.success('Medication order created successfully');
        handleIsConfirmationModalOpen();
        setValue('medicine', []);
        setValue('instructions', '');
      } else {
        toast.error('Error saving medication order');
      }
    } catch (err) {
      toast.error('Error saving medication order');
      console.log(err);
    }
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
          title="Confirm Medication"
          formdata={{ medicine: medicine, instructions: instructions }}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="bg-white p-4">
      {renderConfirmationModal()}
      <div className="flex items-center justify-center gap-4">
        <div>
          <SelectDropdownAsync
            label="Select medicine"
            data={inventoryData}
            placeholder="Search for medicine"
            className=""
            name="medicine"
            control={control}
            isMulti={true}
            searchTerm={setSearch}
            width="w-[400px]"
          />
          <div className="w-full mt-6">
            <Textarea
              name="instructions"
              label="instructions"
              control={control}
              className="w-full text-black px-3 py-1 rounded-lg border text-xs border-blue-300"
            />
          </div>

          <Button
            type="button"
            onClick={handleIsConfirmationModalOpen}
            className={`mt-4 px-3 py-2 bg-blue-500 text-white rounded text-xs m-auto`}
            value="Prescribe Medication"
            disabled={!medicine?.length}
          />
        </div>

        {/* <div className="min-h-[300px] bg-gray-300 w-0.5 "></div>
        <div className="bg-gray-50 rounded-lg p-4 w-full min-h-[270px]">
          <h2 className="text-sm text-blue-500 font-bold mb-4 text-center">Selected Medicine</h2>
          {medicine
            ? medicine.map((item: { label: string; value: string }, index: number) => (
                <p key={index + item.label} className="text-xs text-blue-500 mb-2">
                  {index + 1}. {item.label}
                </p>
              ))
            : null}
        </div> */}
      </div>
    </form>
  );
}
