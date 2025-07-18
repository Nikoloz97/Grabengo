import DeleteAccountModal from "@/components/account/delete-account-modal";
import PaymentMethodsModal from "@/components/account/payment-methods-modal";
import PersonalInfoModal from "@/components/account/personal-info-modal";
import RecentOrdersModal from "@/components/account/recent-orders-modal";
import SignOutModal from "@/components/account/sign-out-modal";
import SignIn from "@/components/auth/sign-in";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function Account() {
  const { user, userType } = useAuth();

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

  if (user === null || user.isAnonymous || userType === null) {
    return <SignIn />;
  }

  if (userType) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <ThemedHeaderView>
          <ThemedText type="title">ACCOUNT</ThemedText>
        </ThemedHeaderView>

        <ThemedScrollView>
          {userType.firstName && userType.lastName ? (
            <View>
              <ThemedText type="subtitle">{`${userType.firstName} ${userType.lastName}`}</ThemedText>
              <ThemedText style={{ marginTop: 10 }}>
                {userType.email}
              </ThemedText>
            </View>
          ) : (
            <ThemedText type="subtitle">{userType.email}</ThemedText>
          )}

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
        <PersonalInfoModal
          isVisible={isPersonalInfoModalOpen}
          closeModal={() => setIsPersonalInfoModalOpen(false)}
          userType={userType}
          userId={user.uid}
        />

        <PaymentMethodsModal
          isVisible={isPaymentMethodsModalOpen}
          closeModal={() => setIsPaymentMethodsModalOpen(false)}
          userType={userType}
        />

        <RecentOrdersModal
          isVisible={isRecentOrdersModalOpen}
          closeModal={() => setIsRecentOrdersModalOpen(false)}
          userType={userType}
        />

        <SignOutModal
          isVisible={isSignOutModalOpen}
          closeModal={() => setIsSignOutModalOpen(false)}
        />
        <DeleteAccountModal
          isVisible={isDeleteAccountModalOpen}
          closeModal={() => setIsDeleteAccountModalOpen(false)}
          user={user}
        />
      </ThemedView>
    );
  }
}
