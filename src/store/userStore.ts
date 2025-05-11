import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  role?: string;
} | null;

type UserStore = {
  user: User;
  setUser: (user: User) => void;
  setRole: (role: string) => void;
  clearUser: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      setRole: (role: string) => set((state) => ({
        user: state.user ? { ...state.user, role } : null, 
      })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
    }
  )
);
