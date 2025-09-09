import { signOutAction } from '@/src/actions/actions';
import { useRouter } from 'next/navigation';
import { useVitalsAlertStore } from '@/src/store/vitals-alert-store';
import { toast } from 'react-toastify';
import { useUserStore } from '@/src/store/user-store';

export const Logout = () => {
  const router = useRouter();
  const vital = useVitalsAlertStore((state) => state);
  const { clearUser } = useUserStore();

  const signOut = async () => {
    try {
      const res = await signOutAction();
      if (res === 'success') {
        vital?.clear();
        vital?.setCalled(false);
        router.replace('/signin');
        clearUser();
        toast.success('Successfully logged out');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { signOut };
};
