import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { RootStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PartyCategoryChips } from '../components/party/PartyCategoryChips';
import { partyTileHeight } from '../components/party/partyFeedLayout';
import { PartyRoomHalfTile } from '../components/party/PartyRoomHalfTile';
import {
  filterPartyRooms,
  PARTY_FEATURED,
  PARTY_ROOMS,
  type PartyCategory,
  type PartyRoom,
} from '../data/partyRoomSamples';
import { colors } from '../theme/colors';

function buildPartyFeed(category: PartyCategory): PartyRoom[] {
  const filtered = filterPartyRooms(category);
  if (category === 'all' || category === 'trending') {
    const rest = filtered.filter((r) => r.id !== PARTY_FEATURED.id);
    return [PARTY_FEATURED, ...rest];
  }
  return filtered;
}

export function PartyScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [category, setCategory] = useState<PartyCategory>('all');
  const [listHeight, setListHeight] = useState(0);
  const [focusedId, setFocusedId] = useState<string>(PARTY_ROOMS[0]?.id ?? '');

  const rooms = useMemo(() => buildPartyFeed(category), [category]);
  const tileHeight = listHeight > 0 ? partyTileHeight(listHeight) : 0;

  const onJoinRoom = useCallback(
    (room: PartyRoom) => {
      navigation.navigate('PartyViewer', { roomId: room.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: PartyRoom }) => (
      <PartyRoomHalfTile
        room={item}
        width={windowWidth}
        height={tileHeight}
        highlighted={item.id === focusedId}
        onPress={() => onJoinRoom(item)}
      />
    ),
    [focusedId, onJoinRoom, tileHeight, windowWidth],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<PartyRoom> | null | undefined, index: number) => ({
      length: tileHeight,
      offset: tileHeight * index,
      index,
    }),
    [tileHeight],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Party</Text>
            <Text style={styles.subtitle}>Two live rooms on screen · swipe for more</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={styles.iconBtn}
              accessibilityLabel="Search parties"
              onPress={() => Alert.alert('Search', 'Party search coming soon.')}
            >
              <Ionicons name="search" size={22} color={colors.textPrimary} />
            </Pressable>
            <Pressable
              style={styles.createBtn}
              accessibilityLabel="Start a party"
              onPress={() => Alert.alert('Start party', 'Create room flow coming soon.')}
            >
              <Ionicons name="add" size={22} color={colors.textPrimary} />
              <Text style={styles.createLabel}>Start</Text>
            </Pressable>
          </View>
        </View>

        <PartyCategoryChips value={category} onChange={setCategory} />
      </View>

      <View
        style={styles.listWrap}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (height > 0 && height !== listHeight) {
            setListHeight(height);
          }
        }}
      >
        {tileHeight > 0 ? (
          <FlatList
            data={rooms}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={tileHeight}
            snapToAlignment="start"
            disableIntervalMomentum
            bounces={false}
            overScrollMode="never"
            getItemLayout={getItemLayout}
            onViewableItemsChanged={({ viewableItems }) => {
              const top = viewableItems
                .filter((v) => v.isViewable)
                .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))[0];
              const room = top?.item as PartyRoom | undefined;
              if (room?.id) {
                setFocusedId(room.id);
              }
            }}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 40,
              minimumViewTime: 80,
            }}
            initialNumToRender={2}
            maxToRenderPerBatch={4}
            windowSize={5}
            extraData={{ focusedId, tileHeight, category }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    gap: 14,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
  },
  createLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  listWrap: {
    flex: 1,
  },
});
