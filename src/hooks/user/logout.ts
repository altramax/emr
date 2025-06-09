import { signOutAction } from '@/src/actions/actions';
import { useRouter } from 'next/navigation';
import { useVitalsAlertStore } from '@/src/store/vitals-alert-store';
import { useDiagnosesAlertStore } from '@/src/store/diagnoses-alert-store copy';
import { toast } from 'react-toastify';

export const Logout = () => {
  const router = useRouter();
  const vital = useVitalsAlertStore((state) => state);
  const diagnoses = useDiagnosesAlertStore((state) => state);

  const signOut = async () => {
    try {
      const res = await signOutAction();
      if (res === 'success') {
        vital?.clear();
        vital?.setCalled(false);
        diagnoses?.clear();
        diagnoses?.setCalled(false);
        router.replace('/');
        toast.success('Successfully logged out');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { signOut };
};
