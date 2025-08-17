'use client';

import { useForm } from 'react-hook-form';
import Button from '@/src/components/atoms/button/button';
// import MedicationRow from '@/src/components/molecules/medications-row/medication-row';
// import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ConfirmationReviewModalMedsOrder from '@/src/components/molecules/confirmation-review-modal-meds-order/confirmation-review-modal-meds-order';
import SelectDropdownAsync from '@/src/components/molecules/select-dropdown-async/select-dropdown-async';
import { useQueryInventory } from '@/src/hooks/inventory/use-query-inventory';
import { useGetDepartments } from '@/src/hooks/departments/use-get-departments';

export default function Medications() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      medicine: { label: '', value: '' },
    },
  });

  const { getDepartments, data: departmentData } = useGetDepartments({
    select: '*',
    departmentName: 'Pharmacy',
  });

  const { queryInventory, data } = useQueryInventory({
    select: '*',
    department_id: departmentData?.[0]?.id,
    name: search,
  });

  useEffect(() => {
    if (departmentData?.[0]?.id) return;
    getDepartments();
  }, []);

  useEffect(() => {
    if (search?.length === 0) return;
    queryInventory();
  }, [search]);

  // const formData = getValues();

  // const submitValue = formData?.medications;

  const submitForm = () => {
    // console.log(submitValue);
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
          formdata={search}
        />
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white rounded-md shadow-sm p-4 space-y-6"
    >
      {renderConfirmationModal()}

      <SelectDropdownAsync
        data={data}
        placeholder="Search for medicine"
        className=""
        name="medicine"
        control={control}
        isMulti={true}
        searchTerm={setSearch}
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
