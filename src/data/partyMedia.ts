/** Sharp portrait URLs for party hero panels (right-side host photo). */
export function partyHostPhoto(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=720&h=960&q=90`;
}

/** Unsplash portrait tuned for small circles (retina). */
export function partyMemberPhoto(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=128&h=128&q=85`;
}
