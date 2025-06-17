import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import React from "react";
import { Platform, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      {/* header */}
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          backgroundColor: "black",
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
        <ThemedText
          style={{
            fontSize: 32,
            fontWeight: "bold",
            paddingTop: 40,
          }}
        >
          Welcome to Grabengo
        </ThemedText>
      </ThemedView>

      {/* main */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 80,
        }}
      >
        {/* about  */}
        <ThemedView
          type="card"
          style={{
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
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            About Grabengo
          </ThemedText>
          <ThemedText style={{ fontSize: 16, marginBottom: 10 }}>
            Welcome to Grabengo, your go-to app for quick and easy ordering.
            Discover our mission and how were changing the way you enjoy your
            favorite items!
          </ThemedText>
        </ThemedView>

        {/* featured */}
        <ThemedView
          type="card"
          style={{
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
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Featured Item: Summer Berry Refresher
          </ThemedText>
          <Image
            source={{
              uri: "https://placehold.co/600x300/9BDD7F/FFFFFF?ThemedText=Featured+Item",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
            }}
            contentFit="cover"
          />
          <ThemedText style={{ fontSize: 16, marginBottom: 10 }}>
            Cool down with our Summer Berry Refresher! A delightful blend of
            fresh berries and a hint of mint. Perfect for a sunny day.
          </ThemedText>
          <ThemedText
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
          </ThemedText>
        </ThemedView>

        {/* coming soon */}
        <ThemedView
          type="card"
          style={{
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
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Coming Soon: Spiced Pumpkin Latte
          </ThemedText>
          <Image
            source={{
              uri: "https://placehold.co/600x300/FFB74D/FFFFFF?ThemedText=Coming+Soon",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
            }}
            contentFit="cover"
          />
          <ThemedText style={{ fontSize: 16, marginBottom: 10 }}>
            Get ready for the cozy season with our new Spiced Pumpkin Latte! A
            warm and comforting blend of pumpkin spice and rich espresso.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
