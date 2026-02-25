import { FilterOption, Sport } from '../types';

export const SPORT_COLORS: Record<Sport, string> = {
  basketball: '#F97316',
  college_basketball: '#10B981',
  baseball: '#A855F7',
};

export const SPORT_ICONS: Record<Sport, string> = {
  basketball: '🏀',
  college_basketball: '🎓',
  baseball: '⚾',
};

export const FILTERS: FilterOption[] = [
  { key: 'all', label: 'All', icon: '🌍' },
  { key: 'basketball', label: 'Basketball', icon: '🏀' },
  { key: 'college_basketball', label: 'College BB', icon: '🎓' },
  { key: 'baseball', label: 'Baseball', icon: '⚾' },
];

export const REGIONS = [
  { label: '🇪🇺', title: 'Europe', lat: 48, lng: 10, zoom: 4 },
  { label: '🇺🇸', title: 'N. America', lat: 40, lng: -98, zoom: 4 },
  { label: '🇧🇷', title: 'S. America', lat: -15, lng: -55, zoom: 3 },
  { label: '🌍', title: 'Africa', lat: 5, lng: 20, zoom: 3 },
  { label: '🌏', title: 'Asia', lat: 30, lng: 100, zoom: 3 },
  { label: '🇦🇺', title: 'Oceania', lat: -25, lng: 135, zoom: 4 },
];

export const TRIP_MARKER_COLOR = '#F59E0B';

export const API_BASE_URL = 'https://sportglobe-v2.vercel.app';
