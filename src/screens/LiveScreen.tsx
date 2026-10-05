import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { LiveFeedHeader, type LiveFeedFilter } from '../components/live/LiveFeedHeader';
import { LiveFeedPager } from '../components/live/LiveFeedPager';
import type { RootStackParamList } from '../navigation/types';

export function LiveScreen() {
  const [filter, setFilter] = useState<LiveFeedFilter>('popular');
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openLiveViewer = useCallback(
    (streamId: string) => {
      navigation.navigate('LiveViewer', { streamId, filter });
    },
    [filter, navigation],
  );

  return (
    <View style={styles.root}>
      <LiveFeedPager
        filter={filter}
        isScreenFocused={isFocused}
        onOpenStream={openLiveViewer}
      />
      <LiveFeedHeader
        filter={filter}
        onFilterChange={setFilter}
        onSearchPress={() => Alert.alert('Search', 'Search coming soon.')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
});
