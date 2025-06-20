import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useCart } from "@/contexts/cart-context";
import { View } from "react-native";

export default function Checkout() {
  const { cart } = useCart();

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cart.map((cartItem, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>{cartItem.name}</ThemedText>
          <ThemedText>{cartItem.quantity}</ThemedText>
        </View>
      ))}
    </ThemedView>
  );
}
