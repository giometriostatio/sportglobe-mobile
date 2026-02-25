import { Game, Sport } from '../types';
import { SPORT_COLORS } from '../data/constants';
import { geocode, geocodeCityState } from '../data/geocoding';
import { API_BASE_URL } from '../data/constants';

// ——— Eastern Time conversion utility ———

/**
 * Convert a UTC date string to US Eastern Time.
 * Handles EST (UTC-5) and EDT (UTC-4) automatically via Intl API.
 * Returns the Eastern date (YYYY-MM-DD) and formatted time ("7:00 PM ET").
 */
export function convertToEastern(utcDateString: string): { dateET: string; timeET: string } {
  const d = new Date(utcDateString);
  if (isNaN(d.getTime())) {
    return { dateET: '', timeET: '' };
  }

  const dateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateET = dateFormatter.format(d);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const timeET = timeFormatter.format(d).replace(/\s+/g, ' ') + ' ET';

  return { dateET, timeET };
}

// ——— Fetch from sportglobe-v2 Vercel backend ———

async function fetchSport(sport: string, date?: string): Promise<any[]> {
  try {
    let url = `${API_BASE_URL}/api/sports?sport=${sport}`;
    if (date) url += `&date=${date}`;
    const r = await fetch(url);
    if (!r.ok) return [];
    const j = await r.json();
    return j.response || [];
  } catch {
    return [];
  }
}

// ——— BallDontLie Parsers ———

function parseBDLBasketball(games: any[], targetDateET?: string): Game[] {
  return games.map(g => {
    const statusStr: string = g.status || '';
    const isScheduled = statusStr.includes('T') && statusStr.includes('Z');
    const scorePlayed = (g.home_team_score > 0 || g.visitor_team_score > 0);

    if (!isScheduled && scorePlayed) return null;

    const utcTime = isScheduled ? statusStr : `${g.date}T00:00:00Z`;
    const { dateET, timeET } = convertToEastern(utcTime);

    if (targetDateET && dateET !== targetDateET) return null;

    const homeName = g.home_team?.full_name || '?';
    const awayName = g.visitor_team?.full_name || '?';

    const coords = geocode(null, null, 'USA', homeName);
    if (!coords) return null;

    return {
      id: g.id + 800000,
      sport: 'basketball' as Sport,
      league: 'NBA',
      home: homeName,
      away: awayName,
      venue: '', city: g.home_team?.city || '', country: 'USA',
      lat: coords[0], lng: coords[1],
      status: 'UPCOMING' as const,
      detail: 'Scheduled',
      startTime: timeET,
      color: SPORT_COLORS.basketball,
      dateUTC: utcTime,
    } as Game;
  }).filter(Boolean) as Game[];
}

function parseBDLBaseball(games: any[], targetDateET?: string): Game[] {
  return games.map(g => {
    const statusStr: string = g.status || '';
    const isScheduled = statusStr.includes('T') && statusStr.includes('Z');
    const scorePlayed = (g.home_team_score > 0 || g.visitor_team_score > 0);

    if (!isScheduled && scorePlayed) return null;

    const utcTime = isScheduled ? statusStr : `${g.date}T00:00:00Z`;
    const { dateET, timeET } = convertToEastern(utcTime);

    if (targetDateET && dateET !== targetDateET) return null;

    const homeName = g.home_team?.display_name || g.home_team_name || g.home_team?.name || '?';
    const awayName = g.away_team?.display_name || g.away_team_name || g.away_team?.name || '?';

    const coords = geocode(null, null, 'USA', homeName);
    if (!coords) return null;

    return {
      id: g.id + 900000,
      sport: 'baseball' as Sport,
      league: 'MLB',
      home: homeName,
      away: awayName,
      venue: '', city: g.home_team?.city || '', country: 'USA',
      lat: coords[0], lng: coords[1],
      status: 'UPCOMING' as const,
      detail: 'Scheduled',
      startTime: timeET,
      color: SPORT_COLORS.baseball,
      dateUTC: utcTime,
    } as Game;
  }).filter(Boolean) as Game[];
}

// ——— ESPN College Basketball Parser ———

