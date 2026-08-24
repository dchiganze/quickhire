import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColors } from '@/hooks/useColors';
export default function Entry() { const c = useColors(); useEffect(() => { AsyncStorage.getItem('qh_vendor_session').then(value => router.replace(value ? '/(tabs)' : '/login')); }, []); return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.background }}><ActivityIndicator color={c.primary} /></View>; }
