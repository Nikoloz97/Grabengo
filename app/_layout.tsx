import { colors } from "@/constants/Colors";
import { CartProvider } from "@/contexts/cart-context";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter_700Bold,
    Inter_400Regular,
    Inter_300Light,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colors}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CartProvider>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
