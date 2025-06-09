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
        toast.success('Signin Successful');
        router.replace('/dashboard');
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
      className="bg-cyan-700 rounded-lg flex flex-col items-start justify-start gap-5 p-10"
    >
      <h1 className="text-white text-center w-full my-2 text-2xl font-semibold">
        Lily Hospital M.S
      </h1>

      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <InputField
          id="email"
          type="text"
          name="email"
          placeholder="Enter your email"
          className="w-[400px] px-4 py-2 rounded-lg outline-none border-none"
          control={control}
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <InputField
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-[400px] px-4 py-2 rounded-lg outline-none border-none"
          control={control}
        />
      </div>

      <Button
        value="Signin"
        type="submit"
        className="bg-white text-black hover:bg-cyan-300 hover:text-white font-medium text-sm text-center no-underline px-4 py-2 rounded-2xl mt-2 mx-auto w-[30%]"
      />
    </form>
  );
}
