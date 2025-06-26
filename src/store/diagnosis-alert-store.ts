import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type VitalType = {
  id: string;
  status: string;
};

type DiagnosisStore = {
  diagnosis: VitalType[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  updateVital: (vital: any) => void;
  setDiagnosis: (Diagnosis: VitalType[]) => void;
  clear: () => void;
  called: boolean;
  setCalled: (called: boolean) => void;
};

export const useDiagnosisAlertStore = create(
  persist<DiagnosisStore>(
    (set, get) => ({
      diagnosis: [],

      updateVital: (incoming) => {
        const existing = get().diagnosis;
        const exists = existing.find((v) => v.id === incoming?.id);

        if (incoming?.status === 'pending' && !exists) {
          set({
            diagnosis: [...existing, { id: incoming?.id, status: incoming?.status }],
          });
        } else if (exists && incoming?.status !== 'pending') {
          set({
            diagnosis: existing.filter((v) => v.id !== incoming?.id),
          });
        }
      },
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      setDiagnosis: (incoming: any) => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newEntry = incoming?.map((newItem: any) => {
          return {
            id: newItem?.id,
            status: newItem?.status,
          };
        });

        if (newEntry?.length > 0) {
          set({
            diagnosis: [...newEntry],
          });
        }
      },
      called: false,
      setCalled: (called: boolean) => set({ called }),
      clear: () => set({ diagnosis: [] }),
    }),
    {
      name: 'Diagnosis', // localStorage key
    }
  )
);
