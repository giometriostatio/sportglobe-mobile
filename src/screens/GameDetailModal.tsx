import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Game } from '../types';
import { SPORT_ICONS } from '../data/constants';

interface Props {
  game: Game | null;
  visible: boolean;
  onClose: () => void;
  isInTrip: boolean;
  onAddToTrip: (game: Game) => void;
  onRemoveFromTrip: (gameId: number) => void;
}

export function GameDetailModal({ game, visible, onClose, isInTrip, onAddToTrip, onRemoveFromTrip }: Props) {
  if (!game) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={styles.sheet}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeTxt}>✕</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.sportIcon}>{SPORT_ICONS[game.sport]}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.league, { color: game.color }]}>{game.league}</Text>
            <Text style={styles.matchup}>{game.home} vs {game.away}</Text>
          </View>
        </View>

        {/* Time */}
        <View style={styles.scoreBox}>
          <Text style={styles.upcomingLabel}>Starts at</Text>
          <Text style={styles.startTime}>{game.startTime || 'TBD'}</Text>
        </View>

        {/* Venue */}
        {(game.venue || game.city) ? (
          <Text style={styles.venue}>
            📍 {game.venue}{game.city ? `${game.venue ? ', ' : ''}${game.city}` : ''}
          </Text>
        ) : null}

        {/* Trip Action */}
        <TouchableOpacity
          style={[styles.tripBtn, isInTrip && styles.tripBtnRemove]}
          onPress={() => isInTrip ? onRemoveFromTrip(game.id) : onAddToTrip(game)}
          activeOpacity={0.7}
        >
          <Text style={styles.tripBtnText}>
            {isInTrip ? 'Remove from Trip' : 'Add to Trip ⭐'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: 'rgba(6,6,15,0.97)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeTxt: {
    color: '#fff',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sportIcon: {
    fontSize: 28,
  },
  league: {
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  matchup: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginTop: 4,
  },
  scoreBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  upcomingLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  startTime: {
    fontSize: 28,
    fontWeight: '800',
    fontFamily: 'monospace',
    color: '#fff',
  },
  venue: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  tripBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  tripBtnRemove: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.5)',
  },
  tripBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
