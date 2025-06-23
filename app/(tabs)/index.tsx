import { ThemedButton } from "@/components/themed-button";
import { ThemedHeaderView } from "@/components/themed-header-view";
import { ThemedScrollView } from "@/components/themed-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import React from "react";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      {/* header */}
      <ThemedHeaderView>
        <ThemedText type="title">Grabengo</ThemedText>
      </ThemedHeaderView>
      {/* main */}
      <ThemedScrollView>
        {/* featured */}
        <ThemedView type="card">
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
            }}
          >
            Featured Item: Summer Berry Refresher
          </ThemedText>
          <Image
            source={{
              uri: "https://placehold.co/9BDD7F/FFFFFF?ThemedText=Featured+Item",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
              backgroundColor: "orange",
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
        <ThemedView type="card">
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
              uri: "https://placehold.co/FFB74D/FFFFFF?ThemedText=Coming+Soon",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
              backgroundColor: "orange",
            }}
            contentFit="cover"
          />
          <ThemedText style={{ fontSize: 16, marginBottom: 10 }}>
            Get ready for the cozy season with our new Spiced Pumpkin Latte! A
            warm and comforting blend of pumpkin spice and rich espresso.
          </ThemedText>
        </ThemedView>

        {/* about  */}
        <ThemedView type="card">
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            About Us
          </ThemedText>
          <Image
            source={{
              uri: "https://placehold.co/FFB74D/FFFFFF?ThemedText=Coming+Soon",
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 15,
              backgroundColor: "orange",
            }}
            contentFit="cover"
          />
          <ThemedText style={{ fontSize: 16, marginBottom: 10 }}>
            Welcome to Grabengo, your go-to app for quick and easy ordering.
            Discover our mission and how were changing the way you enjoy your
            favorite items!
          </ThemedText>
        </ThemedView>
      </ThemedScrollView>
    </ThemedView>
  );
}
