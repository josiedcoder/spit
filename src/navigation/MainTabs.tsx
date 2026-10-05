import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { SpitTabBar } from '../components/SpitTabBar';
import { LiveScreen } from '../screens/LiveScreen';
import { PartyScreen } from '../screens/PartyScreen';
import { ChatsScreen } from '../screens/ChatsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type Props = {
  onGoLivePress: () => void;
};

export function MainTabs({ onGoLivePress }: Props) {
  return (
    <Tab.Navigator
      tabBar={(props) => <SpitTabBar {...props} onGoLivePress={onGoLivePress} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
          },
          default: {},
        }),
      }}
    >
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Party" component={PartyScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
