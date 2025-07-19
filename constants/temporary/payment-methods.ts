import { PaymentMethod } from "@/types/user";

// TODO: delete this file
export const userPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1NXABC1234567890abcdEFGH", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2025,
      funding: "credit", // "debit", "credit", "prepaid"
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: true,
  },
  {
    id: "pm_1NXXYZ9876543210wxyzJKLM",
    type: "card",
    card: {
      brand: "mastercard",
      last4: "4444",
      exp_month: 9,
      exp_year: 2026,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
  {
    id: "pm_1NXABC1234567890angdoigad", // stripe payment method Id
    type: "card",
    card: {
      brand: "visa",
      last4: "5656",
      exp_month: 1,
      exp_year: 2024,
      funding: "debit",
    },
    billing_details: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "+15555555555",
      address: {
        line1: "123 Stripe St",
        line2: null,
        city: "Chicago",
        state: "IL",
        postal_code: "60601",
        country: "US",
      },
    },
    isDefault: false,
  },
];
