import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { PartyRoom } from '../../data/partyRoomSamples';
import { colors } from '../../theme/colors';
import { PartyAvatarStack } from './PartyAvatarStack';

type Props = {
  room: PartyRoom;
  height: number;
  width: number;
  highlighted?: boolean;
  onPress?: () => void;
};

const CARD_INSET_H = 12;
const CARD_INSET_V = 6;
const PHOTO_WIDTH_RATIO = 0.46;

export function PartyRoomHalfTile({
  room,
  height,
  width,
  highlighted = false,
  onPress,
}: Props) {
  const hostAvatar = room.avatarUris[0];
  const initial = room.hostDisplayName.trim().charAt(0).toUpperCase() || '?';
  const cardWidth = width - CARD_INSET_H * 2;
  const cardHeight = height - CARD_INSET_V * 2;
  const photoWidth = Math.floor(cardWidth * PHOTO_WIDTH_RATIO);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.slot,
        { width, height },
        pressed && styles.slotPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Join party ${room.title}`}
    >
      <View
        style={[
          styles.card,
          { width: cardWidth, height: cardHeight },
          highlighted && styles.cardHighlighted,
          room.isHot && styles.cardHot,
        ]}
      >
        <View style={[styles.photoPanel, { width: photoWidth }]}>
          {hostAvatar ? (
            <Image
              source={{ uri: hostAvatar }}
              style={styles.photoImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.photoFallback}>
              <Text style={styles.photoInitial}>{initial}</Text>
            </View>
          )}
          <View style={styles.photoScrim} />
          {room.isHot ? <View style={styles.photoAccentRing} pointerEvents="none" /> : null}
        </View>

        <View style={[styles.fadePanel, { right: photoWidth - 24 }]} />
        <View style={[styles.fadePanelSoft, { right: photoWidth - 48 }]} />

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <View style={styles.liveBadge}>
              <View style={styles.livePulse} />
              <Text style={styles.liveBadgeText}>Live party</Text>
            </View>
            <View style={styles.mediaChip}>
              <Ionicons
                name={room.mediaType === 'video' ? 'videocam' : 'mic'}
                size={11}
                color={colors.textPrimary}
              />
              <Text style={styles.mediaChipText}>
                {room.mediaType === 'video' ? 'Video' : 'Audio'}
              </Text>
            </View>
            {room.isHot ? (
              <View style={styles.hotChip}>
                <Text style={styles.hotChipText}>Trending</Text>
              </View>
            ) : null}
            {room.isLocked ? (
              <View style={styles.lockChip}>
                <Ionicons name="lock-closed" size={11} color={colors.textPrimary} />
              </View>
            ) : null}
          </View>

          <View style={styles.copyBlock}>
            <Text style={styles.title} numberOfLines={2}>
              {room.title}
            </Text>
            <Text style={styles.hostLine}>
              <Text style={styles.hostLabel}>Host </Text>
              @{room.hostUsername}
            </Text>

            <View style={styles.tagRow}>
              {room.tags.slice(0, 2).map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.socialProof}>
              <PartyAvatarStack
                uris={room.avatarUris}
                totalCount={room.participantCount}
                maxVisible={3}
              />
              <View style={styles.countCol}>
                <Text style={styles.countPrimary}>
                  {formatCount(room.participantCount)} listening
                </Text>
                <Text style={styles.countSecondary}>
                  {room.speakerCount} on mic
                </Text>
              </View>
            </View>

            <View style={styles.joinPill}>
              <Text style={styles.joinText}>Join</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.textPrimary} />
            </View>
          </View>
        </View>

        <View style={styles.hostBadge} pointerEvents="none">
          <Text style={styles.hostBadgeText} numberOfLines={1}>
            {room.hostDisplayName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

const styles = StyleSheet.create({
  slot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  slotPressed: {
    opacity: 0.96,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  cardHighlighted: {
    borderColor: colors.accent,
    borderWidth: 1.5,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHot: {
    borderColor: 'rgba(255,45,106,0.35)',
  },
  photoPanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.surfaceMuted,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  photoInitial: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: '800',
  },
  photoScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  photoAccentRing: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.accent,
  },
  fadePanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    opacity: 0.94,
  },
  fadePanelSoft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    opacity: 0.55,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'space-between',
    maxWidth: '58%',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,45,106,0.2)',
  },
  livePulse: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.live,
  },
  liveBadgeText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  mediaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mediaChipText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
  hotChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  hotChipText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '800',
  },
  lockChip: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  copyBlock: {
    gap: 6,
    paddingVertical: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  hostLine: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  hostLabel: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  footer: {
    gap: 10,
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countCol: {
    gap: 1,
    flexShrink: 1,
  },
  countPrimary: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  countSecondary: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  joinPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  joinText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  hostBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    maxWidth: '40%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  hostBadgeText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
