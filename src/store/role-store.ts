import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type roleStore = {
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;
};

export const useRoleStore = create(
  persist<roleStore>(
    (set) => ({
      role: null,
      setRole: (role: string) => set({ role }),
      clearRole: () => set({ role: null }),
    }),
    {
      name: 'role', // localStorage key
    }
  )
);
