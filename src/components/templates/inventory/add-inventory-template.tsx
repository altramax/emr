'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Input from '../../atoms/Input/input-field';
import SelectDropdown from '../../molecules/select-dropdown/select-dropdown';
import Button from '../../atoms/button/button';
import { ClipboardList } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { inputType } from '@/src/validations/inventory-schema';
import { useGetData } from '@/src/hooks/use-get-data';
import { useInsertData } from '@/src/hooks/use-insert-data';

const initialValues = {
  name: '',
  description: '',
  type: { label: '', value: '' },
  department_id: { label: '', value: '' },
  unit_price: '',
  unit_of_measure: '',
  is_billable: false,
  discountable: false,
};

export default function AddInventoryTemplate() {
  const router = useRouter();
  const { handleSubmit, getValues, control, trigger } = useForm<inputType>({
    defaultValues: initialValues,
    mode: 'all',
  });
  const [departmentOptions, setDepartmentOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const value = getValues();

  const inventoryData = {
    ...value,
    department_id: value?.department_id?.value,
    type: value?.type?.value,
  };

  const { insertData, loading } = useInsertData({ table: 'inventory', params: inventoryData });

  const { getData: getDepartments, data } = useGetData({
    table: 'departments',
    select: '*',
    from: 0,
    to: 30,
  });

  const typeOptions = [
    { label: 'Lab Test', value: 'lab_test' },
    { label: 'Medication', value: 'medication' },
    { label: 'Procedure', value: 'procedure' },
    { label: 'Consultation', value: 'consultation' },
    { label: 'Imaging', value: 'imaging' },
    { label: 'Other', value: 'other' },
  ];

  useEffect(() => {
    if (!data) {
      getDepartments();
    }
    if (data) {
      handleOptions();
    }
  }, [data]);

  const handleOptions = () => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const options = data
      ? data?.map((items: any) => {
          return {
            label: items?.name,
            value: items?.id,
            isDeactivated: items?.status !== 'active',
          };
        })
      : [];

    setDepartmentOptions(options);
  };

  const submit = async () => {
    const isValid = await trigger([
      'name',
      'description',
      'type',
      'department_id',
      'unit_price',
      'unit_of_measure',
      'is_billable',
      'discountable',
    ]);
    console.log(isValid);
    console.log(inventoryData);

    if (isValid) {
      const response = await insertData();
      if (response === 'success') {
        router.push('/admin/inventory');
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-[550px] bg-white p-6 rounded-lg shadow space-y-5"
      >
        <div className="flex items-center gap-2">
          <ClipboardList size={20} className="text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800">Add Inventory Item</h2>
        </div>

        <div>
          <Input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
            label="Name"
            name="name"
            control={control}
            placeholder="e.g. Full Blood Count"
          />
        </div>

        <div>
          <Input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
            label="Description"
            name="description"
            control={control}
            placeholder="Optional"
          />
        </div>

        <div>
          <SelectDropdown
            label="Type"
            name="type"
            control={control}
            options={typeOptions}
            placeholder="Select type"
            isSearchable={false}
          />
        </div>

        <div>
          <SelectDropdown
            label="Department"
            name="department_id"
            control={control}
            options={departmentOptions}
            placeholder="Select department"
          />
        </div>

        <div>
          <Input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
            label="Unit Price (₦)"
            control={control}
            name="unit_price"
            placeholder="0.00"
          />
        </div>

        <div>
          <Input
            label="Unit of Measure"
            control={control}
            name="unit_of_measure"
            placeholder="e.g. tablet, test"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-4 w-fit">
            <Input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
              label="Billable"
              control={control}
              name="is_billable"
              type="checkbox"
            />
          </div>

          <div className="flex items-center justify-between gap-4 w-fit">
            <Input
              className="block w-full rounded-md border-gray-300 shadow-sm p-2 border h-9 text-xs"
              label="Discountable"
              control={control}
              name="discountable"
              type="checkbox"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            value="close"
            onClick={() => router.push('/admin/inventory')}
            className="w-[100px] text-sm bg-gray-300 py-2 text-black rounded-lg hover:bg-gray-400"
          />
          <Button
            type="button"
            value="submit"
            onClick={submit}
            loading={loading}
            className="text-sm bg-blue-500 w-[100px] py-2 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
}
