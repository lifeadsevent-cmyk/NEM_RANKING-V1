
export interface PlayerData {
  rank: number;
  name: string;
  donations: number;
  vs: number;
  force: number;
  noteDonations: number;
  noteVS: number;
  noteForce: number;
  scoreFinal: number;
}

export type SortKey = keyof PlayerData;
export type SortOrder = 'asc' | 'desc';
