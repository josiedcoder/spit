import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { partyChatForRoom, type PartyChatMessage } from '../../data/partyChatSamples';
import type { PartyRoom } from '../../data/partyRoomSamples';
import { colors } from '../../theme/colors';

type Props = {
  room: PartyRoom;
  maxListHeight?: number;
};

export function PartyRoomChat({ room, maxListHeight = 120 }: Props) {
  const [chatDraft, setChatDraft] = useState('');
  const [messages, setMessages] = useState(() => partyChatForRoom(room.id));

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

  return (
    <View style={styles.wrap}>
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        style={{ maxHeight: maxListHeight }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PartyChatLine message={item} />}
      />
      <View style={styles.composerRow}>
        <TextInput
          value={chatDraft}
          onChangeText={setChatDraft}
          placeholder="Message the room…"
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
  );
}

function PartyChatLine({ message }: { message: PartyChatMessage }) {
  const isGift = message.highlight === 'gift';
  const isJoin = message.highlight === 'join';

  return (
    <View style={[styles.chatLine, (isGift || isJoin) && styles.chatLineHighlight]}>
      {isGift ? (
        <Ionicons name="gift" size={12} color={colors.accent} style={styles.chatIcon} />
      ) : null}
      {isJoin ? (
        <Ionicons name="enter-outline" size={12} color={colors.accentSecondary} style={styles.chatIcon} />
      ) : null}
      <Text style={styles.chatUser}>{message.username}</Text>
      <Text style={styles.chatText}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  listContent: {
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
    backgroundColor: 'rgba(124, 58, 237, 0.22)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(124, 58, 237, 0.4)',
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
