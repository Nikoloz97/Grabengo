import { colors } from "@/constants/Colors";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import {
  DMSans_400Regular,
  DMSans_600SemiBold,
} from "@expo-google-fonts/dm-sans";
import { Inter_700Bold } from "@expo-google-fonts/inter";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { ThemeProvider } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast, { BaseToast } from "react-native-toast-message";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
    DMSans_400Regular,
    DMSans_600SemiBold,
  });

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: colors.colors.text,
          borderLeftWidth: 0,
          borderRadius: 12,
          marginHorizontal: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 9999,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          flex: 1,
        }}
        // header
        text1Style={{
          fontSize: 16,
          fontWeight: "600",
          color: "black",
        }}
        // text
        text2Style={{
          fontSize: 14,
          color: "black",
          marginTop: 2,
          flexWrap: "wrap",
          numberOfLines: 0,
        }}
        text1NumberOfLines={0} // Remove line limit for text1
        text2NumberOfLines={0} // Remove line limit for text2
      />
    ),
  };

  if (!loaded) {
    return null;
  }

  const stripePublishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublishableKey) {
    throw new Error("Stripe publishable key is not configured");
  }

  return (
    <>
      <AuthProvider>
        <StripeProvider publishableKey={stripePublishableKey}>
          <ThemeProvider value={colors}>
            <CartProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </CartProvider>
            <StatusBar style="light" />
          </ThemeProvider>
        </StripeProvider>
      </AuthProvider>
      <Toast config={toastConfig} bottomOffset={100} />
    </>
  );
}
