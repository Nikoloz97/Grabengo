import { Image } from "expo-image"; // Keep expo-image as it's standard for Expo
import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          backgroundColor: "#A1CEDC",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#333" }}>
          Welcome to Grabengo
        </Text>
      </View>

      {/* main */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      >
        {/* about  */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5, // for Android shadow
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#333",
            }}
          >
            About Grabengo
          </Text>
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>
            Welcome to Grabengo, your go-to app for quick and easy ordering.
            Discover our mission and how were changing the way you enjoy your
            favorite items!
          </Text>
        </View>

        {/* featured */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#333",
            }}
          >
            Featured Item: Summer Berry Refresher
          </Text>
          <Image
            source={{
              uri: "https://placehold.co/600x300/9BDD7F/FFFFFF?text=Featured+Item",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
            }}
            contentFit="cover"
          />
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>
            Cool down with our Summer Berry Refresher! A delightful blend of
            fresh berries and a hint of mint. Perfect for a sunny day.
          </Text>
          <Text
            style={{
              backgroundColor: "#00704A", // Starbucks green
              color: "white",
              fontWeight: "bold",
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 25,
              textAlign: "center",
              marginTop: 10,
              overflow: "hidden",
            }}
          >
            Order now
          </Text>
        </View>

        {/* coming soon */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#333",
            }}
          >
            Coming Soon: Spiced Pumpkin Latte
          </Text>
          <Image
            source={{
              uri: "https://placehold.co/600x300/FFB74D/FFFFFF?text=Coming+Soon",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
            }}
            contentFit="cover"
          />
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 10 }}>
            Get ready for the cozy season with our new Spiced Pumpkin Latte! A
            warm and comforting blend of pumpkin spice and rich espresso.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
