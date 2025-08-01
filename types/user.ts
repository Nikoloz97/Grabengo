import { Timestamp } from "firebase/firestore";

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
  phone?: string;
  birthDate?: Timestamp;
  addressLineOne?: string;
  addressLineTwo?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
}
