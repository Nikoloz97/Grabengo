import SignIn from "@/components/auth/sign-in";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/auth-context";

export default function Account() {
  const { user } = useAuth();

  const options = [
    "Personal info",
    "Payment Methods",
    "Recent Orders",
    "Sign Out",
    "Delete Account",
  ];

  // TODO: uncomment
  if (user === null || user.isAnonymous) {
    return <SignIn />;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedHeaderView>
        <ThemedText type="title">ACCOUNT</ThemedText>
      </ThemedHeaderView>

      <ThemedScrollView>
        <ThemedText type="subtitle">Nick Gotsy</ThemedText>
        <ThemedText style={{ marginTop: 10 }}>Nick.gotsy@gmail.com</ThemedText>
      </ThemedScrollView>
    </ThemedView>
  );
}
