import React from "react";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { SetupStep } from "../types";

interface ProgressStepsProps {
  steps: SetupStep[];
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div className="relative flex items-center justify-center">
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform",
                  step.completed
                    ? "bg-blue-600 border-blue-600 text-white scale-110"
                    : currentStep === index
                    ? "border-blue-600 text-blue-600 scale-105"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {step.completed ? (
                  <Check className="w-5 h-5 animate-fade-in" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

            </div>

            <span
              className={clsx(
                "mt-2 text-sm font-medium transition-colors duration-200",
                currentStep === index ? "text-blue-600" : "text-gray-600"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
