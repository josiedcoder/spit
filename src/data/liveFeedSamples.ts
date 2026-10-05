import type { VideoSource } from 'expo-video';

/** Demo clips bundled in the app (remote URLs often block direct mobile playback). */
export type LiveFeedEntry = {
  id: string;
  username: string;
  displayName: string;
  avatarUri?: string;
  isLive: boolean;
  viewerCount?: number;
  videoSource: VideoSource;
  caption: string;
};

export const LIVE_FEED_SAMPLES: LiveFeedEntry[] = [
  {
    id: '1',
    username: 'maya_live',
    displayName: 'Maya',
    avatarUri: 'https://i.pravatar.cc/150?u=maya_live',
    isLive: true,
    viewerCount: 1284,
    videoSource: require('../../assets/videos/live-feed-1.mov'),
    caption: 'Late night vibes ✨ Ask me anything',
  },
  {
    id: '2',
    username: 'dj_knox',
    displayName: 'Knox',
    avatarUri: 'https://i.pravatar.cc/150?u=dj_knox',
    isLive: true,
    viewerCount: 892,
    videoSource: require('../../assets/videos/live-feed-2.mov'),
    caption: 'Neon room — new beat drop in 5',
  },
  {
    id: '3',
    username: 'suri_offline',
    displayName: 'Suri',
    avatarUri: 'https://i.pravatar.cc/150?u=suri_offline',
    isLive: false,
    videoSource: require('../../assets/videos/live-feed-1.mov'),
    caption: 'Last stream · GRWM — was live 2h ago',
  },
];
