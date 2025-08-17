import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import { useForm } from 'react-hook-form';
import Textarea from '@/src/components/atoms/TextArea/text-area';
import Button from '@/src/components/atoms/button/button';
import { useState, useEffect } from 'react';
import ConfirmationReviewModal from '@/src/components/molecules/confirmation-review-modal/confirmation-review-modal';
import { toast } from 'react-toastify';
import { useInsertTask } from '@/src/hooks/task/use-insert-task';
// import OrderedTestViewModal from '@/src/components/molecules/ordered-test-view-modal/ordered-test-view-modal';
import { useGetDepartments } from '@/src/hooks/departments/use-get-departments';
import { useQueryInventory } from '@/src/hooks/inventory/use-query-inventory';
import SelectDropdownAsync from '@/src/components/molecules/select-dropdown-async/select-dropdown-async';

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
  const [search, setSearch] = useState<string | undefined>('');
  const formData = getValues();
  const testArr =
    formData?.test && formData?.test.length > 0
      ? formData?.test.map((item: option) => {
          return { name: item.value, bill: 'unpaid' };
        })
      : [];

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { getDepartments, data: departmentData } = useGetDepartments({
    select: '*',
    departmentName: 'Laboratory',
  });

  const { queryInventory, data: inventoryData } = useQueryInventory({
    select: '*',
    department_id: departmentData?.[0]?.id,
    name: search,
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

  return (
    <form onSubmit={handleSubmit(submitForm)} className="">
      {renderConfirmationModal()}
      <div className="flex justify-center items-center gap-5 mb-4 mt-4">
        <div className="w-[60%] space-y-5">
          <div className="">
            <SelectDropdownAsync
              // options={tests}
              searchTerm={setSearch}
              data={inventoryData}
              name="test"
              control={control}
              label="Test"
              isMulti={true}
              className="w-[50%]"
            />
          </div>

          <div className="w-full">
            <Textarea
              name="notes"
              label="Clinical note"
              placeholder="Add note"
              className="w-full p-2 rounded-lg mt-1 block text-black border text-xs border-blue-300"
              // className="w-full px-3 py-1 rounded-lg mt-1 block border-blue-300 ring-1 ring-transparent focus:ring-blue-400 p-2 border h-8 text-xs"
              control={control}
              rows={5}
            />
          </div>
          <div className="w-[250px]">
            <SelectDropdown
              name="priority"
              options={priorityOptions}
              control={control}
              label="Priority"
              // defaultValue={priorityOptions[0]}
            />
          </div>

          {/* <Input name="Lab order" type="text" label="Laboratory Orders" control={control} /> */}
          <div className="flex justify-center  mt-4 w-full">
            <Button
              type="button"
              className="mt-4 px-3 py-2 bg-blue-500 text-white rounded text-xs w-[300px]"
              value="Submit order"
              // disabled={watch("test")}
              onClick={handleIsConfirmationModalOpen}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
