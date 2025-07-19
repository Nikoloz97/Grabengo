import { UserType } from "@/types/user";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { auth, db } from "../firebase/config";

interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  isLoading: boolean;
  setUserType: (user: UserType | null) => void;
  refetchUserType: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  isLoading: true,
  setUserType: () => {},
  refetchUserType: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !user.isAnonymous) {
        setUser(user);
        setIsLoading(false);
        await fetchUserType(user.uid);
        // already signed in anonymously (e.g. app restart)
      } else if (user && user.isAnonymous) {
        setUser(user);
        setUserType(null);
        // first time sign in
      } else {
        try {
          console.log("No user found, signing in anonymously...");
          const userCredential = await signInAnonymously(auth);
          setUser(userCredential.user);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
          setUser(null);
          setUserType(null);
        }
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserType = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserType({ id: uid, ...userDoc.data() } as UserType);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const refetchUserType = async () => {
    if (user && !user.isAnonymous) {
      await fetchUserType(user.uid);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "#fff", marginTop: 16 }}>Initializing...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, userType, setUserType, isLoading, refetchUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
