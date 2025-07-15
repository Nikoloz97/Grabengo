import { z } from "zod";

export const trimmedString = (min?: number, max?: number) => {
  let schema = z.string();
  if (min !== undefined) schema = schema.min(min);
  if (max !== undefined) schema = schema.max(max);
  return schema.transform((val) => val.trim());
};
