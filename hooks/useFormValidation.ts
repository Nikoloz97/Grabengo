import { useState } from "react";
import { z } from "zod";
import { errorToast } from "../utils/default-toasts";

export default function useFormValidation<T extends Record<string, any>>() {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateForm = <Schema extends z.ZodSchema>(
    schema: Schema,
    data: T,
    setIsLoading: (input: boolean) => void
  ): z.infer<Schema> | null => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof T, string>> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof T;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      errorToast(null, "Please address invalid form input");
      setErrors(fieldErrors);
      setIsLoading(false);
      return null;
    }

    setErrors({});
    return result.data;
  };

  const clearErrors = () => setErrors({});
  const clearFieldError = (field: keyof T) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
    errors,
    validateForm,
    clearErrors,
    clearFieldError,
  };
}
