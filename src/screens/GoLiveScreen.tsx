import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Props = {
  onClose: () => void;
};

export function GoLiveScreen({ onClose }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
      </View>
      <View style={styles.center}>
        <View style={styles.preview}>
          <Ionicons name="videocam" size={48} color={colors.textSecondary} />
          <Text style={styles.previewLabel}>Camera preview</Text>
        </View>
        <Pressable style={styles.goLiveBtn}>
          <View style={styles.goLiveDot} />
          <Text style={styles.goLiveText}>Go Live</Text>
        </Pressable>
        <Text style={styles.hint}>Streaming setup — coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  closeBtn: {
    padding: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  preview: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: 420,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  previewLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  goLiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  goLiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textPrimary,
  },
  goLiveText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  hint: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
