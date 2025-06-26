import { signOutAction } from '@/src/actions/actions';
import { useRouter } from 'next/navigation';
import { useVitalsAlertStore } from '@/src/store/vitals-alert-store';
import { useDiagnosisAlertStore } from '@/src/store/diagnosis-alert-store';
import { toast } from 'react-toastify';

export const Logout = () => {
  const router = useRouter();
  const vital = useVitalsAlertStore((state) => state);
  const diagnosis = useDiagnosisAlertStore((state) => state);

  const signOut = async () => {
    try {
      const res = await signOutAction();
      if (res === 'success') {
        vital?.clear();
        vital?.setCalled(false);
        diagnosis?.clear();
        diagnosis?.setCalled(false);
        router.replace('/');
        toast.success('Successfully logged out');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { signOut };
};
