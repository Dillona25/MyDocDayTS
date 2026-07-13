export type CreateUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
};

export type ReturnedUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserRow = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};
