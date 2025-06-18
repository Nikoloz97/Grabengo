import { ThemedButton } from "@/components/ThemedButton";
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
        type="card"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
            },
            android: {
              elevation: 8, // shadow elevation
            },
          }),
        }}
      >
        <ThemedText
          type="title"
          style={{
            paddingTop: 40,
          }}
        >
          Grabengo
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

          <ThemedButton type="primary" title="Order Now" />
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
            About Us
          </ThemedText>
          <ThemedText style={{ fontSize: 16, marginBottom: 10 }}>
            Welcome to Grabengo, your go-to app for quick and easy ordering.
            Discover our mission and how were changing the way you enjoy your
            favorite items!
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
