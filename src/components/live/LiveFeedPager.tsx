import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppState,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mainTabBarClearance } from '../tabBarLayout';
import { LIVE_FEED_SAMPLES } from '../../data/liveFeedSamples';
import type { LiveFeedEntry } from '../../data/liveFeedSamples';
import type { LiveFeedFilter } from './LiveFeedHeader';
import { LiveFeedItem } from './LiveFeedItem';

type Props = {
  filter: LiveFeedFilter;
  isScreenFocused: boolean;
  onOpenStream?: (streamId: string) => void;
  bottomContentInset?: number;
};

export function LiveFeedPager({
  filter,
  isScreenFocused,
  onOpenStream,
  bottomContentInset: bottomContentInsetProp,
}: Props) {
  const insets = useSafeAreaInsets();
  const bottomContentInset =
    bottomContentInsetProp ?? mainTabBarClearance(insets.bottom);
  const { width: windowWidth } = useWindowDimensions();
  const [viewportHeight, setViewportHeight] = useState(0);
  const entries = LIVE_FEED_SAMPLES;
  const [activeId, setActiveId] = useState(entries[0]?.id ?? '');
  const [appIsActive, setAppIsActive] = useState(
    () => AppState.currentState === 'active',
  );

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      setAppIsActive(state === 'active');
    });
    return () => sub.remove();
  }, []);

  const playbackEnabled = isScreenFocused && appIsActive;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const focused = viewableItems.find((entry) => entry.isViewable);
      const entry = focused?.item as LiveFeedEntry | undefined;
      if (entry?.id) {
        setActiveId(entry.id);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 85,
    minimumViewTime: 80,
  }).current;

  const renderItem = useCallback(
    ({ item }: { item: LiveFeedEntry }) => (
      <LiveFeedItem
        item={item}
        isActive={playbackEnabled && item.id === activeId}
        filter={filter}
        onOpenStream={onOpenStream}
        cellWidth={windowWidth}
        cellHeight={viewportHeight}
        bottomContentInset={bottomContentInset}
      />
    ),
    [
      activeId,
      bottomContentInset,
      filter,
      onOpenStream,
      playbackEnabled,
      viewportHeight,
      windowWidth,
    ],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<LiveFeedEntry> | null | undefined, index: number) => ({
      length: viewportHeight,
      offset: viewportHeight * index,
      index,
    }),
    [viewportHeight],
  );

  return (
    <View
      style={styles.wrap}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        if (height > 0 && height !== viewportHeight) {
          setViewportHeight(height);
        }
      }}
    >
      {viewportHeight > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={viewportHeight}
          snapToAlignment="start"
          disableIntervalMomentum
          bounces={false}
          overScrollMode="never"
          getItemLayout={getItemLayout}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          windowSize={3}
          extraData={{ activeId, filter, playbackEnabled }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#000',
  },
});
