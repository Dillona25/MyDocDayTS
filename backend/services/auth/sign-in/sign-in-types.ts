// Safe signedcin user data for frontend.
export type CurrentUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  isActive: boolean;
  onboarding: {
    currentStep: number;
    completedSteps: number[];
    isComplete: boolean;
  };
};

// Users table row needed to verify sign in
export type SignInUserRow = {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  is_active: boolean;
};

// Joined user and onboarding row returned after sign in
export type CurrentUserRow = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  is_active: boolean;
  onboarding_current_step: number;
  onboarding_completed_steps: number[];
  onboarding_is_complete: boolean;
};

// Returned after creating a session.
export type SessionRow = {
  id: string;
  user_id: number;
  expires_at: Date;
  created_at: Date;
  last_used_at: Date | null;
};
