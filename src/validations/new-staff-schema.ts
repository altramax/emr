import * as yup from 'yup';

import { stringField, SelectSchema, phoneNumberFieldValidation, emailField } from '.';

export const NewStaffSchema = yup.object({
  // Identity
  first_name: stringField('First name'),
  last_name: stringField('Last name'),
  other_names: stringField('Other names').nullable(),
  gender: SelectSchema('Please select a gender'),
  date_of_birth: stringField('Date of Birth'),
  nationality: stringField('Nationality'),
  marital_status: SelectSchema('Please select a marital status'),

  // Contact
  email: emailField('Email'),
  phone_number: phoneNumberFieldValidation('Phone Number'),
  address: stringField('Address'),

  // Employment Info
  role: SelectSchema('Please select a role'),
  department: SelectSchema('Department'),
  job_title: stringField('Job Title'),
  employment_type: SelectSchema('Please select employment type'),
  date_hired: stringField('Date Hired'),

  // Emergency Contact
  emergency_contact_name: stringField('Emergency Contact Name'),
  emergency_contact_number: phoneNumberFieldValidation('Emergency Contact Number'),
  emergency_contact_relationship: stringField('Emergency Contact Relationship'),
});

export type InputType = yup.InferType<typeof NewStaffSchema>;
