export type ProfileSection = 'overview' | 'streams' | 'saved' | 'settings';

export const PROFILE_SECTIONS: { key: ProfileSection; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'streams', label: 'Streams' },
  { key: 'saved', label: 'Saved' },
  { key: 'settings', label: 'Settings' },
];

export type ProfileUser = {
  displayName: string;
  username: string;
  avatarUri: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  isVerified?: boolean;
};

export const PROFILE_USER: ProfileUser = {
  displayName: 'Jordan',
  username: 'jordan_spit',
  avatarUri: 'https://i.pravatar.cc/300?u=jordan_spit',
  bio: 'Late-night live · party host · collabs open',
  followers: 1284,
  following: 214,
  likes: 9820,
  isVerified: true,
};

export type ProfileQuickAction = {
  id: string;
  label: string;
  icon: string;
  tint: 'accent' | 'muted';
};

export const PROFILE_QUICK_ACTIONS: ProfileQuickAction[] = [
  { id: 'analytics', label: 'Analytics', icon: 'stats-chart', tint: 'muted' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet-outline', tint: 'muted' },
  { id: 'gifts', label: 'Gifts', icon: 'gift-outline', tint: 'accent' },
  { id: 'schedule', label: 'Schedule', icon: 'calendar-outline', tint: 'muted' },
];

export type ProfileActivity = {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  icon: string;
};

export const PROFILE_ACTIVITY: ProfileActivity[] = [
  {
    id: '1',
    title: 'Live with Maya',
    subtitle: 'Co-stream · 1.2K peak viewers',
    timestamp: '2d ago',
    icon: 'radio',
  },
  {
    id: '2',
    title: 'Neon Room party',
    subtitle: 'Hosted · 48 joins',
    timestamp: '5d ago',
    icon: 'people',
  },
  {
    id: '3',
    title: 'New followers',
    subtitle: '+36 this week',
    timestamp: '1w ago',
    icon: 'heart',
  },
];

export type ProfileStream = {
  id: string;
  title: string;
  views: string;
  duration: string;
  thumbnailUri: string;
};

export const PROFILE_STREAMS: ProfileStream[] = [
  {
    id: 's1',
    title: 'GRWM + Q&A',
    views: '3.4K',
    duration: '42m',
    thumbnailUri: 'https://picsum.photos/seed/spit1/400/240',
  },
  {
    id: 's2',
    title: 'Neon beats drop',
    views: '1.8K',
    duration: '28m',
    thumbnailUri: 'https://picsum.photos/seed/spit2/400/240',
  },
  {
    id: 's3',
    title: 'Party after-party',
    views: '920',
    duration: '19m',
    thumbnailUri: 'https://picsum.photos/seed/spit3/400/240',
  },
];

export type ProfileMenuItem = {
  id: string;
  label: string;
  icon: string;
  destructive?: boolean;
};

export const PROFILE_SETTINGS_MENU: ProfileMenuItem[] = [
  { id: 'edit', label: 'Edit profile', icon: 'person-circle-outline' },
  { id: 'creator', label: 'Creator tools', icon: 'sparkles-outline' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
  { id: 'privacy', label: 'Privacy & safety', icon: 'shield-checkmark-outline' },
  { id: 'help', label: 'Help center', icon: 'help-circle-outline' },
  { id: 'logout', label: 'Log out', icon: 'log-out-outline', destructive: true },
];

export const PROFILE_SAVED_PLACEHOLDER = {
  title: 'No saved posts yet',
  body: 'Bookmark streams and party highlights to find them here.',
};

export function formatProfileStat(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return String(n);
}
