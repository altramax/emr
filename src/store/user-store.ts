import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type userStore = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  user: any;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  setUser: (user: any) => void;
  clearUser: () => void;
};

export const useUserStore = create(
  persist<userStore>(
    (set) => ({
      user: null,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      setUser: (user: any) => set({ user }),
      clearUser: () => set({ user: null, isLoggedIn: false }),
      isLoggedIn: true,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    {
      name: 'User', // localStorage key
    }
  )
);
