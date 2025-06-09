import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type VitalType = {
  id: string;
  status: string;
};

type DiagnosesStore = {
  diagnoses: VitalType[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  updateVital: (vital: any) => void;
  setDiagnoses: (Diagnoses: VitalType[]) => void;
  clear: () => void;
  called: boolean;
  setCalled: (called: boolean) => void;
};

export const useDiagnosesAlertStore = create(
  persist<DiagnosesStore>(
    (set, get) => ({
      diagnoses: [],

      updateVital: (incoming) => {
        const existing = get().diagnoses;
        const exists = existing.find((v) => v.id === incoming?.id);

        if (incoming?.status === 'pending' && !exists) {
          set({
            diagnoses: [...existing, { id: incoming?.id, status: incoming?.status }],
          });
        } else if (exists && incoming?.status !== 'pending') {
          set({
            diagnoses: existing.filter((v) => v.id !== incoming?.id),
          });
        }
      },
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      setDiagnoses: (incoming: any) => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newEntry = incoming?.map((newItem: any) => {
          return {
            id: newItem?.id,
            status: newItem?.status,
          };
        });

        if (newEntry?.length > 0) {
          set({
            diagnoses: [...newEntry],
          });
        }
      },
      called: false,
      setCalled: (called: boolean) => set({ called }),
      clear: () => set({ diagnoses: [] }),
    }),
    {
      name: 'Diagnoses', // localStorage key
    }
  )
);
