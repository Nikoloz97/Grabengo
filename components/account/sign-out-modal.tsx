import { useTheme } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";

interface SignOutModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function SignOutModal({
  isVisible,
  closeModal,
}: SignOutModalProps) {
  const { colors } = useTheme();

  const signOut = () => {
    closeModal();
  };

  return (
    <ThemedModal isVisible={isVisible} onClose={closeModal}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", marginTop: 30 }}
      >
        <ThemedText style={{ textAlign: "center", fontWeight: "bold" }}>
          Are you sure you want to sign out?
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 30,
            alignItems: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <ThemedButton
            title="Confirm"
            type="primary"
            onPress={() => {
              signOut();
            }}
          />
          <ThemedButton title="Cancel" type="primary" onPress={closeModal} />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
