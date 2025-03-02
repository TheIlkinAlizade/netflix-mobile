import React, { useEffect, useState } from "react";
import { Platform, ActivityIndicator, View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs, router, Redirect } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableWithoutFeedback } from "react-native";

import "../../global.css";

// Custom Tab Bar Icon Animation
const AnimatedTabIcon = ({ focused, color, name }) => {
  const scale = focused ? new Animated.Value(1.2) : new Animated.Value(1);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      friction: 3,
      tension: 150,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <IconSymbol size={28} name={name} color={color} />
    </Animated.View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState<string | null>(null);
  const [first, setFirst] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedFirst = await AsyncStorage.getItem("first");

        console.log("Stored Token:", storedToken);
        console.log("Stored First:", storedFirst);

        setToken(storedToken);
        setFirst(storedFirst);
      } catch (error) {
        console.error("AsyncStorage Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStorage();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].tint}
        />
      </View>
    );
  }

  if (!first) {
    return <Redirect href="/board" />;
  }

  if (first && !token) {
    return <Redirect href="/auth/login" />;
  }

  // return <Redirect href="/movies" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: "#1d0326",
              position: "relative",
              borderTopWidth: 0,
              paddingTop:5,
              height: 60,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 5,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <AnimatedTabIcon focused={focused} color={color} name="house.fill" />
              ),
            }}
          />

          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color, focused }) => (
                <AnimatedTabIcon focused={focused} color={color} name="magnifyingglass" />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <AnimatedTabIcon focused={focused} color={color} name="person.fill" />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
