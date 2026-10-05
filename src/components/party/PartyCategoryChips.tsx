import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { PartyCategory } from '../../data/partyRoomSamples';
import { PARTY_CATEGORIES } from '../../data/partyRoomSamples';
import { colors } from '../../theme/colors';

type Props = {
  value: PartyCategory;
  onChange: (category: PartyCategory) => void;
};

export function PartyCategoryChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {PARTY_CATEGORIES.map((cat) => {
        const selected = value === cat.key;
        return (
          <Pressable
            key={cat.key}
            onPress={() => onChange(cat.key)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: 'rgba(255,45,106,0.18)',
    borderColor: colors.accent,
  },
  chipLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  chipLabelSelected: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
