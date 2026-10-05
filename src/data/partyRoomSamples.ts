import type { VideoSource } from 'expo-video';
import { partyHostPhoto, partyMemberPhoto } from './partyMedia';

export type PartyCategory = 'all' | 'trending' | 'friends' | 'gaming' | 'music' | 'chill';

export type PartyMediaType = 'audio' | 'video';

export type PartyRoom = {
  id: string;
  title: string;
  hostUsername: string;
  hostDisplayName: string;
  participantCount: number;
  speakerCount: number;
  category: Exclude<PartyCategory, 'all'>;
  tags: string[];
  mediaType: PartyMediaType;
  /** Set when `mediaType` is `video`. */
  videoSource?: VideoSource;
  isLocked?: boolean;
  isHot?: boolean;
  avatarUris: string[];
};

export const PARTY_CATEGORIES: { key: PartyCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'trending', label: 'Trending' },
  { key: 'friends', label: 'Friends' },
  { key: 'gaming', label: 'Gaming' },
  { key: 'music', label: 'Music' },
  { key: 'chill', label: 'Chill' },
];

export const PARTY_FEATURED: PartyRoom = {
  id: 'featured',
  title: 'Friday Night Open Mic 🎤',
  hostUsername: 'spit_official',
  hostDisplayName: 'Spit',
  participantCount: 842,
  speakerCount: 6,
  category: 'music',
  tags: ['Open mic', 'Spotlight'],
  mediaType: 'video',
  videoSource: require('../../assets/videos/live-feed-1.mov'),
  isHot: true,
  avatarUris: [
    partyHostPhoto('1516280440614-37939bbacd81'),
    partyMemberPhoto('1494790108377-be9c29b29330'),
    partyMemberPhoto('1507003211169-0a1dd7228f2d'),
    partyMemberPhoto('1534528741775-53994a69daeb'),
  ],
};

export const PARTY_ROOMS: PartyRoom[] = [
  {
    id: '1',
    title: 'Ranked grind — pull up',
    hostUsername: 'nova_fps',
    hostDisplayName: 'Nova',
    participantCount: 128,
    speakerCount: 4,
    category: 'gaming',
    tags: ['Valorant', 'English'],
    mediaType: 'audio',
    avatarUris: [
      partyHostPhoto('1506794778202-cad84cf45f1d'),
      partyMemberPhoto('1506794778202-cad84cf45f1d'),
      partyMemberPhoto('1500648767791-00dcc994a43e'),
      partyMemberPhoto('1472099645785-5658abf4ff4e'),
    ],
  },
  {
    id: '2',
    title: 'Lo-fi & late night chat',
    hostUsername: 'yuki_chill',
    hostDisplayName: 'Yuki',
    participantCount: 56,
    speakerCount: 2,
    category: 'chill',
    tags: ['Cozy', '18+'],
    mediaType: 'audio',
    avatarUris: [
      partyHostPhoto('1438761681033-6461ffad8d80'),
      partyMemberPhoto('1531123897727-8f129e168dce'),
      partyMemberPhoto('1524504388940-b1c1722653e1'),
    ],
  },
  {
    id: '3',
    title: 'Beat battle — 32 bars',
    hostUsername: 'knox_beats',
    hostDisplayName: 'Knox',
    participantCount: 214,
    speakerCount: 8,
    category: 'music',
    tags: ['Hip-hop', 'Live'],
    mediaType: 'video',
    videoSource: require('../../assets/videos/live-feed-2.mov'),
    isHot: true,
    avatarUris: [
      partyHostPhoto('1514525253161-7a46d19cd819'),
      partyMemberPhoto('1519341459610-4fa4d0dcb9d0'),
      partyMemberPhoto('1469334031218-e382a71b716b'),
      partyMemberPhoto('1508214751196-bcfd4ca60f91'),
    ],
  },
  {
    id: '4',
    title: 'Friends only — drama recap',
    hostUsername: 'maya_live',
    hostDisplayName: 'Maya',
    participantCount: 12,
    speakerCount: 3,
    category: 'friends',
    tags: ['Private vibe'],
    mediaType: 'audio',
    isLocked: true,
    avatarUris: [
      partyHostPhoto('1534528741775-53994a69daeb'),
      partyMemberPhoto('1544005313-94ddf0286df2'),
      partyMemberPhoto('1529626455594-4ff0802cfb7e'),
    ],
  },
  {
    id: '5',
    title: 'New creators welcome',
    hostUsername: 'spit_mods',
    hostDisplayName: 'Mods',
    participantCount: 391,
    speakerCount: 5,
    category: 'trending',
    tags: ['Networking', 'Tips'],
    mediaType: 'video',
    videoSource: require('../../assets/videos/live-feed-1.mov'),
    avatarUris: [
      partyHostPhoto('1560250097-0b93528c311a'),
      partyMemberPhoto('1566492031773-4f4e44671857'),
      partyMemberPhoto('1573496359142-b8d87734a5a2'),
      partyMemberPhoto('1580489944761-15a85d654cb1'),
    ],
  },
  {
    id: '6',
    title: 'Speed dating voice rooms',
    hostUsername: 'party_bot',
    hostDisplayName: 'Party',
    participantCount: 67,
    speakerCount: 10,
    category: 'trending',
    tags: ['Social', 'Rotating'],
    mediaType: 'audio',
    avatarUris: [
      partyHostPhoto('1529626455594-4ff0802cfb7e'),
      partyMemberPhoto('1494790108377-be9c29b29330'),
      partyMemberPhoto('1507003211169-0a1dd7228f2d'),
      partyMemberPhoto('1517841905240-472988babdf9'),
    ],
  },
];

export function filterPartyRooms(
  category: PartyCategory,
  rooms: PartyRoom[] = PARTY_ROOMS,
): PartyRoom[] {
  if (category === 'all') {
    return rooms;
  }
  if (category === 'trending') {
    return rooms.filter((r) => r.category === 'trending' || r.isHot);
  }
  if (category === 'friends') {
    return rooms.filter((r) => r.category === 'friends');
  }
  return rooms.filter((r) => r.category === category);
}
