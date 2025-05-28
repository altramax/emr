import { create } from 'zustand';
import newPatientSteps from '../utils/new-patient-steps/new-patient-steps';

type NewPatientStore = {
  currentStep: number;
  steps: typeof newPatientSteps;
  setStep: (step: number) => void;
  setPrevStep: (step: number) => void;
  setNextStep: (step: number) => void;
};

export const useNewPatientStore = create<NewPatientStore>((set) => ({
  currentStep: 1,
  steps: newPatientSteps,
  setStep: (step: number) => set(() => ({ currentStep: step })),
  setPrevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
}));
