export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  verified: boolean;
}

export type UserRole = "buyer" | "vendor" | "admin";

export interface Vendor {
  id: string;
  userId: string;
  name: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
  address?: Address;
}

export interface Buyer {
  id: string;
  userId?: string;
  anonymous?: boolean;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address?: Address;
}

export interface Admin {
  id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

