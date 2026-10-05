import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ProfileMenuItem } from '../../data/profileSamples';
import { colors } from '../../theme/colors';

type Props = {
  item: ProfileMenuItem;
  onPress: () => void;
  showDivider?: boolean;
};

export function ProfileMenuRow({ item, onPress, showDivider = true }: Props) {
  const iconColor = item.destructive ? colors.live : colors.textSecondary;
  const labelColor = item.destructive ? colors.live : colors.textPrimary;

  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        accessibilityRole="button"
        accessibilityLabel={item.label}
      >
        <View style={styles.iconWrap}>
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={22}
            color={iconColor}
          />
        </View>
        <Text style={[styles.label, { color: labelColor }]}>{item.label}</Text>
        {!item.destructive ? (
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        ) : null}
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 16 + 36 + 12,
  },
});
