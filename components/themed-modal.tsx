import { useTheme } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

interface ThemedModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  showSwipeIndicator?: boolean;
  innerViewStyle?: object; // customizing inner view
}

export function ThemedModal({
  isVisible,
  onClose,
  children,
  showSwipeIndicator = true,
  innerViewStyle = {},
}: ThemedModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      propagateSwipe={true}
      style={{ justifyContent: "flex-end", margin: 0 }}
      {...(showSwipeIndicator ? { swipeDirection: "down" } : {})}
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
          ...innerViewStyle,
        }}
      >
        {showSwipeIndicator && (
          <View
            style={{
              width: 50,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: colors.primary,
            }}
          />
        )}

        {children}
      </View>
    </Modal>
  );
}
