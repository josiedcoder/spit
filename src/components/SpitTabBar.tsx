import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { CHAT_UNREAD_COUNT } from '../data/chatUnreadCount';
import type { MainTabParamList } from '../navigation/types';
import { SPIT_TAB_BAR_ROW_HEIGHT } from './tabBarLayout';

const TAB_ICON_SIZE = 24;
const TAB_ICON_SIZE_IOS_GLASS = 25;
const TAB_LABEL_GAP = 4;
const TAB_LABEL_HEIGHT = 14;
const TAB_BLOCK_HEIGHT = 46;
const TAB_BLOCK_HEIGHT_IOS_GLASS = 46;

const IOS_DOCK_H_MARGIN = 12;
const IOS_DOCK_RADIUS = 24;

type TabKey = keyof MainTabParamList;

type TabConfig = {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const LEFT_TABS: TabConfig[] = [
  { key: 'Live', label: 'Live', icon: 'radio-outline' },
  { key: 'Party', label: 'Party', icon: 'people-outline' },
];

const RIGHT_TABS: TabConfig[] = [
  { key: 'Chats', label: 'Chats', icon: 'chatbubbles-outline' },
  { key: 'Profile', label: 'Profile', icon: 'person-outline' },
];

type Props = BottomTabBarProps & {
  onGoLivePress: () => void;
  chatUnreadCount?: number;
};

export function SpitTabBar({
  state,
  navigation,
  onGoLivePress,
  chatUnreadCount = CHAT_UNREAD_COUNT,
}: Props) {
  const insets = useSafeAreaInsets();
  const isIosGlass = Platform.OS === 'ios';
  const bottomPad = isIosGlass
    ? Math.max(insets.bottom, 8)
    : insets.bottom > 0
      ? insets.bottom
      : 6;

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

  const tabRow = (
    <>
      {LEFT_TABS.map((tab) => (
        <View key={tab.key} style={styles.tabSlot}>
          <TabItem
            label={tab.label}
            icon={tab.icon}
            focused={isFocused(tab.key)}
            iosGlass={isIosGlass}
            badgeBorderColor={isIosGlass ? 'rgba(30,30,38,0.75)' : colors.tabBar}
            onPress={() => navigate(tab.key)}
          />
        </View>
      ))}

      <View style={styles.tabSlot}>
        <GoLiveTabButton iosGlass={isIosGlass} onPress={onGoLivePress} />
      </View>

      {RIGHT_TABS.map((tab) => (
        <View key={tab.key} style={styles.tabSlot}>
          <TabItem
            label={tab.label}
            icon={tab.icon}
            focused={isFocused(tab.key)}
            badgeCount={tab.key === 'Chats' ? chatUnreadCount : undefined}
            iosGlass={isIosGlass}
            badgeBorderColor={isIosGlass ? 'rgba(30,30,38,0.75)' : colors.tabBar}
            onPress={() => navigate(tab.key)}
          />
        </View>
      ))}
    </>
  );

  if (isIosGlass) {
    return (
      <View
        style={[styles.iosDockRoot, { paddingBottom: bottomPad }]}
        pointerEvents="box-none"
      >
        <View style={styles.iosDockOuter}>
          <View style={styles.barInnerIos}>{tabRow}</View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.barSolid, { paddingBottom: bottomPad }]}>
      {tabRow}
    </View>
  );
}

function formatBadgeCount(count: number): string {
  if (count > 99) {
    return '99+';
  }
  return String(count);
}

function TabItem({
  label,
  icon,
  focused,
  badgeCount,
  badgeBorderColor,
  iosGlass = false,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  badgeCount?: number;
  badgeBorderColor: string;
  iosGlass?: boolean;
  onPress: () => void;
}) {
  const showBadge = badgeCount != null && badgeCount > 0;
  const a11yLabel = showBadge ? `${label}, ${badgeCount} unread` : label;
  const iconName = icon;
  const iconSize = iosGlass ? TAB_ICON_SIZE_IOS_GLASS : TAB_ICON_SIZE;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tabColumn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ selected: focused }}
    >
      <View style={[styles.tabBlock, iosGlass && styles.tabBlockIosGlass]}>
        <View style={styles.iconBadgeWrap}>
          <Ionicons
            name={iconName}
            size={iconSize}
            color={focused ? colors.accent : 'rgba(255,255,255,0.55)'}
          />
          {showBadge ? (
            <View style={[styles.tabBadge, { borderColor: badgeBorderColor }]}>
              <Text style={styles.tabBadgeText}>{formatBadgeCount(badgeCount!)}</Text>
            </View>
          ) : null}
        </View>
        <Text
          style={[
            styles.tabLabel,
            iosGlass && styles.tabLabelIosGlass,
            focused && styles.tabLabelFocused,
            iosGlass && focused && styles.tabLabelFocusedIosGlass,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

function GoLiveTabButton({
  onPress,
  iosGlass = false,
}: {
  onPress: () => void;
  iosGlass?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tabColumn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Go live"
    >
      <View style={[styles.tabBlock, iosGlass && styles.tabBlockIosGlass]}>
        <View style={[styles.goLiveBtn, iosGlass && styles.goLiveBtnIosGlass]}>
          <Ionicons
            name="videocam"
            size={iosGlass ? 24 : TAB_ICON_SIZE}
            color={colors.background}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iosDockRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: IOS_DOCK_H_MARGIN,
  },
  iosDockOuter: {
    borderRadius: IOS_DOCK_RADIUS,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(22, 22, 29, 0.88)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      default: {},
    }),
  },
  barInner: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: SPIT_TAB_BAR_ROW_HEIGHT,
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  barInnerIos: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: SPIT_TAB_BAR_ROW_HEIGHT,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  barSolid: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 6,
    paddingHorizontal: 4,
    backgroundColor: colors.tabBar,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.tabBarBorder,
  },
  tabSlot: {
    flex: 1,
    alignItems: 'center',
  },
  tabColumn: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 88,
  },
  tabBlock: {
    height: TAB_BLOCK_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: TAB_LABEL_GAP,
  },
  tabBlockIosGlass: {
    height: TAB_BLOCK_HEIGHT_IOS_GLASS,
  },
  pressed: {
    opacity: 0.72,
  },
  tabLabel: {
    height: TAB_LABEL_HEIGHT,
    fontSize: 10,
    lineHeight: TAB_LABEL_HEIGHT,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  tabLabelIosGlass: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelFocused: {
    color: colors.accent,
    fontWeight: '600',
  },
  tabLabelFocusedIosGlass: {
    fontWeight: '800',
  },
  iconBadgeWrap: {
    position: 'relative',
    width: TAB_ICON_SIZE_IOS_GLASS + 8,
    height: TAB_ICON_SIZE_IOS_GLASS + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  tabBadgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  goLiveBtnIosGlass: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  goLiveBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      },
      default: {},
    }),
  },
});
