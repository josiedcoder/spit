import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { liveChatForStream, type LiveChatMessage } from '../../data/liveStreamChatSamples';
import type { LiveFeedEntry } from '../../data/liveFeedSamples';
import { colors } from '../../theme/colors';
import { LiveFeedCellVideo } from './LiveFeedCellVideo';

type Props = {
  item: LiveFeedEntry;
  isActive: boolean;
  onClose: () => void;
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

export function LiveStreamRoom({ item, isActive, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [following, setFollowing] = useState(false);
  const [chatDraft, setChatDraft] = useState('');
  const [messages, setMessages] = useState(() => liveChatForStream(item.id));

  const sendChat = useCallback(() => {
    const text = chatDraft.trim();
    if (!text) {
      return;
    }
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, username: 'you', text },
    ]);
    setChatDraft('');
  }, [chatDraft]);

  const onGift = () => {
    Alert.alert('Send gift', 'Gift shop coming soon.');
  };

  const onFollow = () => {
    setFollowing((f) => !f);
  };

  const initial = item.displayName.trim().charAt(0).toUpperCase() || '?';

  return (
    <View style={[styles.root, { width, height }]}>
      <LiveFeedCellVideo
        item={item}
        isActive={isActive}
        muted={false}
        width={width}
        height={height}
      />

      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        <Pressable
          onPress={onClose}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Close live"
        >
          <Ionicons name="chevron-down" size={26} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.topCenter}>
          {item.isLive ? (
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.livePillText}>LIVE</Text>
            </View>
          ) : null}
          {item.viewerCount != null ? (
            <View style={styles.viewerPill}>
              <Ionicons name="eye" size={14} color={colors.textPrimary} />
              <Text style={styles.viewerPillText}>
                {formatViewers(item.viewerCount)}
              </Text>
            </View>
          ) : null}
        </View>

        <Pressable
          style={styles.iconBtn}
          onPress={() => Alert.alert('Share', 'Share link coming soon.')}
          accessibilityLabel="Share stream"
        >
          <Ionicons name="share-outline" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View
        style={[styles.rightRail, { bottom: insets.bottom + 100 }]}
        pointerEvents="box-none"
      >
        <RoomAction icon="gift" label="Gift" onPress={onGift} accent />
        <RoomAction
          icon="heart"
          label="Like"
          onPress={() => Alert.alert('Like', 'Thanks for the love!')}
        />
        <RoomAction
          icon="chatbubble-ellipses"
          label="Chat"
          onPress={() => Alert.alert('Chat', 'Focus the message bar below.')}
        />
      </View>

      <View
        style={[styles.bottomStack, { paddingBottom: Math.max(insets.bottom, 12) }]}
        pointerEvents="box-none"
      >
        <View style={styles.hostRow}>
          {item.avatarUri ? (
            <Image source={{ uri: item.avatarUri }} style={styles.hostAvatar} />
          ) : (
            <View style={styles.hostAvatarFallback}>
              <Text style={styles.hostInitial}>{initial}</Text>
            </View>
          )}
          <View style={styles.hostText}>
            <Text style={styles.hostName}>{item.displayName}</Text>
            <Text style={styles.hostUser}>@{item.username}</Text>
          </View>
          <Pressable
            onPress={onFollow}
            style={[styles.followBtn, following && styles.followBtnActive]}
          >
            <Text style={[styles.followBtnText, following && styles.followBtnTextActive]}>
              {following ? 'Following' : 'Follow'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.caption} numberOfLines={2}>
          {item.caption}
        </Text>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: msg }) => <ChatLine message={msg} />}
        />

        <View style={styles.composerRow}>
          <TextInput
            value={chatDraft}
            onChangeText={setChatDraft}
            placeholder="Say something…"
            placeholderTextColor="rgba(255,255,255,0.45)"
            style={styles.composerInput}
            returnKeyType="send"
            onSubmitEditing={sendChat}
          />
          <Pressable onPress={sendChat} style={styles.sendBtn}>
            <Ionicons name="send" size={18} color={colors.textPrimary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ChatLine({ message }: { message: LiveChatMessage }) {
  const isGift = message.highlight === 'gift';
  const isFollow = message.highlight === 'follow';

  return (
    <View style={[styles.chatLine, (isGift || isFollow) && styles.chatLineHighlight]}>
      {isGift ? (
        <Ionicons name="gift" size={12} color={colors.accent} style={styles.chatIcon} />
      ) : null}
      {isFollow ? (
        <Ionicons name="person-add" size={12} color={colors.accentSecondary} style={styles.chatIcon} />
      ) : null}
      <Text style={styles.chatUser}>{message.username}</Text>
      <Text style={styles.chatText}>{message.text}</Text>
    </View>
  );
}

function RoomAction({
  icon,
  label,
  onPress,
  accent,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  accent?: boolean;
}) {
  return (
    <Pressable style={styles.roomAction} onPress={onPress} accessibilityLabel={label}>
      <View style={[styles.roomActionIcon, accent && styles.roomActionIconAccent]}>
        <Ionicons name={icon} size={24} color={accent ? colors.textPrimary : colors.textPrimary} />
      </View>
      <Text style={styles.roomActionLabel}>{label}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.live,
  },
  livePillText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  viewerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  viewerPillText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  rightRail: {
    position: 'absolute',
    right: 12,
    alignItems: 'center',
    gap: 14,
    zIndex: 10,
  },
  roomAction: {
    alignItems: 'center',
    gap: 4,
  },
  roomActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  roomActionIconAccent: {
    backgroundColor: 'rgba(255, 45, 106, 0.35)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 45, 106, 0.55)',
  },
  roomActionLabel: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '600',
  },
  bottomStack: {
    position: 'absolute',
    left: 0,
    right: 72,
    bottom: 0,
    paddingHorizontal: 14,
    gap: 8,
    zIndex: 10,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hostAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  hostAvatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  hostInitial: {
    color: colors.textPrimary,
    fontWeight: '800',
    fontSize: 16,
  },
  hostText: {
    flex: 1,
    gap: 2,
  },
  hostName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  hostUser: {
    color: colors.textSecondary,
    fontSize: 12,
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
  caption: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    opacity: 0.92,
  },
  chatList: {
    maxHeight: 120,
  },
  chatListContent: {
    gap: 6,
    paddingVertical: 4,
  },
  chatLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.42)',
    maxWidth: '100%',
  },
  chatLineHighlight: {
    backgroundColor: 'rgba(255, 45, 106, 0.18)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 45, 106, 0.35)',
  },
  chatIcon: {
    marginRight: 2,
  },
  chatUser: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '700',
  },
  chatText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  composerInput: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: colors.textPrimary,
    fontSize: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
});
