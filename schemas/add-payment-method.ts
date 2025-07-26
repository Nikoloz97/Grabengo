import { z } from "zod";

export const addPaymentMethodSchema = z.object({
  name: z.string().min(1, "Name on card is required"),
  isDefault: z.boolean(),
});
