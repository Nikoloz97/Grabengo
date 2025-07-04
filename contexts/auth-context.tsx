import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { auth } from "../firebase/config";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is already signed in
        setUser(user);
        setIsLoading(false);
        console.log(
          "User authenticated:",
          user.uid,
          "Anonymous:",
          user.isAnonymous
        );
      } else {
        // No user, sign in anonymously
        try {
          console.log("No user found, signing in anonymously...");
          const userCredential = await signInAnonymously(auth);
          setUser(userCredential.user);
          console.log("Anonymous sign-in successful:", userCredential.user.uid);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
          // Still set loading to false even if sign-in fails
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return unsubscribe;
  }, []);

  // Show loading screen while authenticating
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000", // Match your app's background
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 16 }}>Initializing...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
