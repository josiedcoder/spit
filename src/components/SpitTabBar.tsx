import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import type { MainTabParamList } from '../navigation/types';

type TabKey = keyof MainTabParamList;

type TabConfig = {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
};

const LEFT_TABS: TabConfig[] = [
  { key: 'Live', label: 'Live', icon: 'radio-outline', iconFocused: 'radio' },
  { key: 'Party', label: 'Party', icon: 'people-outline', iconFocused: 'people' },
];

const RIGHT_TABS: TabConfig[] = [
  {
    key: 'Chats',
    label: 'Chats',
    icon: 'chatbubbles-outline',
    iconFocused: 'chatbubbles',
  },
  {
    key: 'Profile',
    label: 'Profile',
    icon: 'person-outline',
    iconFocused: 'person',
  },
];

type Props = BottomTabBarProps & {
  onGoLivePress: () => void;
};

export function SpitTabBar({ state, navigation, onGoLivePress }: Props) {
  const insets = useSafeAreaInsets();

  const navigate = (key: TabKey) => {
    const index = state.routes.findIndex((r) => r.name === key);
    if (index >= 0) {
      navigation.navigate(key);
    }
  };

  const isFocused = (key: TabKey) => {
    const index = state.routes.findIndex((r) => r.name === key);
    return state.index === index;
  };

  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      <View style={styles.side}>
        {LEFT_TABS.map((tab) => (
          <TabItem
            key={tab.key}
            label={tab.label}
            icon={tab.icon}
            iconFocused={tab.iconFocused}
            focused={isFocused(tab.key)}
            onPress={() => navigate(tab.key)}
          />
        ))}
      </View>

      <Pressable
        onPress={onGoLivePress}
        style={({ pressed }) => [styles.goLiveFab, pressed && styles.goLiveFabPressed]}
        accessibilityRole="button"
        accessibilityLabel="Go live"
      >
        <View style={styles.goLiveInner}>
          <Ionicons name="videocam" size={26} color={colors.textPrimary} />
        </View>
        <Text style={styles.goLiveLabel}>Go Live</Text>
      </Pressable>

      <View style={styles.side}>
        {RIGHT_TABS.map((tab) => (
          <TabItem
            key={tab.key}
            label={tab.label}
            icon={tab.icon}
            iconFocused={tab.iconFocused}
            focused={isFocused(tab.key)}
            onPress={() => navigate(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}

function TabItem({
  label,
  icon,
  iconFocused,
  focused,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tab} accessibilityRole="button">
      <Ionicons
        name={focused ? iconFocused : icon}
        size={24}
        color={focused ? colors.accent : colors.textSecondary}
      />
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.tabBar,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.tabBarBorder,
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 64,
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  tabLabelFocused: {
    color: colors.accent,
    fontWeight: '600',
  },
  goLiveFab: {
    alignItems: 'center',
    marginTop: -28,
    marginHorizontal: 4,
  },
  goLiveFabPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.96 }],
  },
  goLiveInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.tabBar,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },
  goLiveLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
  },
});
