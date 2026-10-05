import { PARTY_FEATURED, PARTY_ROOMS, type PartyRoom } from './partyRoomSamples';

const ALL_PARTIES: PartyRoom[] = [PARTY_FEATURED, ...PARTY_ROOMS];

export function partyRoomById(roomId: string): PartyRoom | undefined {
  return ALL_PARTIES.find((r) => r.id === roomId);
}
