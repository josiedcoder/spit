export type PartyChatMessage = {
  id: string;
  username: string;
  text: string;
  highlight?: 'gift' | 'join';
};

const MESSAGES: Record<string, PartyChatMessage[]> = {
  featured: [
    { id: '1', username: 'guest_a', text: 'who’s up next on mic?' },
    { id: '2', username: 'dj_ray', text: 'sent Spotlight', highlight: 'gift' },
    { id: '3', username: 'new_user', text: 'joined the room', highlight: 'join' },
  ],
  '1': [
    { id: '1', username: 'clutch_9', text: 'one more ranked?' },
    { id: '2', username: 'nova_fps', text: 'drop your rank in chat' },
  ],
  '3': [
    { id: '1', username: 'bars_only', text: '32 bars lets go' },
    { id: '2', username: 'knox_beats', text: 'beat switching in 10' },
  ],
  default: [
    { id: '1', username: 'listener', text: 'this room is vibes' },
    { id: '2', username: 'friend_1', text: 'joined the room', highlight: 'join' },
  ],
};

export function partyChatForRoom(roomId: string): PartyChatMessage[] {
  return MESSAGES[roomId] ?? MESSAGES.default;
}
