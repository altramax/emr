'use client';

import { Check } from 'lucide-react';

type StepIndicatorProps = {
  steps: number;
  currentStep: number; // 1-based index
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full flex items-center justify-between max-w-4xl mx-auto px-4">
      {Array.from({ length: steps }).map((_, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={index} className="flex items-center w-full last:w-auto">
            {/* Step circle */}
            <div className="relative flex items-center justify-center z-10">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center font-semibold',
                  isCompleted
                    ? 'bg-blue-600 text-white'
                    : isCurrent
                      ? 'bg-white border-2 border-blue-600 text-blue-600'
                      : 'bg-gray-200 text-gray-500',
                ].join(' ')}
              >
                {isCompleted ? <Check size={18} /> : stepNum}
              </div>
            </div>

            {/* Connector line */}
            {stepNum < steps && (
              <div
                className={`flex-1 h-0.5 ${stepNum < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
