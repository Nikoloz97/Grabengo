import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(128, { message: "Password must be less than 128 characters" })
  .refine((value) => /[a-z]/.test(value), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((value) => /\d/.test(value), {
    message: "Password must contain at least one number",
  })
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message:
      'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
  })
  .refine((value) => !/\s/.test(value), {
    message: "Password cannot contain spaces",
  });

const birthDateSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value || value.trim() === "") return true; // allow empty

      // check if string matches expected MM/DD/YYYY format
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(value)) return false;

      // Parse date
      const [month, day, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      // Check if it's a valid date
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    },
    {
      message: "Please enter a valid birth date (MM/DD/YYYY)",
    }
  )
  .refine(
    (value) => {
      if (!value || value.trim() === "") return true; // allow empty/optional

      const [month, day, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      const today = new Date();

      return date <= today;
    },
    {
      message: "Birth date cannot be in the future",
    }
  );

export const signUpSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    password: passwordSchema,
    confirmPassword: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthDate: birthDateSchema,
    addressLineOne: z.string().optional(),
    addressLineTwo: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // appear on the confirm password line
  });
