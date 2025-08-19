import Button from '@/src/components/atoms/button/button';
import InputField from '@/src/components/atoms/Input/input-field';
import { useForm } from 'react-hook-form';
import { useRouter, usePathname } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { setPasswordSchema, SigninInputs } from '@/src/validations/set-password';
import { Eye, EyeOff } from 'lucide-react';
import { UseUpdateUser } from '@/src/hooks/user/update-user';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import { createClient } from '@/src/utils/supabase/client';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function PasswordForm() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hash = pathname.split('#')[1];
  const params = new URLSearchParams(hash);
  const obj = Object.fromEntries(params.entries());
  const access_token = obj.access_token;
  const refresh_token = obj.refresh_token;

  useEffect(() => {
    if (access_token && refresh_token) {
      verifySession();
    } else {
      toast.error('Invalid or expired access token');
      router.replace('/signin');
    }
  }, [access_token, refresh_token]);

  const verifySession = async () => {
    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      console.error('Failed to set session', error);
      router.replace('/signin');
      return;
    }
    setIsLoading(false);
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [isPasswordVisible, setIsPasswordVisible] = useState<any>({
    password: false,
    confirmPassword: false,
  });

  const { control, watch } = useForm<SigninInputs>({
    resolver: yupResolver(setPasswordSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const password = watch('password');

  const { updateUser, loading, error } = UseUpdateUser({ password: password });

  const submitForm = async () => {
    try {
      updateUser();
      if (error) {
        toast.error(error.message);
        return;
      } else {
        router.replace('/dashboard');
        toast.success('Signin Successful');
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const handlePasswordVisibility = (e: string) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [e]: !isPasswordVisible[e],
    });
  };

  if (loading || isLoading) return <Loading />;

  return (
    <div className="bg-slate-300 rounded-lg flex flex-col items-start justify-start gap-5 px-10 py-5 text-black">
      <div className="text-center w-full text-xl font-bold flex items-center justify-center gap-2 text-blue-800">
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

      <div className="text-xs flex flex-col items-start justify-start gap-1 relative">
        <label htmlFor="email" className="">
          New Password
        </label>
        <InputField
          id="password"
          type={isPasswordVisible.password ? 'text' : 'password'}
          name="password"
          placeholder="Enter your email"
          className="w-[300px] px-2 py-2 rounded-md outline-none border-none"
          control={control}
        />

        <button
          className="absolute right-3 top-6 flex items-center justify-center w-fit h-fit"
          onClick={() => handlePasswordVisibility('password')}
        >
          {isPasswordVisible.password ? (
            <EyeOff size={24} className="text-blue-500" />
          ) : (
            <Eye size={24} className="text-blue-500" />
          )}
        </button>
      </div>

      <div className="text-xs flex flex-col items-start justify-start gap-1 relative">
        <label htmlFor="password" className="">
          Confirm Password
        </label>
        <InputField
          id="confirmPassword"
          type={isPasswordVisible.confirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Enter your password"
          className="w-[300px] px-2 py-2 rounded-md outline-none border-none"
          control={control}
        />
        <button
          className="absolute right-3 top-6 flex items-center justify-center w-fit h-fit"
          onClick={() => handlePasswordVisibility('confirmPassword')}
        >
          {isPasswordVisible.confirmPassword ? (
            <EyeOff size={24} className="text-blue-500" />
          ) : (
            <Eye size={24} className="text-blue-500" />
          )}
        </button>
      </div>

      <Button
        value="Submit"
        type="submit"
        onClick={submitForm}
        className="bg-white text-black hover:bg-gray-600 hover:text-white font-medium text-xs text-center no-underline px-4 py-1 rounded-md mt-2 mx-auto w-[30%]"
        loading={loading}
      />
    </div>
  );
}
