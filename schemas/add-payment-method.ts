import { z } from "zod";

export const addPaymentMethodSchema = z.object({
  cardNumber: z
    .string()
    .min(13, "Must be at least 13 digits")
    .max(19, "Must be at most 19 digits")
    .regex(/^\d+$/, "Must only contain digits")
    .refine((value) => !value.includes(" "), { message: "No spaces allowed" }),

  securityCode: z
    .string()
    .min(3, "Must be at least 3 digits")
    .max(4, "Must be at most 4 digits")
    .regex(/^\d+$/, "Must only contain digits")
    .refine((value) => !value.includes(" "), { message: "No spaces allowed" }),

  name: z.string().min(1, "Name on card is required"),

  expMonth: z
    .string()
    .length(2, "Must be 2 digits (MM)")
    .regex(/^(0[1-9]|1[0-2])$/, "Must be between 01-12")
    .refine((value) => !value.includes(" "), { message: "No spaces allowed" }),

  expYear: z
    .string()
    .length(4, "Must be 4 digits (YYYY)")
    .regex(/^\d{4}$/, "Must be 4 digits")
    .refine((value) => !value.includes(" "), { message: "No spaces allowed" }),

  postalCode: z
    .string()
    .min(5, "Must be at least 5 digits")
    .max(10, "Must be at most 10 digits") // allow US ZIP+4 or international
    .refine((value) => !value.includes(" "), { message: "No spaces allowed" }),

  isDefault: z.boolean(),
});
