import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";

export default function Menu() {
  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <ThemedText>Shakes</ThemedText>
        <ThemedText>Smoothies</ThemedText>
        <ThemedText>Beverages</ThemedText>
        <ThemedText>Dessert</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
