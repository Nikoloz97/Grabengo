import React from "react";
import { ScrollView, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";

interface DeleteAccountModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

export default function DeleteAccountModal({
  isVisible,
  closeModal,
}: DeleteAccountModalProps) {
  const deleteAccount = () => {
    closeModal();
  };

  return (
    <ThemedModal isVisible={isVisible} onClose={closeModal} showSwipeIndicator>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", marginTop: 30 }}
      >
        <ThemedText style={{ textAlign: "center", fontWeight: "bold" }}>
          Are you sure you want to delete your account? This action is
          irreversible!
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
            onPress={deleteAccount}
          />
          <ThemedButton title="Cancel" type="primary" onPress={closeModal} />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
