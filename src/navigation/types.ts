import type { LiveFeedFilter } from '../components/live/LiveFeedHeader';

export type MainTabParamList = {
  Live: undefined;
  Party: undefined;
  Chats: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  GoLive: undefined;
  LiveViewer: {
    streamId: string;
    filter?: LiveFeedFilter;
  };
  PartyViewer: {
    roomId: string;
  };
};
