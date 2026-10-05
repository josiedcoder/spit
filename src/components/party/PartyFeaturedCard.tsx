import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { PartyRoom } from '../../data/partyRoomSamples';
import { colors } from '../../theme/colors';
import { PartyAvatarStack } from './PartyAvatarStack';

type Props = {
  room: PartyRoom;
  onJoinPress?: () => void;
};

export function PartyFeaturedCard({ room, onJoinPress }: Props) {
  return (
    <Pressable
      onPress={onJoinPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Join featured party ${room.title}`}
    >
      <View style={styles.gradientWrap}>
        <View style={styles.gradientFallback} />
        <View style={styles.inner}>
          <View style={styles.topRow}>
            <View style={styles.spotlightPill}>
              <Ionicons name="sparkles" size={12} color={colors.textPrimary} />
              <Text style={styles.spotlightText}>Spotlight</Text>
            </View>
            {room.isHot ? (
              <View style={styles.hotPill}>
                <Text style={styles.hotText}>HOT</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {room.title}
          </Text>
          <Text style={styles.host}>
            Hosted by @{room.hostUsername}
          </Text>

          <View style={styles.bottomRow}>
            <PartyAvatarStack uris={room.avatarUris} totalCount={room.participantCount} />
            <Text style={styles.meta}>
              {room.participantCount} in room · {room.speakerCount} speaking
            </Text>
          </View>

          <View style={styles.joinBtn}>
            <Ionicons name="headset" size={18} color={colors.textPrimary} />
            <Text style={styles.joinLabel}>Join party</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,45,106,0.35)',
  },
  cardPressed: {
    opacity: 0.92,
  },
  gradientWrap: {
    minHeight: 168,
  },
  gradientFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.accentSecondary,
    opacity: 0.35,
  },
  inner: {
    padding: 18,
    gap: 10,
    backgroundColor: 'rgba(22,22,29,0.75)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spotlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  spotlightText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  hotPill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  hotText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '900',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  host: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },
  joinBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  joinLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
});
