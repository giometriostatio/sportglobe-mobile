import { useEffect, useState, useCallback } from 'react';
import { Game, SportFilter } from '../types';
import { fetchAllGames } from '../api/sportsApi';

export function useGames(date?: string) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<SportFilter>('all');

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchAllGames(date);
      setGames(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch games');
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  const filtered = filter === 'all' ? games : games.filter(g => g.sport === filter);

  return { games: filtered, allGames: games, loading, error, filter, setFilter, refresh };
}
