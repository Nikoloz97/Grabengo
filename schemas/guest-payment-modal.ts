import { z } from "zod";

export const guestPaymentSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(128, { message: "Name must be less than 128 characters" }),
  phone: z
    .string()
    .regex(
      /^[\d\s\-\(\)\+\.]+$/,
      "Phone number can only contain digits, spaces, hyphens, parentheses, plus signs, and periods"
    )
    .regex(/\d/, "Phone number must contain at least one digit")
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number is too long")
    .transform((val) => val.replace(/\D/g, "")) // remove all non-digits for storage
    .refine((val) => val.length >= 10 && val.length <= 15, {
      message: "Phone number must be 10-15 digits long",
    })
    .optional(),
});
