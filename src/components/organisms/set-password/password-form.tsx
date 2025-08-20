import Button from '@/src/components/atoms/button/button';
import InputField from '@/src/components/atoms/Input/input-field';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { setPasswordSchema, SigninInputs } from '@/src/validations/set-password';
import { Eye, EyeOff } from 'lucide-react';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import { createClient } from '@/src/utils/supabase/client';
import { setPasswordAction } from '@/src/actions/actions';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function PasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const processInviteToken = async () => {
      // Get hash parameters from URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (type === 'invite' && accessToken) {
        try {
          // Set the session using the tokens from the URL
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (error) {
            console.error('Error setting session:', error);
            toast.error('Failed to set session: ' + error.message);
            return;
          }

          toast.success('Session established. Please set your password.');

          /* eslint-disable  @typescript-eslint/no-explicit-any */
        } catch (error: any) {
          console.error('Error setting session:', error);
          toast.error('Failed to set session: ' + error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    processInviteToken();
  }, []);

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

  const submitForm = async () => {
    const res = await setPasswordAction(password);
    if (res?.response === 'success') {
      router.replace('/dashboard');
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handlePasswordVisibility = (e: string) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [e]: !isPasswordVisible[e],
    });
  };

  if (isLoading) return <Loading />;

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
        className=" text-black bg-gray-600 font-medium text-xs text-center no-underline px-4 py-1 rounded-md mt-2 mx-auto w-[30%]"
        // loading={loading}
      />
    </div>
  );
}
