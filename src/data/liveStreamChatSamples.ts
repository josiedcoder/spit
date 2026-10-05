export type LiveChatMessage = {
  id: string;
  username: string;
  text: string;
  /** Gift / highlight */
  highlight?: 'gift' | 'follow';
};

const MESSAGES: Record<string, LiveChatMessage[]> = {
  '1': [
    { id: '1', username: 'jay_sp', text: 'this vibe is crazy 🔥' },
    { id: '2', username: 'luna_00', text: 'sent Rose', highlight: 'gift' },
    { id: '3', username: 'mike_t', text: 'where you streaming from?' },
    { id: '4', username: 'nova_fan', text: 'just followed!', highlight: 'follow' },
    { id: '5', username: 'alex_r', text: 'play that song again pls' },
  ],
  '2': [
    { id: '1', username: 'bass_head', text: 'DROP IT' },
    { id: '2', username: 'club_kid', text: 'sent Galaxy', highlight: 'gift' },
    { id: '3', username: 'renny', text: 'knox never misses' },
    { id: '4', username: 'tia_w', text: '808 go crazy' },
  ],
  default: [
    { id: '1', username: 'guest_1', text: 'hey everyone 👋' },
    { id: '2', username: 'guest_2', text: 'sent Heart', highlight: 'gift' },
  ],
};

export function liveChatForStream(streamId: string): LiveChatMessage[] {
  return MESSAGES[streamId] ?? MESSAGES.default;
}
