import { Timestamp } from "firebase/firestore";

export interface NewCardDetails {
  cardNumber: string;
  securityCode: string;
  name: string;
  expMonth: string;
  expYear: string;
  addressLineOne: string;
  addressLineTwo: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CardDetails {
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  funding: string;
}

export interface AddressDetails {
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
  funding: string;
  name: string;
  postalCode: string;
  isDefault: boolean;
}

// not 'user' since conflicts with firebase auth
export interface UserType {
  id?: string;
  email: string;
  name: string;
  birthDate?: Timestamp;
  addressLineOne?: string;
  addressLineTwo?: string | null;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
}
