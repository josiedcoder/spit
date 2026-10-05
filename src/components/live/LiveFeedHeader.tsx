import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export type LiveFeedFilter = 'nearby' | 'popular' | 'explore';

const FILTERS: { key: LiveFeedFilter; label: string }[] = [
  { key: 'nearby', label: 'Nearby' },
  { key: 'popular', label: 'Popular' },
  { key: 'explore', label: 'Explore' },
];

/** Breathing room under filter labels / indicator before the header edge. */
export const LIVE_FEED_HEADER_FILTER_BOTTOM_PADDING = 10;

/** Content height below safe-area (nav row + bottom padding). */
export const LIVE_FEED_HEADER_BODY_HEIGHT =
  48 + LIVE_FEED_HEADER_FILTER_BOTTOM_PADDING;

const SIDE_SLOT_WIDTH = 52;

type Props = {
  filter: LiveFeedFilter;
  onFilterChange: (filter: LiveFeedFilter) => void;
  onSearchPress?: () => void;
};

export function LiveFeedHeader({ filter, onFilterChange, onSearchPress }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrap, { paddingTop: insets.top }]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.bar,
          { paddingBottom: LIVE_FEED_HEADER_FILTER_BOTTOM_PADDING },
        ]}
      >
        <View style={[styles.sideSlot, styles.sideSlotLeft]}>
          <View
            style={styles.liveIconWrap}
            accessibilityRole="image"
            accessibilityLabel="Live streams"
          >
            <MaterialCommunityIcons
              name="video-wireless"
              size={26}
              color={colors.accent}
            />
          </View>
        </View>

        <View style={styles.centerSlot}>
          {FILTERS.map((item) => {
            const selected = filter === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => onFilterChange(item.key)}
                style={({ pressed }) => [
                  styles.filterChip,
                  selected ? styles.filterChipActive : styles.filterChipIdle,
                  pressed && styles.filterChipPressed,
                ]}
                hitSlop={4}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
              >
                <Text
                  style={[
                    styles.filterLabel,
                    selected && styles.filterLabelSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.sideSlot, styles.sideSlotRight]}>
          <Pressable
            onPress={onSearchPress}
            style={({ pressed }) => [styles.searchBtn, pressed && styles.searchBtnPressed]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Search live streams"
          >
            <Ionicons name="search" size={24} color={colors.textPrimary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/** Total top inset for content that sits below the header overlay. */
export function liveFeedHeaderTotalInset(safeAreaTop: number): number {
  return safeAreaTop + LIVE_FEED_HEADER_BODY_HEIGHT;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 20,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
    gap: 12,
  },
  sideSlot: {
    width: SIDE_SLOT_WIDTH,
    justifyContent: 'center',
  },
  sideSlotLeft: {
    alignItems: 'flex-start',
  },
  sideSlotRight: {
    alignItems: 'flex-end',
  },
  liveIconWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 2,
  },
  filterChip: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 76,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  filterChipIdle: {
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderColor: 'rgba(255, 255, 255, 0.28)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      default: {},
    }),
  },
  filterChipPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  filterLabel: {
    color: 'rgba(255, 255, 255, 0.58)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  filterLabelSelected: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  searchBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnPressed: {
    opacity: 0.65,
  },
});
