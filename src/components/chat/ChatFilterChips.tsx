import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { CHAT_FILTERS, type ChatFilter } from '../../data/chatConversationSamples';
import { colors } from '../../theme/colors';

type Props = {
  value: ChatFilter;
  onChange: (filter: ChatFilter) => void;
};

export function ChatFilterChips({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {CHAT_FILTERS.map((item) => {
        const selected = value === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
              {item.label}
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