function parseESPNCollegeBasketball(events: any[], targetDate?: string): Game[] {
  return events
    .map(event => {
      const comp = event.competitions?.[0];
      if (!comp) return null;

      // Only include scheduled games
      const statusName: string = event.status?.type?.name || comp.status?.type?.name || '';
      if (statusName !== 'STATUS_SCHEDULED') return null;

      // Extract teams
      const competitors = comp.competitors || [];
      const homeTeam = competitors.find((c: any) => c.homeAway === 'home');
      const awayTeam = competitors.find((c: any) => c.homeAway === 'away');
      const homeName = homeTeam?.team?.displayName || '?';
      const awayName = awayTeam?.team?.displayName || '?';

      // Extract venue info
      const venueName: string = comp.venue?.fullName || '';
      const venueCity: string = comp.venue?.address?.city || '';
      const venueState: string = comp.venue?.address?.state || '';

      // Convert time
      const utcTime: string = event.date || '';
      const { dateET, timeET } = convertToEastern(utcTime);

      if (targetDate && dateET !== targetDate) return null;

      // Geocode using city + state (much more accurate than team name matching)
      const coords = geocodeCityState(venueCity, venueState)
        || geocode(venueName || null, venueCity || null, 'USA', homeName);
      if (!coords) return null;

      // ESPN event IDs are strings like "401720123"
      const eventId = parseInt(event.id, 10) || 0;

      return {
        id: eventId + 200000,
        sport: 'college_basketball' as Sport,
        league: 'NCAA',
        home: homeName,
        away: awayName,
        venue: venueName,
        city: venueCity,
        country: 'USA',
        lat: coords[0],
        lng: coords[1],
        status: 'UPCOMING' as const,
        detail: 'Scheduled',
        startTime: timeET,
        color: SPORT_COLORS.college_basketball,
        dateUTC: utcTime,
      } as Game;
    })
    .filter(Boolean) as Game[];
}

// ——— ESPN Hockey Parser ———

function parseESPNHockey(events: any[], sportType: 'hockey' | 'college_hockey', targetDate?: string): Game[] {
  const league = sportType === 'hockey' ? 'NHL' : 'NCAA';
  const idOffset = sportType === 'hockey' ? 300000 : 400000;

  return events
    .map(event => {
      const comp = event.competitions?.[0];
      if (!comp) return null;

      // Only include scheduled games
      const statusName: string = event.status?.type?.name || comp.status?.type?.name || '';
      if (statusName !== 'STATUS_SCHEDULED') return null;

      // Extract teams
      const competitors = comp.competitors || [];
      const homeTeam = competitors.find((c: any) => c.homeAway === 'home');
      const awayTeam = competitors.find((c: any) => c.homeAway === 'away');
      const homeName = homeTeam?.team?.displayName || '?';
      const awayName = awayTeam?.team?.displayName || '?';

      // Extract venue info
      const venueName: string = comp.venue?.fullName || '';
      const venueCity: string = comp.venue?.address?.city || '';
      const venueState: string = comp.venue?.address?.state || '';

      // Convert time
      const utcTime: string = event.date || '';
      const { dateET, timeET } = convertToEastern(utcTime);

      if (targetDate && dateET !== targetDate) return null;

      // Determine country
      let country = 'USA';
      if (sportType === 'hockey') {
        const venueAddress: string = comp.venue?.address?.country || '';
        if (venueAddress.toLowerCase().includes('canada') || venueState === 'AB' || venueState === 'BC' || venueState === 'MB' || venueState === 'ON' || venueState === 'QC') {
          country = 'Canada';
        }
      }

      // Geocode
      const coords = sportType === 'college_hockey'
        ? (geocodeCityState(venueCity, venueState) || geocode(venueName || null, venueCity || null, 'USA', homeName))
        : geocode(venueName || null, venueCity || null, country, homeName);
      if (!coords) return null;

      // ESPN event IDs are strings like "401720123"
      const eventId = parseInt(event.id, 10) || 0;

      return {
        id: eventId + idOffset,
        sport: sportType as Sport,
        league,
        home: homeName,
        away: awayName,
        venue: venueName,
        city: venueCity,
        country,
        lat: coords[0],
        lng: coords[1],
        status: 'UPCOMING' as const,
        detail: 'Scheduled',
        startTime: timeET,
        color: SPORT_COLORS[sportType],
        dateUTC: utcTime,
      } as Game;
    })
    .filter(Boolean) as Game[];
}

// ——— Public API ———

export async function fetchAllGames(date?: string): Promise<Game[]> {
  const today = new Date().toISOString().split('T')[0];
  const targetDate = date || today;

  const [nbaRaw, mlbRaw, cbbRaw, nhlRaw, ncaahRaw] = await Promise.all([
    fetchSport('bdl_nba', targetDate),
    fetchSport('bdl_mlb', targetDate),
    fetchSport('espn_ncaab', targetDate),
    fetchSport('espn_nhl', targetDate),
    fetchSport('espn_ncaah', targetDate),
  ]);

  const nbaGames = parseBDLBasketball(nbaRaw, targetDate);
  const mlbGames = parseBDLBaseball(mlbRaw, targetDate);
  const cbbGames = parseESPNCollegeBasketball(cbbRaw, targetDate);
  const nhlGames = parseESPNHockey(nhlRaw, 'hockey', targetDate);
  const ncaahGames = parseESPNHockey(ncaahRaw, 'college_hockey', targetDate);

  return [...nbaGames, ...mlbGames, ...cbbGames, ...nhlGames, ...ncaahGames];
}
