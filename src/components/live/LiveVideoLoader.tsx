import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  compact?: boolean;
};

export function LiveVideoLoader({ compact = false }: Props) {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    spinLoop.start();
    pulseLoop.start();
    return () => {
      spinLoop.stop();
      pulseLoop.stop();
    };
  }, [pulse, spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const dotOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 1],
  });

  const ring = compact ? 40 : RING_DEFAULT;

  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={[styles.loaderCluster, compact && styles.loaderClusterCompact]}>
        <Animated.View
          style={[
            styles.outerRing,
            { width: ring, height: ring, transform: [{ rotate }] },
          ]}
        >
          <View
            style={[
              styles.ringArcPrimary,
              {
                width: ring,
                height: ring,
                borderRadius: ring / 2,
              },
            ]}
          />
          <View
            style={[
              styles.ringArcSecondary,
              {
                width: ring,
                height: ring,
                borderRadius: ring / 2,
              },
            ]}
          />
          <Animated.View style={[styles.innerPulse, { transform: [{ scale: ringScale }] }]}>
            <Animated.View style={[styles.liveDot, { opacity: dotOpacity }]} />
          </Animated.View>
        </Animated.View>
        {compact ? null : (
          <Text style={styles.label}>Connecting stream…</Text>
        )}
      </View>
    </View>
  );
}

const RING_DEFAULT = 56;

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    zIndex: 5,
  },
  loaderCluster: {
    alignItems: 'center',
    gap: 20,
  },
  loaderClusterCompact: {
    gap: 0,
  },
  outerRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringArcPrimary: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: colors.accent,
    borderRightColor: colors.accent,
  },
  ringArcSecondary: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'rgba(255,45,106,0.2)',
  },
  innerPulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,45,106,0.15)',
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
