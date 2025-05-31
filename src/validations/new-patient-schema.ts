import * as yup from 'yup';

import { stringField, SelectSchema, DateField, phoneNumberFieldValidation, emailField } from '.';

export const NewPatientSchema = yup.object({
  first_name: stringField('First name'),
  last_name: stringField('Last name'),
  date_of_birth: DateField('Date of Birth'),
  gender: SelectSchema('Please select a gender'),
  marital_status: SelectSchema('Please select a marital status'),
  occupation: stringField('Occupation'),
  email: emailField('Email'),
  phone_number: phoneNumberFieldValidation('Phone Number'),
  religion: stringField('Religion').nullable(),
  address: stringField('Address'),
  emergency_contact_name: stringField('Emergency Contact Name'),
  emergency_contact_number: phoneNumberFieldValidation('Emergency Contact Number'),
  emergency_contact_relationship: stringField('Emergency Contact Relationship'),
});

export type inputType = yup.InferType<typeof NewPatientSchema>;
