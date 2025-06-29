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

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_700Bold,
    DMSans_400Regular,
    DMSans_600SemiBold,
  });

  if (!loaded) {
    return null;
  }

  const stripePublishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublishableKey) {
    throw new Error("Stripe publishable key is not configured");
  }

  return (
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
  );
}
