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
      if (res?.response === 'error') {
        toast.error(res.message);
        return;
      }
      if (res?.response === 'success') {
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
      <div className="text-center w-full text-xl font-bold flex items-center justify-center gap-2">
        <div className="w-fit mt-[-10px]">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.24 23.84c-.04 0-.04 0-.08 0-.4-.04-.72-.36-.76-.76l-1-9.96-.88 2.72c-.12.36-.44.56-.8.56H.84A.83.83 0 0 1 0 15.6c0-.44.36-.84.84-.84h5.32l1.92-6c.12-.36.48-.6.88-.56s.68.36.72.76l.96 9.72 2.04-6.96c.12-.36.4-.6.8-.6.36 0 .68.28.8.64l1.12 4.84.84-1.24c.16-.24.4-.36.68-.36h5.28c.44 0 .84.36.84.84s-.36.84-.84.84h-4.84l-1.64 2.44c-.2.28-.52.4-.84.36s-.6-.32-.64-.64l-.84-3.6-2.36 8.08c-.12.28-.44.52-.8.52z"
              fill="#1E40AF"
            />
          </svg>
        </div>
        Lily Healthcare
      </div>

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
