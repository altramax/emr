import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type SigninInputs = yup.InferType<typeof LoginSchema>;
