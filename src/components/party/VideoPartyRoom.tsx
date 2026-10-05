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
import { PartyVideoStage } from './PartyVideoStage';

type Props = {
  room: PartyRoom;
  isActive: boolean;
  onClose: () => void;
};

export function VideoPartyRoom({ room, isActive, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [following, setFollowing] = useState(false);
  const videoSource = room.videoSource;

  if (!videoSource) {
    return null;
  }

  const coHosts = room.avatarUris.slice(1, 4);

  return (
    <View style={[styles.root, { width, height }]}>
      <PartyVideoStage
        videoSource={videoSource}
        isActive={isActive}
        width={width}
        height={height}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        <Pressable onPress={onClose} style={styles.iconBtn} accessibilityLabel="Leave party">
          <Ionicons name="chevron-down" size={26} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.topCenter}>
          <View style={styles.videoBadge}>
            <Ionicons name="videocam" size={14} color={colors.textPrimary} />
            <Text style={styles.videoBadgeText}>VIDEO PARTY</Text>
          </View>
          <Text style={styles.participantCount}>{room.participantCount} watching</Text>
        </View>
        <Pressable
          style={styles.iconBtn}
          onPress={() => Alert.alert('Share', 'Invite link coming soon.')}
        >
          <Ionicons name="share-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={[styles.speakerStrip, { top: insets.top + 64 }]} pointerEvents="box-none">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.speakerStripContent}>
          <View style={styles.onStageCard}>
            <Image source={{ uri: room.avatarUris[0] }} style={styles.onStageAvatar} />
            <View style={styles.onStageMeta}>
              <Text style={styles.onStageName}>{room.hostDisplayName}</Text>
              <Text style={styles.onStageRole}>Host · on cam</Text>
            </View>
            <View style={styles.liveDot} />
          </View>
          {coHosts.map((uri, i) => (
            <View key={uri} style={styles.coHostBubble}>
              <Image source={{ uri }} style={styles.coHostAvatar} />
              <Text style={styles.coHostLabel}>Guest {i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={[styles.rightRail, { bottom: insets.bottom + 140 }]}
        pointerEvents="box-none"
      >
        <RailAction icon="gift-outline" label="Gift" onPress={() => Alert.alert('Gift', 'Coming soon.')} accent />
        <RailAction icon="heart-outline" label="React" />
        <RailAction icon="hand-left-outline" label="Hand" />
      </View>

      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
        <Text style={styles.title} numberOfLines={2}>
          {room.title}
        </Text>
        <View style={styles.hostRow}>
          <Text style={styles.hostUser}>@{room.hostUsername}</Text>
          <Pressable
            onPress={() => setFollowing((f) => !f)}
            style={[styles.followBtn, following && styles.followBtnActive]}
          >
            <Text style={[styles.followBtnText, following && styles.followBtnTextActive]}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </Pressable>
        </View>
        <PartyRoomChat room={room} maxListHeight={110} />
      </View>
    </View>
  );
}

function RailAction({
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
    <Pressable style={styles.railAction} onPress={onPress}>
      <View style={[styles.railIcon, accent && styles.railIconAccent]}>
        <Ionicons name={icon} size={22} color={colors.textPrimary} />
      </View>
      <Text style={styles.railLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    zIndex: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  topCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  videoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 45, 106, 0.35)',
  },
  videoBadgeText: {
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
  speakerStrip: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  speakerStripContent: {
    paddingHorizontal: 12,
    gap: 10,
    alignItems: 'center',
  },
  onStageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  onStageAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  onStageMeta: {
    gap: 2,
  },
  onStageName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  onStageRole: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.live,
    marginLeft: 4,
  },
  coHostBubble: {
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  coHostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  coHostLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  rightRail: {
    position: 'absolute',
    right: 12,
    alignItems: 'center',
    gap: 14,
    zIndex: 10,
  },
  railAction: {
    alignItems: 'center',
    gap: 4,
  },
  railIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  railIconAccent: {
    backgroundColor: 'rgba(255, 45, 106, 0.3)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 45, 106, 0.5)',
  },
  railLabel: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 72,
    bottom: 0,
    paddingHorizontal: 14,
    gap: 8,
    zIndex: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  followBtnText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  followBtnTextActive: {
    color: colors.textSecondary,
  },
});
