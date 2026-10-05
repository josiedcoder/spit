import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ChatConversation } from '../../data/chatConversationSamples';
import { colors } from '../../theme/colors';

type Props = {
  conversation: ChatConversation;
  onPress: () => void;
};

function formatUnread(count: number): string {
  return count > 99 ? '99+' : String(count);
}

export function ChatConversationRow({ conversation, onPress }: Props) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityRole="button"
      accessibilityLabel={`${conversation.displayName}. ${conversation.lastMessage}`}
    >
      <View style={styles.avatarWrap}>
        <Image source={{ uri: conversation.avatarUri }} style={styles.avatar} />
        {conversation.isLive ? (
          <View style={styles.liveRing}>
            <View style={styles.liveDot} />
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={styles.topLine}>
          <Text style={[styles.name, hasUnread && styles.nameUnread]} numberOfLines={1}>
            {conversation.displayName}
          </Text>
          <Text style={[styles.time, hasUnread && styles.timeUnread]}>
            {conversation.timestamp}
          </Text>
        </View>

        <View style={styles.bottomLine}>
          <View style={styles.previewWrap}>
            {conversation.isInvite ? (
              <Ionicons
                name="mail-unread-outline"
                size={14}
                color={hasUnread ? colors.accent : colors.textSecondary}
                style={styles.previewIcon}
              />
            ) : conversation.youSentLast ? (
              <Ionicons
                name="checkmark-done"
                size={14}
                color={colors.textSecondary}
                style={styles.previewIcon}
              />
            ) : null}
            <Text
              style={[styles.preview, hasUnread && styles.previewUnread]}
              numberOfLines={1}
            >
              {conversation.lastMessage}
            </Text>
          </View>
          {hasUnread ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{formatUnread(conversation.unreadCount)}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const AVATAR = 54;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  avatarWrap: {
    width: AVATAR,
    height: AVATAR,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: colors.surfaceMuted,
  },
  liveRing: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.live,
  },
  body: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  nameUnread: {
    fontWeight: '700',
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  timeUnread: {
    color: colors.accent,
    fontWeight: '700',
  },
  bottomLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  previewWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  previewIcon: {
    marginRight: 4,
  },
  preview: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  previewUnread: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '800',
  },
});
