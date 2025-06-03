'use client';

type StepIndicatorProps = {
  steps: number;
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const CheckSvg = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div
        className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"
        style={{
          width: 'calc(100% - 40px)',
          margin: '0 20px',
        }}
      />

      <div
        className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transform -translate-y-1/2 z-0 transition-all duration-300"
        style={{
          width: `${(currentStep / (steps - 1)) * 100}%`,
          marginLeft: '20px',
          marginRight: '20px',
          maxWidth: 'calc(100% - 40px)',
        }}
      />

      <div className="flex justify-between items-center relative z-10">
        {Array.from({ length: steps }).map((_, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          const circleClasses = [
            'w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-200',
            'relative z-10',
            isCompleted
              ? 'bg-blue-600 text-white'
              : isCurrent
                ? 'bg-white border-2 border-blue-600 text-blue-600'
                : 'bg-gray-200 text-gray-500',
          ].join(' ');

          return (
            <div key={index} className="flex flex-col items-center relative">
              <div className={circleClasses}>
                {isCompleted ? <CheckSvg /> : <span>{index + 1}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
