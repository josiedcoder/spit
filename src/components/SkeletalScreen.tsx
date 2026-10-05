import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function SkeletalScreen({ title, subtitle, children }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.body}>{children ?? <PlaceholderBlocks />}</View>
    </SafeAreaView>
  );
}

function PlaceholderBlocks() {
  return (
    <View style={styles.blocks}>
      <View style={[styles.block, styles.blockTall]} />
      <View style={styles.row}>
        <View style={[styles.block, styles.blockHalf]} />
        <View style={[styles.block, styles.blockHalf]} />
      </View>
      <View style={[styles.block, styles.blockMedium]} />
      <View style={[styles.block, styles.blockMedium]} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  blocks: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  block: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  blockTall: {
    height: 200,
  },
  blockHalf: {
    flex: 1,
    height: 120,
  },
  blockMedium: {
    height: 72,
  },
});
