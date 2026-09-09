import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useListBookings } from '@workspace/api-client-react';
import { AppHeader, EmptyState, StatusPill } from '@/components/ui';
import { useColors } from '@/hooks/useColors';

export default function NotificationsScreen() {
  const c = useColors();
  const bookings = useListBookings({ vendorId: 1 });
  const updates = useMemo(
    () => [...(bookings.data ?? [])].sort((a, b) => new Date(b.pickupDate).getTime() - new Date(a.pickupDate).getTime()),
    [bookings.data],
  );

  return <View style={[styles.screen, { backgroundColor: c.background }]}>
    <FlatList
      data={updates}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.content}
      refreshing={bookings.isFetching}
      onRefresh={() => { void bookings.refetch(); }}
      ListHeaderComponent={<AppHeader title="Notifications" subtitle="Booking updates and alerts" />}
      ListEmptyComponent={!bookings.isFetching ? <EmptyState icon="bell" title="No notifications yet" message="New booking updates will appear here." /> : null}
      renderItem={({ item }) => <Pressable onPress={() => router.push({ pathname: '/booking/[id]', params: { id: String(item.id) } })} style={({ pressed }) => [styles.card, { backgroundColor: c.card, borderColor: c.border, opacity: pressed ? 0.7 : 1 }]}>
        <View style={[styles.icon, { backgroundColor: c.accent }]}><Feather name="calendar" size={18} color={c.accentForeground} /></View>
        <View style={styles.copy}>
          <View style={styles.titleRow}><Text style={[styles.title, { color: c.foreground }]}>{item.status === 'pending' ? 'Booking request' : 'Booking update'}</Text><StatusPill status={item.status} /></View>
          <Text style={[styles.message, { color: c.mutedForeground }]}>{item.vehicleName || 'Vehicle booking'} · {item.userName || 'Customer'}</Text>
          <Text style={[styles.detail, { color: c.mutedForeground }]}>{new Date(item.pickupDate).toLocaleDateString()} · {item.pickupLocation}</Text>
        </View>
        <Feather name="chevron-right" size={17} color={c.mutedForeground} />
      </Pressable>}
    />
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingBottom: 36 },
  card: { marginHorizontal: 20, marginBottom: 10, padding: 14, borderWidth: 1, borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  title: { flex: 1, fontSize: 14, fontWeight: '700' },
  message: { fontSize: 13 },
  detail: { fontSize: 12 },
});