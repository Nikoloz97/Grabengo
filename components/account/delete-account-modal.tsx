import { auth, db } from "@/firebase/config";
import { errorToast } from "@/hooks/default-toasts";
import { router } from "expo-router";
import { deleteUser, User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { ThemedButton } from "../themed-button";
import { ThemedModal } from "../themed-modal";
import { ThemedText } from "../themed-text";

interface DeleteAccountModalProps {
  isVisible: boolean;
  closeModal: () => void;
  user: User;
}

export default function DeleteAccountModal({
  isVisible,
  closeModal,
  user,
}: DeleteAccountModalProps) {
  const deleteAccount = async () => {
    try {
      if (!auth.currentUser) {
        errorToast(null, "No user is currently signed in");
      }

      // delete from firestore
      await deleteDoc(doc(db, "users", user.uid));

      // delete from firebase auth
      await deleteUser(user);

      router.push("/");
      Alert.alert(
        "Account Deleted!",
        "If this was a mistake, please contact support",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ]
      );
    } catch (error) {
      errorToast(error, "There was an issue deleting your account");
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
