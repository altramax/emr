import * as yup from 'yup';

import { stringField, SelectSchema } from '.';

export const InventorySchema = yup.object().shape({
  name: stringField('Name'),
  description: stringField('Description'),
  type: SelectSchema('Please select a type'),
  department_id: SelectSchema('Please select a department'),
  unit_price: stringField('Unit Price'),
  unit_of_measure: stringField('Unit of Measure'),
  is_billable: yup.boolean().required('Billable is required'),
  discountable: yup.boolean().required('Discountable is required'),
});

export type inputType = yup.InferType<typeof InventorySchema>;
