import { useEventListener } from 'expo';
import type { VideoSource } from 'expo-video';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { LiveVideoLoader } from '../live/LiveVideoLoader';

type Props = {
  videoSource: VideoSource;
  isActive: boolean;
  width: number;
  height: number;
};

export function PartyVideoStage({ videoSource, isActive, width, height }: Props) {
  if (!isActive) {
    return <View style={[styles.placeholder, { width, height }]} />;
  }

  return (
    <PartyVideoStageActive videoSource={videoSource} width={width} height={height} />
  );
}

function PartyVideoStageActive({
  videoSource,
  width,
  height,
}: Omit<Props, 'isActive'>) {
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setFirstFrameReady(false);
    return () => {
      mountedRef.current = false;
    };
  }, [videoSource]);

  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.volume = 1;
    p.muted = false;
    p.play();
  });

  const applyPlayback = useCallback(() => {
    if (!mountedRef.current) {
      return;
    }
    try {
      player.play();
    } catch {
      // Player released.
    }
  }, [player]);

  useEventListener(player, 'statusChange', ({ status }) => {
    if (status === 'readyToPlay') {
      applyPlayback();
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
        pointerEvents="none"
        onFirstFrameRender={() => {
          setFirstFrameReady(true);
          applyPlayback();
        }}
      />
      {!firstFrameReady ? <LiveVideoLoader /> : null}
      <View style={styles.scrim} pointerEvents="none" />
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
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
