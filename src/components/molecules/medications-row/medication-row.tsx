import Input from '@/src/components/atoms/Input/input-field';

type Props = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: any;
  index: number;
  onRemove: () => void;
  canRemove?: boolean;
};

export default function MedicationRow({ control, index, onRemove, canRemove }: Props) {
  const base = `medications.${index}`;

  return (
    <div className="flex justify-between gap-4 items-center mt-6">
      <div className="w-[40%]">
        <Input
          name={`${base}.Medication`}
          type="text"
          label="Medication"
          control={control}
          className="w-full text-black px-3 py-1 rounded-lg mt-1 block p-2 border h-8 text-xs border-blue-300"
        />
      </div>
      <div className="w-[20%]">
        <Input
          name={`${base}.Dosage`}
          type="text"
          label="Dosage"
          control={control}
          className="w-full text-black px-3 py-1 rounded-lg mt-1 block p-2 border h-8 text-xs border-blue-300"
        />
      </div>
      <div className="w-[20%]">
        <Input
          name={`${base}.Frequency`}
          type="text"
          label="Frequency"
          control={control}
          className="w-full text-black px-3 py-1 rounded-lg mt-1 block p-2 border h-8 text-xs border-blue-300"
        />
      </div>
      <div className="w-[20%]">
        <Input
          name={`${base}.Duration`}
          type="text"
          label="Duration"
          control={control}
          className="w-full text-black px-3 py-1 rounded-lg mt-1 block p-2 border h-8 text-xs border-blue-300"
        />
      </div>
      <div className="w-[32%]">
        <Input
          name={`${base}.Instructions`}
          type="text"
          label="Instructions"
          control={control}
          className="w-full text-black px-3 py-1 rounded-lg mt-1 block p-2 border h-8 text-xs border-blue-300"
        />
      </div>
      {canRemove && (
        <div className="flex items-end">
          <button type="button" onClick={onRemove} className="text-xs text-red-600 underline">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
