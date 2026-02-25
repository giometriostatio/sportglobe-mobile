import { useState, useCallback, useMemo } from 'react';
import { Game } from '../types';

export interface TripItem {
  game: Game;
  addedAt: number;
}

export function useTrip() {
  const [tripMap, setTripMap] = useState<Map<number, TripItem>>(new Map());

  const addToTrip = useCallback((game: Game) => {
    setTripMap(prev => {
      const next = new Map(prev);
      if (!next.has(game.id)) {
        next.set(game.id, { game, addedAt: Date.now() });
      }
      return next;
    });
  }, []);

  const removeFromTrip = useCallback((gameId: number) => {
    setTripMap(prev => {
      const next = new Map(prev);
      next.delete(gameId);
      return next;
    });
  }, []);

  const clearTrip = useCallback(() => {
    setTripMap(new Map());
  }, []);

  const isInTrip = useCallback((gameId: number) => {
    return tripMap.has(gameId);
  }, [tripMap]);

  const tripItems = useMemo(() => {
    return Array.from(tripMap.values()).sort((a, b) => {
      const dateA = a.game.dateUTC || '';
      const dateB = b.game.dateUTC || '';
      return dateA.localeCompare(dateB) || a.addedAt - b.addedAt;
    });
  }, [tripMap]);

  const tripCount = tripMap.size;

  return { tripItems, addToTrip, removeFromTrip, clearTrip, isInTrip, tripCount };
}
