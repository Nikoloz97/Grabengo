import DeleteAccountModal from "@/components/account/delete-account-modal";
import SignOutModal from "@/components/account/sign-out-modal";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function Account() {
  const { user } = useAuth();

  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isPaymentMethodsModalOpen, setIsPaymentMethodsModalOpen] =
    useState(false);
  const [isRecentOrdersModalOpen, setIsRecentOrdersModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const options = [
    {
      text: "Personal Info",
      onPress: () => setIsPersonalInfoModalOpen(true),
    },
    {
      text: "Payment Methods",
      onPress: () => setIsPaymentMethodsModalOpen(true),
    },
    {
      text: "Recent Orders",
      onPress: () => setIsRecentOrdersModalOpen(true),
    },
    {
      text: "Sign Out",
      onPress: () => setIsSignOutModalOpen(true),
    },
    {
      text: "Delete Account",
      onPress: () => setIsDeleteAccountModalOpen(true),
    },
  ];

  // TODO: uncomment
  // if (user === null || user.isAnonymous) {
  //   return <SignIn />;
  // }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">ACCOUNT</ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView>
        <ThemedText type="subtitle">Nick Gotsy</ThemedText>
        <ThemedText style={{ marginTop: 10 }}>Nick.gotsy@gmail.com</ThemedText>

        <View style={{ marginTop: 40, gap: 5 }}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={option.onPress}>
              <ThemedView
                type="card"
                style={{
                  padding: 15,
                }}
              >
                <ThemedText>{option.text}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedScrollView>

      {/* modals*/}
      {/* {isPersonalInfoModalOpen && (
        <PersonalInfoModal
          isVisible={itemToEdit !== null}
          item={itemToEdit}
          setItem={setItemToEdit}
        />
      )}
      {isPaymentMethodsModalOpen && (
        <PaymentMethodsModal
          isVisible={itemToDelete !== null}
          item={itemToDelete}
          setItem={setItemToDelete}
        />
      )}
      {isRecentOrdersModalOpen && (
        <RecentOrdersModal
          isVisible={itemToDelete !== null}
          item={itemToDelete}
          setItem={setItemToDelete}
        />
      )} */}

      <SignOutModal
        isVisible={isSignOutModalOpen}
        closeModal={() => setIsSignOutModalOpen(false)}
      />
      <DeleteAccountModal
        isVisible={isDeleteAccountModalOpen}
        closeModal={() => setIsDeleteAccountModalOpen(false)}
      />
    </ThemedView>
  );
}
