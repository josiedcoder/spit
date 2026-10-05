import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PartyRoom } from '../../data/partyRoomSamples';
import { colors } from '../../theme/colors';
import { PartyRoomChat } from './PartyRoomChat';

type Props = {
  room: PartyRoom;
  onClose: () => void;
};

export function AudioPartyRoom({ room, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [following, setFollowing] = useState(false);
  const speakers = room.avatarUris.slice(0, Math.min(room.speakerCount, 8));

  return (
    <View style={[styles.root, { width, height }]}>
      <View style={styles.bgGlowTop} pointerEvents="none" />
      <View style={styles.bgGlowBottom} pointerEvents="none" />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={onClose} style={styles.iconBtn} accessibilityLabel="Leave party">
          <Ionicons name="chevron-down" size={26} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.topMeta}>
          <View style={styles.audioBadge}>
            <Ionicons name="mic" size={14} color={colors.textPrimary} />
            <Text style={styles.audioBadgeText}>AUDIO PARTY</Text>
          </View>
          <Text style={styles.participantCount}>
            {room.participantCount} in room · {room.speakerCount} on mic
          </Text>
        </View>
        <Pressable
          style={styles.iconBtn}
          onPress={() => Alert.alert('Share', 'Invite link coming soon.')}
        >
          <Ionicons name="share-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{room.title}</Text>
        <View style={styles.tagRow}>
          {room.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.stage}>
          {speakers.map((uri, index) => (
            <View key={`${uri}-${index}`} style={styles.speakerSlot}>
              <View style={[styles.speakerRing, index === 0 && styles.speakerRingHost]}>
                <Image source={{ uri }} style={styles.speakerAvatar} />
                {index === 0 ? (
                  <View style={styles.hostMic}>
                    <Ionicons name="mic" size={10} color={colors.textPrimary} />
                  </View>
                ) : null}
              </View>
              <Text style={styles.speakerLabel} numberOfLines={1}>
                {index === 0 ? room.hostDisplayName : `Speaker ${index + 1}`}
              </Text>
              <View style={styles.waveRow}>
                {[0.4, 0.7, 1, 0.6, 0.85].map((h, i) => (
                  <View key={i} style={[styles.waveBar, { height: 8 + h * 14 }]} />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.hostRow}>
          <Text style={styles.hostUser}>Hosted by @{room.hostUsername}</Text>
          <Pressable
            onPress={() => setFollowing((f) => !f)}
            style={[styles.followBtn, following && styles.followBtnActive]}
          >
            <Text style={[styles.followBtnText, following && styles.followBtnTextActive]}>
              {following ? 'Following' : 'Follow host'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.actionRow}>
          <PartyRoomAction icon="gift-outline" label="Gift" onPress={() => Alert.alert('Gift', 'Coming soon.')} />
          <PartyRoomAction icon="hand-left-outline" label="Raise hand" accent />
          <PartyRoomAction icon="heart-outline" label="React" />
        </View>
        <PartyRoomChat room={room} maxListHeight={100} />
      </View>
    </View>
  );
}

function PartyRoomAction({
  icon,
  label,
  onPress,
  accent,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  accent?: boolean;
}) {
  return (
    <Pressable style={styles.roomAction} onPress={onPress}>
      <View style={[styles.roomActionIcon, accent && styles.roomActionIconAccent]}>
        <Ionicons name={icon} size={22} color={colors.textPrimary} />
      </View>
      <Text style={styles.roomActionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
  },
  bgGlowTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.accentSecondary,
    opacity: 0.15,
  },
  bgGlowBottom: {
    position: 'absolute',
    bottom: 120,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.accent,
    opacity: 0.12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    gap: 8,
    zIndex: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  topMeta: {
    flex: 1,
    gap: 4,
    paddingTop: 2,
  },
  audioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(124, 58, 237, 0.35)',
  },
  audioBadgeText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  participantCount: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  stage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  speakerSlot: {
    width: 96,
    alignItems: 'center',
    gap: 6,
  },
  speakerRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  speakerRingHost: {
    borderColor: colors.accent,
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  speakerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  hostMic: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  speakerLabel: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    maxWidth: 96,
    textAlign: 'center',
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 22,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.accent,
    opacity: 0.85,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  hostUser: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  followBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  followBtnText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  followBtnTextActive: {
    color: colors.textSecondary,
  },
  bottom: {
    paddingHorizontal: 14,
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: 'rgba(11,11,15,0.95)',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  roomAction: {
    alignItems: 'center',
    gap: 4,
  },
  roomActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  roomActionIconAccent: {
    backgroundColor: 'rgba(255, 45, 106, 0.25)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 45, 106, 0.45)',
  },
  roomActionLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
});
