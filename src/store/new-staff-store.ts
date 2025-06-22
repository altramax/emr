import { create } from 'zustand';
import newStaffSteps from '../utils/new-staff-steps/new-staff-steps';

type NewStaffStore = {
  currentStep: number;
  steps: typeof newStaffSteps;
  setStep: (step: number) => void;
  setPrevStep: (step: number) => void;
  setNextStep: (step: number) => void;
};

export const useNewStaffStore = create<NewStaffStore>((set) => ({
  currentStep: 1,
  steps: newStaffSteps,
  setStep: (step: number) => set(() => ({ currentStep: step })),
  setPrevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
}));
