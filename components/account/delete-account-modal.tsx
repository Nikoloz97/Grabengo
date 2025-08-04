import { auth, db } from "@/firebase/config";
import { errorToast } from "@/hooks/default-toasts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUser, User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { ScrollView, View } from "react-native";
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
      await AsyncStorage.setItem("deletionInProgress", "true");

      // delete from firebase auth
      await deleteUser(user);

      // delete from firestore
      await deleteDoc(doc(db, "users", user.uid));
    } catch (error) {
      errorToast(error, "There was an issue deleting your account");
      await AsyncStorage.removeItem("deletionInProgress");
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
          <ThemedButton title="Confirm" type="danger" onPress={deleteAccount} />
          <ThemedButton title="Cancel" type="primary" onPress={closeModal} />
        </View>
      </ScrollView>
    </ThemedModal>
  );
}
