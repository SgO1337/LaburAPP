// lib/types.ts
export type UserType = "client" | "professional";

export interface BaseUser {
  id: string;
  email: string;
  password: string; // In production, this would be hashed
  name: string;
  phone: string;
  type: UserType;
  createdAt: string;
}

export interface Client extends BaseUser {
  type: "client";
  location: string;
}

export interface Professional extends BaseUser {
  type: "professional";
  profession: string;
  role: string; // e.g., "Psicólogo Clínico"
  location: string;
  bio: string;
  tags: string[];
  rate: number; // hourly rate in UYU
  availability: string[];
  verified: boolean;
  rating: number;
  reviews: number;
  experienceYears: number;
  img?: string;
}

export type User = Client | Professional;

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface ContactRecord {
  id: string;
  clientId: string;
  professionalId: string;
  professionalName: string;
  professionalEmail?: string;
  message: string;
  date: string; // ISO
}
