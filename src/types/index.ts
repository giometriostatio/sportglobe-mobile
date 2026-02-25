export type Sport = 'basketball' | 'college_basketball' | 'baseball';

export type GameStatus = 'UPCOMING';

export interface Game {
  id: number;
  sport: Sport;
  league: string;
  home: string;
  away: string;
  venue: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  status: GameStatus;
  detail: string;
  startTime: string | null;
  color: string;
  dateUTC?: string;
}

export type SportFilter = 'all' | Sport;

export interface FilterOption {
  key: SportFilter;
  label: string;
  icon: string;
}
