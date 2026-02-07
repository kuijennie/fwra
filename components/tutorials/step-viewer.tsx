"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight, Lightbulb, Check } from "lucide-react";

interface Step {
  stepNumber: number;
  title: { en: string; sw: string };
  content: { en: string; sw: string };
  imageUrl?: string;
  tipText?: { en: string; sw: string };
}

interface StepViewerProps {
  steps: Step[];
  onComplete?: () => void;
}

export function StepViewer({ steps, onComplete }: StepViewerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const localizedTitle = locale === "sw" ? step.title.sw : step.title.en;
  const localizedContent = locale === "sw" ? step.content.sw : step.content.en;
  const localizedTip = step.tipText
    ? locale === "sw"
      ? step.tipText.sw
      : step.tipText.en
    : null;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    if (isLastStep) {
      onComplete?.();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => handleStepClick(index)}
            className={cn(
              "flex-1 h-2 rounded-full transition-colors",
              index === currentStep
                ? "bg-green-600"
                : completedSteps.includes(index)
                  ? "bg-green-400"
                  : "bg-gray-200 dark:bg-gray-700"
            )}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      {/* Step Counter */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {t("tutorials.step")} {currentStep + 1} {t("tutorials.of")} {steps.length}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {completedSteps.length}/{steps.length} completed
        </span>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Step Image */}
        {step.imageUrl && (
          <div className="h-48 bg-gray-100 dark:bg-gray-700">
            <img
              src={step.imageUrl}
              alt={localizedTitle}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Step Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold",
                completedSteps.includes(currentStep)
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              )}
            >
              {completedSteps.includes(currentStep) ? (
                <Check className="h-5 w-5" />
              ) : (
                step.stepNumber
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {localizedTitle}
            </h3>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {localizedContent}
          </p>

          {/* Tip Box */}
          {localizedTip && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex gap-3">
                <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-amber-800 dark:text-amber-300">
                    {t("tutorials.tip")}:
                  </span>
                  <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
                    {localizedTip}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className="flex-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("common.previous")}
        </Button>

        <Button onClick={handleNext} className="flex-1">
          {isLastStep ? (
            <>
              {t("tutorials.completeTutorial")}
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("common.next")}
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
