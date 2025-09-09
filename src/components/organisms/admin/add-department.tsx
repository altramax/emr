'use client';

import { useForm } from 'react-hook-form';
import Button from '@/src/components/atoms/button/button';
import { useInsertData } from '@/src/hooks/use-insert-data';
import Input from '../../atoms/Input/input-field';
import { toast } from 'react-toastify';

type FormValues = {
  name: string;
  description: string;
};

type departmentType = {
  onclose: () => void;
  refetch: () => void;
};

export default function AddDepartmentModal({ onclose, refetch }: departmentType) {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const values = watch();

  const { insertData: insertDepartment, loading } = useInsertData({
    table: 'departments',
    params: { name: values?.name, description: values?.description },
  });

  const submit = async (data: FormValues) => {
    if (!data?.name || !data?.description) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const res = await insertDepartment();
      if (res === 'success') {
        toast.success('Department added successfully');
        refetch();
        onclose();
      }
    } catch (err) {
      toast.error('Error adding department');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg  w-[600px] relative">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-base font-semibold text-gray-700">Add Department</h2>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4 flex flex-col px-6 py-6">
          <div className="">
            <Input
              name="name"
              label="Name"
              placeholder="Enter Department Name"
              control={control}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
            />
          </div>

          <div className="">
            <Input
              name="description"
              label="Description"
              placeholder="Enter Department Description"
              control={control}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border h-9 text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={onclose}
              className="px-4 py-2 text-xs rounded-md border bg-red-500 text-white font-medium"
              value="Cancel"
            />

            <Button
              type="submit"
              loading={loading}
              disabled={loading || values?.name?.length < 3 || values?.description?.length < 3}
              value="Create department"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs rounded-md font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
