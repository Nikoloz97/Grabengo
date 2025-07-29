import { z } from "zod";
import { trimmedString } from ".";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(128, { message: "Password must be less than 128 characters" })
  .refine((value) => !value.includes(" "), { message: "No spaces allowed" })
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

      if (value.includes(" ")) return false; // don't allow spaces

      // check if string matches expected MM/DD/YYYY format
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(value)) return false;

      // parse date
      const [month, day, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);

      // check if it's a valid date
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

      if (value.includes(" ")) return false; // don't allow spaces

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
    birthDate: birthDateSchema,
    addressLineOne: trimmedString(undefined, 100).optional(),
    addressLineTwo: trimmedString(undefined, 100).optional(),
    city: trimmedString(undefined, 50).optional(),
    postalCode: trimmedString(undefined, 10).optional(),
    state: trimmedString(undefined, 50).optional(),
    country: trimmedString(undefined, 56).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // appear on the confirm password line
  });
