import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  formatProfileStat,
  PROFILE_USER,
  type ProfileUser,
} from '../../data/profileSamples';
import { colors } from '../../theme/colors';

type Props = {
  user?: ProfileUser;
  onEditPress: () => void;
  onSharePress: () => void;
};

export function ProfileHeroCard({
  user = PROFILE_USER,
  onEditPress,
  onSharePress,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
        <View style={styles.statsRow}>
          <StatItem label="Followers" value={formatProfileStat(user.followers)} />
          <StatItem label="Following" value={formatProfileStat(user.following)} />
          <StatItem label="Likes" value={formatProfileStat(user.likes)} />
        </View>
      </View>

      <View style={styles.nameRow}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        {user.isVerified ? (
          <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
        ) : null}
      </View>
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      <View style={styles.actions}>
        <Pressable
          style={styles.editBtn}
          onPress={onEditPress}
          accessibilityRole="button"
          accessibilityLabel="Edit profile"
        >
          <Text style={styles.editBtnText}>Edit profile</Text>
        </Pressable>
        <Pressable
          style={styles.shareBtn}
          onPress={onSharePress}
          accessibilityRole="button"
          accessibilityLabel="Share profile"
        >
          <Ionicons name="share-outline" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const AVATAR = 80;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: colors.surfaceMuted,
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  displayName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  editBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
});
