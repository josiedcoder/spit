import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LiveStreamRoom } from '../components/live/LiveStreamRoom';
import { LIVE_FEED_SAMPLES } from '../data/liveFeedSamples';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'LiveViewer'>;

export function LiveViewerScreen({ navigation, route }: Props) {
  const isFocused = useIsFocused();
  const [connecting, setConnecting] = useState(true);

  const stream = useMemo(
    () => LIVE_FEED_SAMPLES.find((e) => e.id === route.params.streamId),
    [route.params.streamId],
  );

  useEffect(() => {
    const timer = setTimeout(() => setConnecting(false), 700);
    return () => clearTimeout(timer);
  }, [route.params.streamId]);

  if (!stream) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorText}>Stream not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {connecting ? (
        <View style={styles.connecting}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.connectingTitle}>
            Connecting to {stream.displayName}…
          </Text>
          <Text style={styles.connectingSub}>@{stream.username}</Text>
        </View>
      ) : (
        <LiveStreamRoom
          item={stream}
          isActive={isFocused}
          onClose={() => navigation.goBack()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
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
  },
  errorText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
  },
});
