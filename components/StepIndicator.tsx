import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const totalSteps = 5; // Size, Delivery, Address, Schedule, Summary
  const activeStepIndex = currentStep - 1;

  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            index <= activeStepIndex ? 'bg-gray-800' : 'bg-gray-300'
          } ${index === activeStepIndex ? 'scale-125' : ''}`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;