import React from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
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
  const handleSignOut = () => {
    try {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Signed out!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to process. Please try again.",
      });
    } finally {
      closeModal();
    }
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
            onPress={handleSignOut}
          />
          <ThemedButton title="Cancel" type="primary" onPress={closeModal} />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
