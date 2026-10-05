export type ChatFilter = 'all' | 'unread' | 'live' | 'invites';

export type ChatConversation = {
  id: string;
  username: string;
  displayName: string;
  avatarUri: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isLive?: boolean;
  isInvite?: boolean;
  youSentLast?: boolean;
};

export const CHAT_FILTERS: { key: ChatFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'live', label: 'Live' },
  { key: 'invites', label: 'Invites' },
];

export const CHAT_CONVERSATIONS: ChatConversation[] = [
  {
    id: '1',
    username: 'maya_live',
    displayName: 'Maya',
    avatarUri: 'https://i.pravatar.cc/150?u=maya_live',
    lastMessage: 'Jump in — we’re doing Q&A in 2 min 🔥',
    timestamp: '2m',
    unreadCount: 2,
    isLive: true,
  },
  {
    id: '2',
    username: 'dj_knox',
    displayName: 'Knox',
    avatarUri: 'https://i.pravatar.cc/150?u=dj_knox',
    lastMessage: 'You: Sent a party invite',
    timestamp: '18m',
    unreadCount: 0,
    youSentLast: true,
  },
  {
    id: '3',
    username: 'party_bot',
    displayName: 'Neon Room',
    avatarUri: 'https://i.pravatar.cc/150?u=neon_room',
    lastMessage: 'Invite: Join “Late Night Vibes” party',
    timestamp: '1h',
    unreadCount: 1,
    isInvite: true,
  },
  {
    id: '4',
    username: 'suri_offline',
    displayName: 'Suri',
    avatarUri: 'https://i.pravatar.cc/150?u=suri_offline',
    lastMessage: 'Thanks for the gift! Means a lot ✨',
    timestamp: '3h',
    unreadCount: 0,
  },
  {
    id: '5',
    username: 'alex_streams',
    displayName: 'Alex',
    avatarUri: 'https://i.pravatar.cc/150?u=alex_streams',
    lastMessage: 'Stream ended — catch the replay?',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '6',
    username: 'team_spit',
    displayName: 'Spit Team',
    avatarUri: 'https://i.pravatar.cc/150?u=team_spit',
    lastMessage: 'Your go-live checklist is ready.',
    timestamp: 'Mon',
    unreadCount: 1,
    isInvite: true,
  },
  {
    id: '7',
    username: 'jules_party',
    displayName: 'Jules',
    avatarUri: 'https://i.pravatar.cc/150?u=jules_party',
    lastMessage: 'Room is popping — slide through',
    timestamp: 'Mon',
    unreadCount: 0,
    isLive: true,
  },
];

export function filterChatConversations(filter: ChatFilter): ChatConversation[] {
  switch (filter) {
    case 'unread':
      return CHAT_CONVERSATIONS.filter((c) => c.unreadCount > 0);
    case 'live':
      return CHAT_CONVERSATIONS.filter((c) => c.isLive);
    case 'invites':
      return CHAT_CONVERSATIONS.filter((c) => c.isInvite);
    default:
      return CHAT_CONVERSATIONS;
  }
}

export function totalChatUnreadCount(
  conversations: ChatConversation[] = CHAT_CONVERSATIONS,
): number {
  return conversations.reduce((sum, c) => sum + c.unreadCount, 0);
}
