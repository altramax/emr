import {
  BasicMetabolicPanelForm,
  CompleteBloodCountForm,
  LipidPanelForm,
  ThyroidTestForm,
  LiverTestForm,
  UrinalysisForm,
  ChestXrayForm,
  ECGForm,
  BloodGlucoseForm,
  HemoglobinA1CForm,
} from '@/src/utils/lab-test-form-data';
import Input from '@/src/components/atoms/Input/input-field';

type formtype = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  form: any;
};

const formsObj: any = {
  completebloodcount: CompleteBloodCountForm,
  basicmetabolicpanel: BasicMetabolicPanelForm,
  lipidpanel: LipidPanelForm,
  thyroidtests: ThyroidTestForm,
  livertests: LiverTestForm,
  urinalysis: UrinalysisForm,
  chestxray: ChestXrayForm,
  ecg: ECGForm,
  bloodglucose: BloodGlucoseForm,
  hba1c: HemoglobinA1CForm,
};

const RenderForm = ({ control, form }: formtype) => {
  const switchLabOrderForm = formsObj[form] ?? [];

  return (
    <>
      {switchLabOrderForm.map((item: { name: string; unit: string }) => (
        <div key={`${item.name}`} className="space-y-1 text-xs">
          <Input
            label={`${item.name} ${item.unit ? item.unit : ''}`}
            name={item.name}
            type="text"
            control={control}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 "
          />
        </div>
      ))}
    </>
  );
};

export default RenderForm;
