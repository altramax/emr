import * as yup from 'yup';

const stringField = (fieldName: string) => yup.string().required(fieldName);

export const addVitalsSchema = yup.object({
  heartRate: stringField('Heart rate'),
  systolic: stringField('Systolic'),
  diastolic: stringField('Diastolic'),
  temperature: stringField('Temperature'),
  respiration: stringField('Respiration'),
  oxygenSaturation: stringField('Oxygen Saturation'),
  height: stringField('Height'),
  weight: stringField('Weight'),
});

export type inputType = yup.InferType<typeof addVitalsSchema>;
