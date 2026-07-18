export type ProviderType = "provider" | "clinic";

export type CreateProviderInput = {
  userId: number;
  firstName: string;
  lastName: string;
  specialty: string;
  type: ProviderType;
  phoneNumber?: string;
  imageUrl?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
};

export type ReturnedProvider = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  specialty: string;
  type: ProviderType;
  phoneNumber: string | null;
  imageUrl: string | null;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProviderRow = {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  specialty: string;
  type: ProviderType;
  phone_number: string | null;
  image_url: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  created_at: Date;
  updated_at: Date;
};
