import Button from '@/src/components/atoms/button/button';
import InputField from '@/src/components/atoms/Input/input-field';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signInAction } from '@/src/actions/actions';
import { SigninInputs, LoginSchema } from '@/src/validations/login-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useUser } from '@/src/hooks/user/user';
import { useEffect } from 'react';

const initialValues = {
  email: '',
  password: '',
};

export default function AuthForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<SigninInputs>({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const submitForm = async (data: SigninInputs) => {
    const form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);

    try {
      const res = await signInAction(form);
      if (res === 'success') {
        router.replace('/dashboard');
        toast.success('Signin Successful');
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const { user, getRole } = useUser();

  useEffect(() => {
    getRole();
  }, []);
  console.log(user);

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-slate-300 rounded-lg flex flex-col items-start justify-start gap-5 px-10 py-5 text-black"
    >
      <h1 className=" text-center w-full text-xl font-bold">Lily Health Care</h1>

      <div className="text-xs flex flex-col items-start justify-start gap-1">
        <label htmlFor="email" className="">
          Email
        </label>
        <InputField
          id="email"
          type="text"
          name="email"
          placeholder="Enter your email"
          className="w-[300px] px-2 py-2 rounded-md outline-none border-none"
          control={control}
        />
      </div>

      <div className="text-xs flex flex-col items-start justify-start gap-1">
        <label htmlFor="password" className="">
          Password
        </label>
        <InputField
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-[300px] px-2 py-2 rounded-md outline-none border-none"
          control={control}
        />
      </div>

      <Button
        value="Signin"
        type="submit"
        className="bg-white text-black hover:bg-gray-600 hover:text-white font-medium text-xs text-center no-underline px-4 py-1 rounded-md mt-2 mx-auto w-[30%]"
      />
    </form>
  );
}
