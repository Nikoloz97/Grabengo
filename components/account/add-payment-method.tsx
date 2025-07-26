import { functions } from "@/firebase/config";
import { errorToast, successToast } from "@/hooks/default-toasts";
import useFormValidation from "@/hooks/useFormValidation";
import { addPaymentMethodSchema } from "@/schemas/add-payment-method";
import { UserType } from "@/types/user";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { Switch, View } from "react-native";
import { z } from "zod";
import { ThemedButton } from "../themed-button";
import { ThemedText } from "../themed-text";
import { ThemedTextInput } from "../themed-text-input";
import { ThemedView } from "../themed-view";

interface AddPaymentMethodFormProps {
  closeModal: () => void;
  userType: UserType;
  closeModalAndRefetch: () => void;
}

type AddPaymentMethodFields = z.infer<typeof addPaymentMethodSchema>;

export default function AddPaymentMethodForm({
  closeModal,
  userType,
  closeModalAndRefetch,
}: AddPaymentMethodFormProps) {
  const [name, setName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validateForm, clearFieldError } =
    useFormValidation<AddPaymentMethodFields>();
  const { confirmSetupIntent } = useStripe();

  const addPaymentMethod = async (input: AddPaymentMethodFields) => {
    setIsLoading(true);
    const validatedData = validateForm(
      addPaymentMethodSchema,
      input,
      setIsLoading
    );

    if (!validatedData) return;

    try {
      const createSetupIntent = httpsCallable(functions, "createSetupIntent");

      const customerName =
        (userType.firstName &&
          userType.lastName &&
          `${userType.firstName} ${userType.lastName}`) ||
        userType.email.split("@")[0];

      const result = await createSetupIntent({
        customerEmail: userType.email,
        customerName: customerName,
      });

      const { clientSecret } = result.data as {
        clientSecret: string;
      };

      // Confirm the setup intent with Stripe using card form
      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            email: userType.email,
            name: validatedData.name,
          },
        },
      });

      if (error) {
        throw new Error(`Setup failed: ${error.message}`);
      }

      if (setupIntent.status === "Succeeded") {
        if (validatedData.isDefault && setupIntent.paymentMethod?.id) {
          await setAsDefaultPaymentMethod(setupIntent.paymentMethod?.id);
        }
        closeModalAndRefetch();
        successToast("Payment Method Added!");
      }
    } catch (error) {
      errorToast(error, "Failed to process payment method");
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  const setAsDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      const setDefaultPaymentMethod = httpsCallable(
        functions,
        "setDefaultPaymentMethod"
      );
      await setDefaultPaymentMethod({ paymentMethodId });
    } catch (error) {
      console.error("Failed to set as default:", error);
    }
  };

  return (
    // margin gives user room to select buttons when keyboard is open
    <View style={{ marginBottom: 300 }}>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 40, textAlign: "center" }}
      >
        Add Payment Method
      </ThemedText>

      <ThemedTextInput
        placeholder="Cardholder Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          clearFieldError("name");
        }}
        error={errors.name}
      />

      <CardField
        postalCodeEnabled={true}
        cardStyle={{
          backgroundColor: "#ffffffff",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
        }}
      />

      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <ThemedText>Set as Default?</ThemedText>
        <Switch onValueChange={setIsDefault} value={isDefault} />
      </ThemedView>

      <ThemedButton
        title="Add Card"
        style={{ marginTop: 40 }}
        isLoading={isLoading}
        onPress={() =>
          addPaymentMethod({
            name,
            isDefault,
          })
        }
      />
    </View>
  );
}
