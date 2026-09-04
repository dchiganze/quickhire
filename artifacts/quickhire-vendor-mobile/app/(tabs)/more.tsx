import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useGetVendor } from '@workspace/api-client-react';
import { useColors } from '@/hooks/useColors';
import { AppHeader, SectionLabel } from '@/components/ui';

export default function MoreScreen() {
  const c = useColors(); const vendor = useGetVendor(1); const [notifications, setNotifications] = useState(true);

  const menu = [
    { icon: 'briefcase', label: 'Business profile', action: () => router.push('/profile') },
    { icon: 'bell', label: 'Notifications', right: <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: c.muted, true: c.primary }} thumbColor={c.card} /> },
    { icon: 'help-circle', label: 'Help & support', action: () => router.push('/help') },
    { icon: 'shield', label: 'Privacy', action: () => router.push('/privacy') },
  ];

  async function logout() {
    await AsyncStorage.multiRemove(['qh_vendor_session', 'qh_vendor_token', 'qh_vendor_id']);
    router.replace('/login');
  }

  function requestDeleteAccount() {
    Alert.alert(
      'Delete account?',
      'This will sign you out and clear this account from this device. To request permanent deletion of your vendor data, contact support.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove(['qh_vendor_session', 'qh_vendor_token', 'qh_vendor_id']);
            router.replace('/login');
          },
        },
      ],
    );
  }

  return (
    <ScrollView style={[styles.screen, { backgroundColor: c.background }]} contentContainerStyle={styles.content}>
      <AppHeader title="Profile" subtitle="Your account and support" />
      <View style={[styles.profile, { backgroundColor: c.secondary }]}>
        <View style={[styles.avatar, { backgroundColor: c.primary }]}>
          <Text style={[styles.avatarText, { color: c.primaryForeground }]}>{(vendor.data?.businessName || 'A').charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.business, { color: c.secondaryForeground }]}>{vendor.data?.businessName || 'ABC Car Rentals'}</Text>
          <Text style={[styles.contact, { color: c.secondaryForeground }]}>{vendor.data?.contactName || 'Vendor account'}</Text>
        </View>
        <View style={[styles.verified, { backgroundColor: c.successSoft }]}>
          <Feather name="check" size={12} color={c.success} />
          <Text style={[styles.verifiedText, { color: c.success }]}>Verified</Text>
        </View>
      </View>

      <SectionLabel>Account</SectionLabel>
      <View style={[styles.menu, { backgroundColor: c.card, borderColor: c.border }]}>
        {menu.map((item, i) => (
          <Pressable
            key={item.label}
            onPress={item.action}
            style={({ pressed }) => [
              styles.item,
              { borderBottomColor: c.border, opacity: pressed ? 0.65 : 1 },
              i === menu.length - 1 && styles.last,
            ]}
          >
            <View style={[styles.itemIcon, { backgroundColor: c.accent }]}>
              <Feather name={item.icon as keyof typeof Feather.glyphMap} size={17} color={c.accentForeground} />
            </View>
            <Text style={[styles.itemLabel, { color: c.foreground }]}>{item.label}</Text>
            {item.right || <Feather name="chevron-right" size={17} color={c.mutedForeground} />}
          </Pressable>
        ))}
      </View>

      <SectionLabel>Account actions</SectionLabel>
      <View style={[styles.actions, { backgroundColor: c.card, borderColor: c.border }]}>
        <Pressable onPress={logout} style={({ pressed }) => [styles.actionRow, { opacity: pressed ? 0.65 : 1 }]}>
          <View style={[styles.actionIcon, { backgroundColor: c.accent }]}>
            <Feather name="log-out" size={17} color={c.accentForeground} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={[styles.actionTitle, { color: c.foreground }]}>Log out</Text>
            <Text style={[styles.actionDescription, { color: c.mutedForeground }]}>Sign out of this device</Text>
          </View>
          <Feather name="chevron-right" size={17} color={c.mutedForeground} />
        </Pressable>
        <Pressable onPress={requestDeleteAccount} style={({ pressed }) => [styles.deleteRow, { borderTopColor: c.border, opacity: pressed ? 0.65 : 1 }]}>
          <View style={[styles.actionIcon, { backgroundColor: c.destructiveSoft }]}>
            <Feather name="trash-2" size={17} color={c.destructive} />
          </View>
          <View style={styles.actionCopy}>
            <Text style={[styles.actionTitle, { color: c.destructive }]}>Delete account</Text>
            <Text style={[styles.actionDescription, { color: c.mutedForeground }]}>Remove this account from this device</Text>
          </View>
          <Feather name="chevron-right" size={17} color={c.mutedForeground} />
        </Pressable>
      </View>

      <Text style={[styles.version, { color: c.mutedForeground }]}>QuickHire Vendor · MVP</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  profile: { borderRadius: 20, padding: 17, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 },
  avatar: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: '700' },
  business: { fontSize: 16, fontWeight: '700' },
  contact: { fontSize: 12, opacity: 0.75, marginTop: 3 },
  verified: { borderRadius: 99, paddingHorizontal: 7, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 4 },
  verifiedText: { fontSize: 10, fontWeight: '700' },
  menu: { borderWidth: 1, borderRadius: 18, overflow: 'hidden', marginBottom: 24 },
  item: { minHeight: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1 },
  last: { borderBottomWidth: 0 },
  itemIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  itemLabel: { flex: 1, fontSize: 14, fontWeight: '600' },
  actions: { borderWidth: 1, borderRadius: 18, overflow: 'hidden' },
  actionRow: { minHeight: 72, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  deleteRow: { minHeight: 72, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: 1 },
  actionIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  actionCopy: { flex: 1, gap: 3 },
  actionTitle: { fontSize: 14, fontWeight: '700' },
  actionDescription: { fontSize: 12 },
  version: { textAlign: 'center', fontSize: 11, marginTop: 22 },
});
