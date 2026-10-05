import type { LiveFeedEntry } from './liveFeedSamples';

export function liveFeedIndexForId(
  entries: LiveFeedEntry[],
  streamId: string,
): number {
  const index = entries.findIndex((e) => e.id === streamId);
  return index >= 0 ? index : 0;
}
