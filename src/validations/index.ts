import * as yup from 'yup';

interface NumberValidationOptions {
  fieldName?: string;
  min?: number;
  max?: number;
  required?: boolean;
  allowDecimals?: boolean;
}

export const phoneNumberField = (fieldName: string = 'Phone number') =>
  yup
    .string()
    .required(`${fieldName} is required`)
    .min(13, `${fieldName} must be 11 digits`)
    .matches(/^234(?!0)\d{10}$/, {
      message: `${fieldName} should be 13 digits and not contain a '0' after '234'`,
      excludeEmptyString: true,
    });

export const phoneNumberFieldValidation = (fieldName: string = 'Phone number') =>
  yup
    .string()
    .required(`${fieldName} is required`)
    .transform((value) => value.replace(/\s/g, ''))
    .length(11, `${fieldName} must be exactly 11 digits`)
    .matches(/^\d{11}$/, {
      message: `${fieldName} should contain only digits`,
      excludeEmptyString: true,
    });

export const stringField = (fieldName: string) => yup.string().required(`${fieldName} is required`);

export const NumberField = (fieldName: string) => yup.number().required(`${fieldName} is required`);

export const DateField = (fieldName: string) =>
  yup.date().nullable().required(`${fieldName} is required`);

export const emailField = (fieldName = 'Email') =>
  yup.string().email(`${fieldName} must be a valid email`).required(`${fieldName} is required`);

export const SelectSchema = (message = 'Please select at least one option') =>
  yup
    .object({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .test('is-valid', message, (val) => {
      if (!val) return false;
      return Boolean(val.label && val.value);
    });

export const UserSchema = yup
  .array()
  .of(
    yup.object({
      label: yup.string().required(),
      value: yup.string().required(),
      status: yup.string(),
    })
  )
  .test('required', 'Please select a user', (arr) => Array.isArray(arr) && arr.length > 0)
  .nullable();

export const ArraySchema = (message: string = 'Please select at least one option') =>
  yup
    .array()
    .of(
      yup.object({
        label: yup.string().required(),
        value: yup.string().required(),
        status: yup.string().optional(),
      })
    )
    .test('required', `${message}`, (arr) => Array.isArray(arr) && arr.length > 0)
    .nullable();

export const ArraySchemaOptional = () =>
  yup
    .array()
    .of(
      yup.object({
        label: yup.string(),
        value: yup.string(),
        status: yup.string(),
      })
    )
    .nullable();

export const LoanAmount = () =>
  yup
    .string()
    .required('Amount is required')
    .test('is-valid-number', 'Amount must be a number between 1,000 and 99,999,999.99', (value) => {
      if (!value) return false;
      const numberValue = Number(value);
      return !isNaN(numberValue) && numberValue >= 1000 && numberValue <= 99999999.99;
    });

export const DepositAmount = () =>
  yup
    .string()
    .required('Amount is required')
    .test('is-valid-number', 'Amount must be a number between 1,000 and 99,999,999.99', (value) => {
      if (!value) return false; // Handle the required case
      const numberValue = Number(value);
      return !isNaN(numberValue) && numberValue >= 1000 && numberValue <= 99999999.99;
    });

export const createNumberValidator = ({
  fieldName = 'Amount',
  min = 0,
  max = Infinity,
  required = true,
  allowDecimals = false,
}: NumberValidationOptions = {}) => {
  let validator = yup.string();

  if (required) {
    validator = validator.required(`${fieldName} is required`);
  }

  return validator.test(
    'is-valid-number',
    `${fieldName} must be a number between ${min.toLocaleString()} and ${max.toLocaleString()}${allowDecimals ? ' with maximum 2 decimal places' : ''}`,
    (value) => {
      if (!value) return !required;

      const numberValue = Number(value);

      if (isNaN(numberValue)) return false;
      if (numberValue < min || numberValue > max) return false;

      if (allowDecimals) {
        const decimalStr = value.toString().split('.')[1] || '';
        if (decimalStr.length > 2) return false;
      } else {
        if (!Number.isInteger(numberValue)) return false;
      }

      return true;
    }
  );
};
