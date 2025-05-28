import * as yup from 'yup';

import { stringField, SelectSchema, DateField, phoneNumberFieldValidation, emailField } from '.';

export const NewPatientSchema = yup.object({
  first_name: stringField('First name'),
  last_name: stringField('Last name'),
  date_of_birth: DateField('Date of Birth'),
  gender: SelectSchema('Please select a gender'),
  marital_status: SelectSchema('Please select a marital status'),
  occupation: stringField('Occupation'),
  blood_group: SelectSchema('Please select a blood group').nullable(),
  genotype: SelectSchema('Please select a genotype').nullable(),
  allergies: stringField('Allergies').nullable(),
  existing_conditions: stringField('Existing Medical Conditions').nullable(),
  current_medications: stringField('Current Medications').nullable(),
  email: emailField('Email'),
  phone_number: phoneNumberFieldValidation('Phone Number'),
  status: SelectSchema('Please select a status'),
  religion: stringField('Religion').nullable(),
  address: stringField('Address'),
  emergency_contact_name: stringField('Emergency Contact Name'),
  emergency_contact_number: phoneNumberFieldValidation('Emergency Contact Number'),
  emergency_contact_relationship: stringField('Emergency Contact Relationship'),
});

export type inputType = yup.InferType<typeof NewPatientSchema>;
