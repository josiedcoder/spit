import { useEventListener } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { LiveFeedEntry } from '../../data/liveFeedSamples';
import { colors } from '../../theme/colors';
import { LiveVideoLoader } from './LiveVideoLoader';

type Props = {
  item: LiveFeedEntry;
  isActive: boolean;
  /** Home feed previews stay muted; single live room plays audio. */
  muted?: boolean;
  width: number;
  height: number;
};

export function LiveFeedCellVideo(props: Props) {
  const { isActive, width, height } = props;
  const cellStyle = { width, height };

  if (!isActive) {
    return <View style={[styles.placeholder, cellStyle]} />;
  }

  return <LiveFeedCellVideoActive {...props} />;
}

function LiveFeedCellVideoActive({
  item,
  muted = false,
  width,
  height,
}: Props) {
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setFirstFrameReady(false);
    return () => {
      mountedRef.current = false;
    };
  }, [item.id]);

  const player = useVideoPlayer(item.videoSource, (p) => {
    p.loop = true;
    p.volume = 1;
    p.muted = muted;
    p.play();
  });

  const applyPlayback = useCallback(() => {
    if (!mountedRef.current) {
      return;
    }
    try {
      player.volume = 1;
      player.muted = muted;
      player.play();
    } catch {
      // Player released.
    }
  }, [player, muted]);

  useEventListener(player, 'statusChange', ({ status, error }) => {
    if (status === 'readyToPlay') {
      applyPlayback();
    }
    if (status === 'error' && error) {
      console.warn('[LiveFeedCellVideo] error', item.id, error.message);
    }
  });

  useEffect(() => {
    applyPlayback();
  }, [applyPlayback]);

  return (
    <View style={[styles.cell, { width, height }]}>
      <VideoView
        player={player}
        style={{ width, height }}
        contentFit="cover"
        nativeControls={false}
        fullscreenOptions={{ enable: false }}
        showsTimecodes={false}
        allowsPictureInPicture={false}
        useExoShutter={false}
        pointerEvents="none"
        onFirstFrameRender={() => {
          setFirstFrameReady(true);
          applyPlayback();
        }}
      />
      {!firstFrameReady ? <LiveVideoLoader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: colors.background,
  },
});
