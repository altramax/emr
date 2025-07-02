import {
  BasicMetabolicPanelForm,
  CompleteBloodCountForm,
  LipidProfileForm,
  ThyroidTestForm,
  LiverTestForm,
  UrinalysisForm,
  ChestXrayForm,
  ECGForm,
  BloodGlucoseForm,
  HemoglobinA1CForm,
  HIVAntibodyForm,
  MalariaParasiteForm,
  WidalTestForm,
  HBsAgTestForm,
  HCVAntibodyForm,
  VDRLTestForm,
  PregnancyTestForm,
  ProlactinForm,
  TroponinITestForm,
  DDimerForm,
  PTINRForm,
  AbdominalUltrasoundForm,
  PelvicUltrasoundForm,
  CTScanHeadForm,
  MRIBrainForm,
} from '@/src/utils/lab-test-form-data';
import Input from '@/src/components/atoms/Input/input-field';
import { useEffect } from 'react';

type formtype = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  form: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  initialValue: any;
  setValue: any;
  disabled?: boolean;
};

const formsObj: any = {
  'completebloodcount(cbc)': CompleteBloodCountForm,
  basicmetabolicpanel: BasicMetabolicPanelForm,
  lipidprofile: LipidProfileForm,
  thyroidfunctiontests: ThyroidTestForm,
  'liverfunctiontest(lft)': LiverTestForm,
  urinalysis: UrinalysisForm,
  'chestx-ray': ChestXrayForm,
  ecg: ECGForm,
  bloodglucosefasting: BloodGlucoseForm,
  hemoglobina1c: HemoglobinA1CForm,
  'hiv1+2antibody': HIVAntibodyForm,
  malariaparasitetest: MalariaParasiteForm,
  widaltest: WidalTestForm,
  hbsagtest: HBsAgTestForm,
  hcvantibodytest: HCVAntibodyForm,
  vdrltest: VDRLTestForm,
  'pregnancytest(β-hcg)': PregnancyTestForm,
  prolactin: ProlactinForm,
  troponini: TroponinITestForm,
  'd-dimer': DDimerForm,
  'pt/inr': PTINRForm,
  abdominalultrasound: AbdominalUltrasoundForm,
  pelvicultrasound: PelvicUltrasoundForm,
  'ctscanhead(withcontrast)': CTScanHeadForm,
  'mribrain(withoutcontrast)': MRIBrainForm,
};

const RenderForm = ({ control, form, initialValue, setValue, disabled }: formtype) => {
  const switchLabOrderForm = formsObj[form] ?? [];

  useEffect(() => {
    if (initialValue) {
      switchLabOrderForm.forEach((item: { name: string; unit: string }) => {
        const value = initialValue[item.name];
        if (value) {
          setValue(item.name, value);
        }
      });
    }
  }, [initialValue, switchLabOrderForm, setValue]);

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
            disabled={disabled}
          />
        </div>
      ))}
    </>
  );
};

export default RenderForm;
