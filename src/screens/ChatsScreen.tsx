import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatConversationRow } from '../components/chat/ChatConversationRow';
import { ChatFilterChips } from '../components/chat/ChatFilterChips';
import {
  filterChatConversations,
  type ChatConversation,
  type ChatFilter,
} from '../data/chatConversationSamples';
import { colors } from '../theme/colors';

export function ChatsScreen() {
  const [filter, setFilter] = useState<ChatFilter>('all');

  const conversations = useMemo(() => filterChatConversations(filter), [filter]);

  const openConversation = (item: ChatConversation) => {
    Alert.alert(item.displayName, 'Thread view coming soon.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Messages</Text>
            <Text style={styles.subtitle}>DMs, live pings & party invites</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={styles.iconBtn}
              accessibilityLabel="Search messages"
              onPress={() => Alert.alert('Search', 'Message search coming soon.')}
            >
              <Ionicons name="search" size={22} color={colors.textPrimary} />
            </Pressable>
            <Pressable
              style={styles.composeBtn}
              accessibilityLabel="New message"
              onPress={() => Alert.alert('New message', 'Compose flow coming soon.')}
            >
              <Ionicons name="create-outline" size={22} color={colors.textPrimary} />
            </Pressable>
          </View>
        </View>

        <ChatFilterChips value={filter} onChange={setFilter} />
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatConversationRow conversation={item} onPress={() => openConversation(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="chatbubbles-outline" size={40} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Nothing here</Text>
            <Text style={styles.emptyBody}>Try another filter or start a new chat.</Text>
          </View>
        }
        contentContainerStyle={
          conversations.length === 0 ? styles.emptyList : styles.listContent
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    gap: 14,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  composeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  listContent: {
    paddingBottom: 24,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 16 + 54 + 12,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  empty: {
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyBody: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
