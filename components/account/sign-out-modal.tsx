import { useTheme } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedButton } from "../themed-button";
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
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      propagateSwipe={true}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          paddingTop: 20,
          paddingBottom: 80,
          paddingHorizontal: 40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
        }}
      >
        {/* Swipe indicator */}
        <View
          style={{
            width: 50,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: colors.primary,
          }}
        />

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
      </View>
    </Modal>
  );
}
