import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

export default function TabLayout() {
  const colors = useColors(); const dark = useColorScheme() === 'dark'; const ios = Platform.OS === 'ios'; const web = Platform.OS === 'web';
  const icon = (name: keyof typeof Feather.glyphMap) => ({ color }: { color: string }) => <Feather name={name} size={21} color={color} />;
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.mutedForeground, tabBarStyle: { position: 'absolute', backgroundColor: ios ? 'transparent' : colors.background, borderTopWidth: web ? 1 : 0, borderTopColor: colors.border, elevation: 0, height: web ? 84 : undefined, paddingBottom: web ? 34 : undefined }, tabBarBackground: () => ios ? <BlurView intensity={90} tint={dark ? 'dark' : 'light'} style={StyleSheet.absoluteFill} /> : <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} /> }}>
    <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: icon('home') }} />
    <Tabs.Screen name="vehicles" options={{ title: 'Vehicles', tabBarIcon: icon('truck') }} />
    <Tabs.Screen name="bookings" options={{ title: 'Bookings', tabBarIcon: icon('calendar') }} />
    <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: icon('more-horizontal') }} />
  </Tabs>;
}
