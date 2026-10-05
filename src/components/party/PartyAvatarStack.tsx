import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  uris: string[];
  totalCount: number;
  maxVisible?: number;
};

export function PartyAvatarStack({ uris, totalCount, maxVisible = 4 }: Props) {
  const visible = uris.slice(0, maxVisible);
  const overflow = Math.max(0, totalCount - visible.length);

  return (
    <View style={styles.wrap}>
      {visible.map((uri, index) => (
        <Image
          key={`${uri}-${index}`}
          source={{ uri }}
          style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10, zIndex: maxVisible - index }]}
          resizeMode="cover"
        />
      ))}
      {overflow > 0 ? (
        <View style={[styles.overflow, { marginLeft: visible.length > 0 ? -10 : 0 }]}>
          <Text style={styles.overflowText}>+{overflow}</Text>
        </View>
      ) : null}
    </View>
  );
}

const SIZE = 34;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    borderColor: colors.surface,
    backgroundColor: colors.surfaceMuted,
  },
  overflow: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '800',
  },
});
