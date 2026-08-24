import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, type PressableProps, type TextInputProps, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import colors from '@/constants/colors';

export function Logo({ compact = false }: { compact?: boolean }) {
  const c = useColors();
  return <View style={styles.logoRow}><View style={[styles.logoMark, { backgroundColor: c.primary }]}><Feather name="truck" size={compact ? 15 : 20} color={c.primaryForeground} /></View>{!compact && <Text style={[styles.logoText, { color: c.foreground }]}>QuickHire</Text>}</View>;
}

export function AppHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const c = useColors();
  return <View style={styles.header}><View style={styles.headerCopy}><Text style={[styles.eyebrow, { color: c.primary }]}>QUICKHIRE VENDOR</Text><Text style={[styles.headerTitle, { color: c.foreground }]}>{title}</Text>{subtitle && <Text style={[styles.headerSubtitle, { color: c.mutedForeground }]}>{subtitle}</Text>}</View>{action}</View>;
}

export function PrimaryButton({ title, onPress, loading = false, icon, disabled = false, style }: { title: string; onPress: PressableProps['onPress']; loading?: boolean; icon?: keyof typeof Feather.glyphMap; disabled?: boolean; style?: ViewStyle }) {
  const c = useColors();
  return <Pressable testID={'button-' + title.toLowerCase().replace(/\s/g, '-')} onPress={onPress} disabled={disabled || loading} style={({ pressed }) => [styles.primaryButton, { backgroundColor: c.primary, opacity: disabled || loading ? 0.55 : pressed ? 0.8 : 1 }, style]}>{loading ? <ActivityIndicator color={c.primaryForeground} /> : <>{icon && <Feather name={icon} size={17} color={c.primaryForeground} />}<Text style={[styles.primaryButtonText, { color: c.primaryForeground }]}>{title}</Text></>}</Pressable>;
}

export function GhostButton({ title, onPress, icon }: { title: string; onPress: PressableProps['onPress']; icon?: keyof typeof Feather.glyphMap }) {
  const c = useColors();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.ghostButton, { borderColor: c.border, opacity: pressed ? 0.7 : 1 }]}>{icon && <Feather name={icon} size={16} color={c.foreground} />}<Text style={[styles.ghostButtonText, { color: c.foreground }]}>{title}</Text></Pressable>;
}

export function Field({ label, error, ...props }: TextInputProps & { label: string; error?: string }) {
  const c = useColors();
  return <View style={styles.field}><Text style={[styles.fieldLabel, { color: c.foreground }]}>{label}</Text><TextInput {...props} placeholderTextColor={c.mutedForeground} style={[styles.input, { color: c.foreground, borderColor: error ? c.destructive : c.border, backgroundColor: c.card }]} />{error && <Text style={[styles.errorText, { color: c.destructive }]}>{error}</Text>}</View>;
}

export function StatusPill({ status }: { status: string }) {
  const c = useColors();
  const available = status === 'available'; const booked = status === 'booked';
  return <View style={[styles.statusPill, { backgroundColor: available ? c.successSoft : booked ? c.warningSoft : c.muted }]}><View style={[styles.statusDot, { backgroundColor: available ? c.success : booked ? c.warning : c.mutedForeground }]} /><Text style={[styles.statusText, { color: available ? c.success : booked ? c.warning : c.mutedForeground }]}>{status === 'maintenance' ? 'Unavailable' : status.charAt(0).toUpperCase() + status.slice(1)}</Text></View>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) { const c = useColors(); return <Text style={[styles.sectionLabel, { color: c.mutedForeground }]}>{children}</Text>; }

export function EmptyState({ icon = 'inbox', title, message, action }: { icon?: keyof typeof Feather.glyphMap; title: string; message: string; action?: React.ReactNode }) { const c = useColors(); return <View style={[styles.empty, { backgroundColor: c.card, borderColor: c.border }]}><Feather name={icon} size={30} color={c.mutedForeground} /><Text style={[styles.emptyTitle, { color: c.foreground }]}>{title}</Text><Text style={[styles.emptyMessage, { color: c.mutedForeground }]}>{message}</Text>{action}</View>; }

export const styles = StyleSheet.create({
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 9 }, logoMark: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, logoText: { fontSize: 22, fontWeight: '700', letterSpacing: -0.7 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 18 }, headerCopy: { flex: 1 }, eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: 5 }, headerTitle: { fontSize: 28, fontWeight: '700', letterSpacing: -0.7 }, headerSubtitle: { fontSize: 14, marginTop: 4 },
  primaryButton: { minHeight: 50, paddingHorizontal: 18, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }, primaryButtonText: { fontSize: 15, fontWeight: '700' }, ghostButton: { minHeight: 48, borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }, ghostButtonText: { fontSize: 14, fontWeight: '600' },
  field: { gap: 7, marginBottom: 16 }, fieldLabel: { fontSize: 13, fontWeight: '600' }, input: { minHeight: 50, borderWidth: 1, borderRadius: 13, paddingHorizontal: 15, fontSize: 16 }, errorText: { fontSize: 12, marginTop: -2 },
  statusPill: { alignSelf: 'flex-start', borderRadius: 99, paddingHorizontal: 9, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 6 }, statusDot: { width: 7, height: 7, borderRadius: 99 }, statusText: { fontSize: 12, fontWeight: '700' }, sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 10 }, empty: { borderWidth: 1, borderRadius: 18, padding: 28, alignItems: 'center', gap: 9 }, emptyTitle: { fontSize: 17, fontWeight: '700', marginTop: 4 }, emptyMessage: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
