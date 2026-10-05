import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileHeroCard } from '../components/profile/ProfileHeroCard';
import { ProfileMenuRow } from '../components/profile/ProfileMenuRow';
import { ProfileSectionChips } from '../components/profile/ProfileSectionChips';
import {
  PROFILE_ACTIVITY,
  PROFILE_QUICK_ACTIONS,
  PROFILE_SAVED_PLACEHOLDER,
  PROFILE_SETTINGS_MENU,
  PROFILE_STREAMS,
  type ProfileSection,
} from '../data/profileSamples';
import { colors } from '../theme/colors';

export function ProfileScreen() {
  const [section, setSection] = useState<ProfileSection>('overview');

  const onMenuItem = (label: string) => {
    Alert.alert(label, 'Coming soon.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Your channel, stats & settings</Text>
          </View>
          <Pressable
            style={styles.iconBtn}
            accessibilityLabel="Account settings"
            onPress={() => setSection('settings')}
          >
            <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        <ProfileSectionChips value={section} onChange={setSection} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {section === 'overview' ? (
          <>
            <ProfileHeroCard
              onEditPress={() => onMenuItem('Edit profile')}
              onSharePress={() => onMenuItem('Share profile')}
            />

            <Text style={styles.sectionTitle}>Quick actions</Text>
            <View style={styles.quickGrid}>
              {PROFILE_QUICK_ACTIONS.map((action) => (
                <Pressable
                  key={action.id}
                  style={styles.quickTile}
                  onPress={() => onMenuItem(action.label)}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                >
                  <View
                    style={[
                      styles.quickIcon,
                      action.tint === 'accent' && styles.quickIconAccent,
                    ]}
                  >
                    <Ionicons
                      name={action.icon as keyof typeof Ionicons.glyphMap}
                      size={22}
                      color={
                        action.tint === 'accent' ? colors.textPrimary : colors.textSecondary
                      }
                    />
                  </View>
                  <Text style={styles.quickLabel}>{action.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Recent activity</Text>
            <View style={styles.panel}>
              {PROFILE_ACTIVITY.map((item, index) => (
                <View key={item.id}>
                  <Pressable
                    style={({ pressed }) => [styles.activityRow, pressed && styles.rowPressed]}
                    onPress={() => onMenuItem(item.title)}
                    accessibilityRole="button"
                  >
                    <View style={styles.activityIcon}>
                      <Ionicons
                        name={item.icon as keyof typeof Ionicons.glyphMap}
                        size={20}
                        color={colors.accent}
                      />
                    </View>
                    <View style={styles.activityBody}>
                      <Text style={styles.activityTitle}>{item.title}</Text>
                      <Text style={styles.activitySub} numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>
                    <Text style={styles.activityTime}>{item.timestamp}</Text>
                  </Pressable>
                  {index < PROFILE_ACTIVITY.length - 1 ? (
                    <View style={styles.insetDivider} />
                  ) : null}
                </View>
              ))}
            </View>
          </>
        ) : null}

        {section === 'streams' ? (
          <View style={styles.streamList}>
            {PROFILE_STREAMS.map((stream) => (
              <Pressable
                key={stream.id}
                style={({ pressed }) => [styles.streamCard, pressed && styles.rowPressed]}
                onPress={() => onMenuItem(stream.title)}
                accessibilityRole="button"
              >
                <Image source={{ uri: stream.thumbnailUri }} style={styles.streamThumb} />
                <View style={styles.streamMeta}>
                  <Text style={styles.streamTitle} numberOfLines={2}>
                    {stream.title}
                  </Text>
                  <Text style={styles.streamStats}>
                    {stream.views} views · {stream.duration}
                  </Text>
                </View>
                <Ionicons name="play-circle" size={28} color={colors.textPrimary} />
              </Pressable>
            ))}
          </View>
        ) : null}

        {section === 'saved' ? (
          <View style={styles.emptyBlock}>
            <Ionicons name="bookmark-outline" size={40} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>{PROFILE_SAVED_PLACEHOLDER.title}</Text>
            <Text style={styles.emptyBody}>{PROFILE_SAVED_PLACEHOLDER.body}</Text>
          </View>
        ) : null}

        {section === 'settings' ? (
          <View style={styles.panel}>
            {PROFILE_SETTINGS_MENU.map((item, index) => (
              <ProfileMenuRow
                key={item.id}
                item={item}
                onPress={() => onMenuItem(item.label)}
                showDivider={index < PROFILE_SETTINGS_MENU.length - 1}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
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
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  scrollContent: {
    paddingBottom: 32,
    gap: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  quickTile: {
    width: '48%',
    flexGrow: 1,
    minWidth: '46%',
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: 10,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconAccent: {
    backgroundColor: 'rgba(255,45,106,0.2)',
  },
  quickLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  panel: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  rowPressed: {
    backgroundColor: colors.surfaceMuted,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,45,106,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBody: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  activitySub: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  insetDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 14 + 40 + 12,
  },
  streamList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  streamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  streamThumb: {
    width: 88,
    height: 52,
    borderRadius: 10,
    backgroundColor: colors.surfaceMuted,
  },
  streamMeta: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  streamTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  streamStats: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  emptyBlock: {
    marginHorizontal: 32,
    marginTop: 48,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyBody: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
