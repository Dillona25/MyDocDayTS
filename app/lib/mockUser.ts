interface User {
  id: string;
  name: string;
  email: string;

  onboarding: {
    currentStep: number;
    completedSteps: number[];
    isComplete: boolean;
  };
}

export const mockUser: User = {
  id: "123",
  name: "Dillon",
  email: "Dill@gmail.com",

  onboarding: {
    currentStep: 1,
    completedSteps: [],
    isComplete: false,
  },
};
