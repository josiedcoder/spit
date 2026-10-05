import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { LiveFeedEntry } from '../../data/liveFeedSamples';
import { colors } from '../../theme/colors';
import { LiveFeedCellVideo } from './LiveFeedCellVideo';
import { liveFeedHeaderTotalInset, type LiveFeedFilter } from './LiveFeedHeader';

type Props = {
  item: LiveFeedEntry;
  isActive: boolean;
  filter: LiveFeedFilter;
  onOpenStream?: (streamId: string) => void;
  cellWidth: number;
  cellHeight: number;
  bottomContentInset?: number;
};

function formatViewers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return String(count);
}

export function LiveFeedItem({
  item,
  isActive,
  filter,
  onOpenStream,
  cellWidth,
  cellHeight,
  bottomContentInset = 24,
}: Props) {
  const insets = useSafeAreaInsets();
  const statusTop = liveFeedHeaderTotalInset(insets.top) + 8;

  const openStream = () => {
    if (item.isLive && onOpenStream) {
      onOpenStream(item.id);
    }
  };

  return (
    <View
      style={[styles.page, { width: cellWidth, height: cellHeight }]}
      pointerEvents="box-none"
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LiveFeedCellVideo
          item={item}
          isActive={isActive}
          muted
          width={cellWidth}
          height={cellHeight}
        />
      </View>

      {isActive && item.isLive && onOpenStream ? (
        <Pressable
          style={styles.tapLayer}
          onPress={openStream}
          accessibilityRole="button"
          accessibilityLabel="Open live stream"
        />
      ) : null}

      {!item.isLive ? (
        <View style={styles.offlineDim} pointerEvents="none" />
      ) : null}

      <View style={[styles.topRow, { top: statusTop }]}>
        {item.isLive ? (
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.livePillText}>LIVE</Text>
            {item.viewerCount != null ? (
              <Text style={styles.viewerText}>
                {formatViewers(item.viewerCount)} watching
              </Text>
            ) : null}
          </View>
        ) : (
          <View style={styles.offlinePill}>
            <Ionicons name="moon-outline" size={14} color={colors.textPrimary} />
            <Text style={styles.offlinePillText}>Offline</Text>
          </View>
        )}
      </View>

      <View style={[styles.bottomMeta, { paddingBottom: bottomContentInset }]}>
        <View style={styles.metaTextCol}>
          <Text style={styles.displayName}>@{item.username}</Text>
          <Text style={styles.caption} numberOfLines={2}>
            {item.caption}
          </Text>
          {item.isLive ? (
            <Text style={styles.mutedHint}>
              {filterLabel(filter)}
              {onOpenStream ? ' · tap to watch live' : ''}
            </Text>
          ) : null}
        </View>
      </View>

      {isActive && item.isLive && onOpenStream ? (
        <View style={styles.watchHint} pointerEvents="none">
          <Ionicons name="play-circle" size={20} color={colors.textPrimary} />
          <Text style={styles.watchHintText}>Watch live</Text>
        </View>
      ) : null}
    </View>
  );
}

function filterLabel(filter: LiveFeedFilter): string {
  switch (filter) {
    case 'nearby':
      return 'Nearby';
    case 'explore':
      return 'Explore';
    default:
      return 'Popular';
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  tapLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  offlineDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 2,
  },
  watchHint: {
    position: 'absolute',
    alignSelf: 'center',
    top: '44%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 3,
  },
  watchHintText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  topRow: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 4,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.live,
  },
  livePillText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  viewerText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  offlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  offlinePillText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  bottomMeta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    zIndex: 4,
  },
  metaTextCol: {
    gap: 6,
    paddingBottom: 4,
  },
  displayName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  caption: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.92,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  mutedHint: {
    color: colors.textPrimary,
    fontSize: 11,
    opacity: 0.75,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
