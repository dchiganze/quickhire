import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATIONS_ENABLED_KEY = 'qh_notifications_enabled';

export function useNotificationPermission() {
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const saved = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
        if (!active || saved !== 'true' || Platform.OS === 'web') return;
        const permission = await Notifications.getPermissionsAsync();
        if (active) setEnabledState(permission.granted);
      } catch {
        if (active) setEnabledState(false);
      }
    })();

    return () => { active = false; };
  }, []);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Notifications unavailable', 'Notification permissions can be enabled from the mobile app.');
      return false;
    }

    try {
      const current = await Notifications.getPermissionsAsync();
      const permission = current.granted ? current : await Notifications.requestPermissionsAsync();

      if (!permission.granted) {
        setEnabledState(false);
        await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'false');
        Alert.alert(
          'Notifications remain off',
          'Allow notifications in Settings if you want to receive booking updates.',
          [
            { text: 'Not now', style: 'cancel' },
            { text: 'Open Settings', onPress: () => { void Linking.openSettings(); } },
          ],
        );
        return false;
      }

      setEnabledState(true);
      await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'true');
      return true;
    } catch {
      setEnabledState(false);
      await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'false');
      Alert.alert('Could not enable notifications', 'Please try again from your device settings.');
      return false;
    }
  }, []);

  const setEnabled = useCallback(async (nextValue: boolean) => {
    if (nextValue) return requestPermission();
    setEnabledState(false);
    await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, 'false');
    return false;
  }, [requestPermission]);

  return { enabled, requestPermission, setEnabled };
}