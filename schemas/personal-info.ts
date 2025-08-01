import { z } from "zod";
import { trimmedString } from ".";

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

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(128, { message: "Name must be less than 128 characters" }),
  phone: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      return val;
    },
    z
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
      .optional()
  ),
  birthDate: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, birthDateSchema),
  addressLineOne: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, trimmedString(undefined, 100).optional()),
  addressLineTwo: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, trimmedString(undefined, 100).optional()),
  city: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, trimmedString(undefined, 50).optional()),
  postalCode: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, trimmedString(undefined, 10).optional()),
  state: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, trimmedString(undefined, 50).optional()),
  country: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") return undefined;
    return val;
  }, trimmedString(undefined, 56).optional()),
});
