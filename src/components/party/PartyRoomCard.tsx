import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { PartyRoom } from '../../data/partyRoomSamples';
import { colors } from '../../theme/colors';
import { PartyAvatarStack } from './PartyAvatarStack';

type Props = {
  room: PartyRoom;
  onPress?: () => void;
};

export function PartyRoomCard({ room, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Join party ${room.title}`}
    >
      <View style={styles.iconCol}>
        <View style={[styles.iconCircle, room.isHot && styles.iconCircleHot]}>
          <Ionicons
            name={room.isLocked ? 'lock-closed' : 'mic'}
            size={22}
            color={room.isHot ? colors.accent : colors.textPrimary}
          />
        </View>
        {room.isHot ? <View style={styles.liveDot} /> : null}
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {room.title}
          </Text>
          {room.isLocked ? (
            <Ionicons name="lock-closed-outline" size={14} color={colors.textSecondary} />
          ) : null}
        </View>
        <Text style={styles.host}>@{room.hostUsername}</Text>

        <View style={styles.tagsRow}>
          {room.tags.slice(0, 2).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <PartyAvatarStack uris={room.avatarUris} totalCount={room.participantCount} />
          <Text style={styles.counts}>
            {room.participantCount} · {room.speakerCount} on mic
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  cardPressed: {
    opacity: 0.9,
  },
  iconCol: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleHot: {
    borderWidth: 1,
    borderColor: 'rgba(255,45,106,0.45)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.live,
    marginTop: 6,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  host: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: colors.surfaceMuted,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  counts: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
});
