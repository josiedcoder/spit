import { Platform } from 'react-native';

/** iOS dock inner row height (padding + tab block). */
export const SPIT_TAB_BAR_ROW_HEIGHT = 66;

const IOS_FLOAT_BOTTOM_GAP = 8;
const IOS_EXTRA_CONTENT_GAP = 10;

/** Bottom padding for scrollable / overlay content above the tab bar. */
export function mainTabBarClearance(safeAreaBottom: number): number {
  if (Platform.OS === 'ios') {
    return (
      safeAreaBottom + IOS_FLOAT_BOTTOM_GAP + SPIT_TAB_BAR_ROW_HEIGHT + IOS_EXTRA_CONTENT_GAP
    );
  }
  const bottomPad = safeAreaBottom > 0 ? safeAreaBottom : 6;
  return bottomPad + SPIT_TAB_BAR_ROW_HEIGHT + 4;
}
