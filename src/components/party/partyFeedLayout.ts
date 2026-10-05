export const PARTY_TILES_PER_SCREEN = 2;

export function partyTileHeight(viewportHeight: number): number {
  return Math.floor(viewportHeight / PARTY_TILES_PER_SCREEN);
}
