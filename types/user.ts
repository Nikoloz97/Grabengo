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

export interface BillingDetails {
  name: string;
  email: string;
  phone: string;
  address: AddressDetails;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card: CardDetails;
  billing_details: BillingDetails;
  isDefault: boolean;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  addressLineOne: string;
  addressLineTwo: string | null;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}
