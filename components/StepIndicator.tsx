import React from 'react';
import { Step } from '../types';

interface ProgressBarProps {
  currentStep: Step;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = Math.max(0, ((currentStep - 1) / totalSteps) * 100);

  return (
    <div className="w-full bg-black/20 rounded-full h-2">
      <div
        className="bg-black h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default React.memo(ProgressBar);