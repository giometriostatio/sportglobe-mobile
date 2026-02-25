import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Linking } from 'react-native';
import { SPORT_ICONS } from '../data/constants';
import { TripItem } from '../hooks/useTrip';
import { showAlert } from '../utils/alert';

interface Props {
  visible: boolean;
  onClose: () => void;
  tripItems: TripItem[];
  onRemoveFromTrip: (gameId: number) => void;
  onClearTrip: () => void;
}

function formatTripDate(dateUTC?: string): string {
  if (!dateUTC) return '';
  const d = new Date(dateUTC);
  if (isNaN(d.getTime())) return '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${days[d.getUTCDay()]}`;
}

export function TripSummaryModal({ visible, onClose, tripItems, onRemoveFromTrip, onClearTrip }: Props) {
  const handleClear = () => {
    showAlert('Clear Trip', 'Remove all games from your trip?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: onClearTrip },
    ]);
  };

  const handleBuildItinerary = () => {
    if (tripItems.length === 0) {
      showAlert('No Games', 'Add some games to your trip first!');
      return;
    }

    const sorted = [...tripItems].sort((a, b) => {
      const da = a.game.dateUTC ? new Date(a.game.dateUTC).getTime() : 0;
      const db = b.game.dateUTC ? new Date(b.game.dateUTC).getTime() : 0;
      return da - db;
    });

    if (sorted.length === 1) {
      const g = sorted[0].game;
      showAlert('Open Directions', 'Choose your maps app:', [
        {
          text: 'Apple Maps',
          onPress: () => Linking.openURL(`https://maps.apple.com/?daddr=${g.lat},${g.lng}`),
        },
        {
          text: 'Google Maps',
          onPress: () => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}`),
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return;
    }

    const stops = sorted.map(s => `${s.game.lat},${s.game.lng}`);
    const googleUrl = `https://www.google.com/maps/dir/${stops.join('/')}`;
    const appleUrl = `https://maps.apple.com/?daddr=${stops.join('+to:')}`;

    showAlert('Open Itinerary', `Route through ${sorted.length} games`, [
      {
        text: 'Apple Maps',
        onPress: () => Linking.openURL(appleUrl),
      },
      {
        text: 'Google Maps',
        onPress: () => Linking.openURL(googleUrl),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

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
          <Text style={styles.headerIcon}>⭐</Text>
          <Text style={styles.headerTitle}>Your Trip</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{tripItems.length} game{tripItems.length !== 1 ? 's' : ''}</Text>
          </View>
        </View>

        {/* Trip Items */}
        {tripItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🗺️</Text>
            <Text style={styles.emptyText}>No games added yet</Text>
            <Text style={styles.emptyHint}>Tap a game on the map to start planning your trip</Text>
          </View>
        ) : (
          <>
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {tripItems.map(item => (
                <View key={item.game.id} style={styles.tripRow}>
                  <Text style={styles.tripIcon}>{SPORT_ICONS[item.game.sport]}</Text>
                  <View style={styles.tripInfo}>
                    <Text style={styles.tripTeams}>{item.game.away} @ {item.game.home}</Text>
                    <Text style={styles.tripMeta}>
                      {formatTripDate(item.game.dateUTC)}
                      {item.game.startTime ? ` · ${item.game.startTime}` : ''}
                      {item.game.city ? ` · ${item.game.city}` : ''}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => onRemoveFromTrip(item.game.id)}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.removeTxt}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Footer Actions */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.buildBtn}
                onPress={handleBuildItinerary}
                activeOpacity={0.7}
              >
                <Text style={styles.buildBtnText}>Build Itinerary</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={handleClear}
                activeOpacity={0.7}
              >
                <Text style={styles.clearBtnText}>Clear Trip</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    maxHeight: '70%',
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
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  countBadge: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  countText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyHint: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'monospace',
  },
  list: {
    maxHeight: 300,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  tripIcon: {
    fontSize: 20,
  },
  tripInfo: {
    flex: 1,
  },
  tripTeams: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  tripMeta: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(239,68,68,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeTxt: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    marginTop: 16,
    gap: 8,
  },
  buildBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buildBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  clearBtn: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.25)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
});
