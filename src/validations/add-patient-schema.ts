import * as yup from 'yup';

import { stringField, SelectSchema, DateField } from '.';

export const AddPatientSchema = yup.object({
  firstName: stringField('Firstname'),
  lastName: stringField('Lastname'),
  dateOfBirth: DateField('Date of Birth'),
  status: SelectSchema('Please select a status'),
});

export type inputType = yup.InferType<typeof AddPatientSchema>;
