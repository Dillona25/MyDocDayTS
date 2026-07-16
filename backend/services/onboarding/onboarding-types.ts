export type UpdateOnboardingInput = {
  userId: number;
  completedStep: number;
  nextStep: number;
  isComplete: boolean;
};

export type UpdatedOnboarding = {
  currentStep: number;
  completedSteps: number[];
  isComplete: boolean;
};

export type UpdatedOnboardingRow = {
  current_step: number;
  completed_steps: number[];
  is_complete: boolean;
};
