import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type VitalType = {
  task_id: string;
  status: string;
};

type VitalStore = {
  vitals: VitalType[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  updateVital: (vital: any) => void;
  setVitals: (vitals: VitalType[]) => void;
  clear: () => void;
  called: boolean;
  setCalled: (called: boolean) => void;
};

export const useVitalsAlertStore = create(
  persist<VitalStore>(
    (set, get) => ({
      vitals: [],

      updateVital: (incoming) => {
        const existing = get().vitals;
        const exists = existing.find((v) => v.task_id === incoming?.id);

        if (incoming?.status === 'pending' && !exists) {
          set({
            vitals: [...existing, { task_id: incoming?.id, status: incoming?.status }],
          });
        } else if (exists && incoming?.status !== 'pending') {
          set({
            vitals: existing.filter((v) => v.task_id !== incoming?.id),
          });
        }
      },
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      setVitals: (incoming: any) => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        const newEntry = incoming?.map((newItem: any) => {
          return {
            task_id: newItem?.id,
            status: newItem?.status,
          };
        });

        if (newEntry?.length > 0) {
          set({
            vitals: [...newEntry],
          });
        }
      },
      called: false,
      setCalled: (called: boolean) => set({ called }),
      clear: () => set({ vitals: [] }),
    }),
    {
      name: 'vitals', // localStorage key
    }
  )
);

// alert update code for Notification
//   const { data: taskAlert } = useTasksAlert();
//   const { getTask, data } = useGetTasks({
//     select: '*',
//     task_name: 'vitals',
//   });

//   useEffect(() => {
//     getTask();
//   }, []);

//   useEffect(() => {
//     if (vitalState?.called === false) {
//       vitalState?.setVitals(data);
//     }
//     if (data?.length > 0) {
//       vitalState?.setCalled(true);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (taskAlert) {
//       vitalState.updateVital(taskAlert);
//     }
//   }, [taskAlert]);
