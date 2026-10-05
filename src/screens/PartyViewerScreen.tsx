import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AudioPartyRoom } from '../components/party/AudioPartyRoom';
import { VideoPartyRoom } from '../components/party/VideoPartyRoom';
import { partyRoomById } from '../data/partyRoomLookup';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'PartyViewer'>;

export function PartyViewerScreen({ navigation, route }: Props) {
  const isFocused = useIsFocused();
  const [connecting, setConnecting] = useState(true);

  const room = useMemo(
    () => partyRoomById(route.params.roomId),
    [route.params.roomId],
  );

  useEffect(() => {
    const timer = setTimeout(() => setConnecting(false), 650);
    return () => clearTimeout(timer);
  }, [route.params.roomId]);

  if (!room) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorText}>Party room not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {connecting ? (
        <View style={styles.connecting}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.connectingTitle}>Joining {room.title}…</Text>
          <Text style={styles.connectingSub}>
            {room.mediaType === 'video' ? 'Video party' : 'Audio party'} · @
            {room.hostUsername}
          </Text>
        </View>
      ) : room.mediaType === 'video' && room.videoSource ? (
        <VideoPartyRoom
          room={room}
          isActive={isFocused}
          onClose={() => navigation.goBack()}
        />
      ) : (
        <AudioPartyRoom room={room} onClose={() => navigation.goBack()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  connecting: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  connectingTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  connectingSub: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
  },
});
