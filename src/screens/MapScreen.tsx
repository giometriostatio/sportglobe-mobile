import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlatformMap, MapHandle } from '../components/PlatformMap';
import { useGames } from '../hooks/useGames';
import { useTrip } from '../hooks/useTrip';
import { SportFilters } from '../components/SportFilters';
import { DatePicker } from '../components/DatePicker';
import { GameDetailModal } from './GameDetailModal';
import { TripSummaryModal } from './TripSummaryModal';
import { AboutModal } from './AboutModal';
import { Game } from '../types';
import { REGIONS } from '../data/constants';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const INITIAL_REGION: Region = {
  latitude: 20,
  longitude: 0,
  latitudeDelta: 120,
  longitudeDelta: 120,
};

function getTomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function MapScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapHandle>(null);
  const [selectedDate, setSelectedDate] = useState(getTomorrow);
  const { games, loading, error, filter, setFilter, refresh } = useGames(selectedDate);
  const { tripItems, addToTrip, removeFromTrip, clearTrip, isInTrip, tripCount } = useTrip();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tripModalVisible, setTripModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const handleMarkerPress = useCallback((game: Game) => {
    setSelectedGame(game);
    setModalVisible(true);
    mapRef.current?.animateToRegion({
      latitude: game.lat,
      longitude: game.lng,
      latitudeDelta: 10,
      longitudeDelta: 10,
    }, 600);
  }, []);

  const [currentRegion, setCurrentRegion] = useState<Region>(INITIAL_REGION);

  const handleRegionNav = useCallback((lat: number, lng: number, zoom: number) => {
    const delta = 360 / Math.pow(2, zoom);
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: delta,
      longitudeDelta: delta,
    }, 800);
  }, []);

  const handleRegionChange = useCallback((region: Region) => {
    setCurrentRegion(region);
  }, []);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    const factor = direction === 'in' ? 0.5 : 2;
    const newLatDelta = Math.max(0.01, Math.min(160, currentRegion.latitudeDelta * factor));
    const newLngDelta = Math.max(0.01, Math.min(360, currentRegion.longitudeDelta * factor));
    mapRef.current?.animateToRegion({
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      latitudeDelta: newLatDelta,
      longitudeDelta: newLngDelta,
    }, 300);
  }, [currentRegion]);

  return (
    <View style={styles.root}>
      <PlatformMap
        ref={mapRef}
        initialRegion={INITIAL_REGION}
        games={games}
        isInTrip={isInTrip}
        onMarkerPress={handleMarkerPress}
        onRegionChangeComplete={handleRegionChange}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.logoRow}>
          <Text style={styles.globe}>🌍</Text>
          <View>
            <Text style={styles.title}>SportGlobe</Text>
            <Text style={styles.subtitle}>TRIP PLANNER</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.infoBtn}
            onPress={() => setAboutModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.infoBtnText}>ⓘ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tripBadge}
            onPress={() => setTripModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.tripBadgeIcon}>⭐</Text>
            <Text style={styles.tripBadgeCount}>{tripCount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tagline */}
      <View style={styles.taglineRow}>
        <Text style={styles.tagline}>Plan your ultimate sports road trip</Text>
      </View>

      {/* Date Picker */}
      <View style={styles.dateRow}>
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <SportFilters current={filter} onChange={setFilter} />
      </View>

      {/* Region Nav */}
      <View style={[styles.regionNav, { top: insets.top + 180 }]}>
        {REGIONS.map(r => (
          <TouchableOpacity
            key={r.title}
            style={styles.navBtn}
            onPress={() => handleRegionNav(r.lat, r.lng, r.zoom)}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>{r.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => mapRef.current?.animateToRegion(INITIAL_REGION, 800)}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Zoom Controls */}
      <View style={[styles.zoomControls, { top: insets.top + 180 + (REGIONS.length + 1) * 40 + 12 }]}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => handleZoom('in')}
          activeOpacity={0.7}
        >
          <Text style={styles.zoomIcon}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => handleZoom('out')}
          activeOpacity={0.7}
        >
          <Text style={styles.zoomIcon}>−</Text>
        </TouchableOpacity>
      </View>

      {/* Loading / Error */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#F59E0B" size="large" />
          <Text style={styles.loadingText}>Loading games...</Text>
        </View>
      )}
      {error && (
        <TouchableOpacity style={styles.errorBar} onPress={refresh}>
          <Text style={styles.errorText}>{error} — tap to retry</Text>
        </TouchableOpacity>
      )}

      {/* Game Detail Modal */}
      <GameDetailModal
        game={selectedGame}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isInTrip={selectedGame ? isInTrip(selectedGame.id) : false}
        onAddToTrip={addToTrip}
        onRemoveFromTrip={removeFromTrip}
      />

      {/* Trip Summary Modal */}
      <TripSummaryModal
        visible={tripModalVisible}
        onClose={() => setTripModalVisible(false)}
        tripItems={tripItems}
        onRemoveFromTrip={removeFromTrip}
        onClearTrip={clearTrip}
      />

      {/* About Modal */}
      <AboutModal
        visible={aboutModalVisible}
        onClose={() => setAboutModalVisible(false)}
      />

      {/* Disclaimer Footer */}
      <View style={[styles.disclaimerFooter, { paddingBottom: insets.bottom + 4 }]} pointerEvents="none">
        <Text style={styles.disclaimerText}>
          SportGlobe is not affiliated with any professional sports league or team. For informational use only.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#06060f',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'rgba(6,6,15,0.92)',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  globe: {
    fontSize: 26,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 9,
    color: '#F59E0B',
    fontFamily: 'monospace',
    letterSpacing: 2,
    fontWeight: '700',
  },
  tripBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245,158,11,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tripBadgeIcon: {
    fontSize: 13,
  },
  tripBadgeCount: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  taglineRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 78,
    alignItems: 'center',
  },
  tagline: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  dateRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 92,
  },
  filtersRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 159,
  },
  regionNav: {
    position: 'absolute',
    right: 12,
    gap: 4,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 14,
  },
  zoomControls: {
    position: 'absolute',
    right: 12,
    gap: 4,
  },
  zoomIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontFamily: 'monospace',
  },
  errorBar: {
    position: 'absolute',
    top: 140,
    alignSelf: 'center',
    backgroundColor: 'rgba(239,68,68,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBtnText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontWeight: '700',
  },
  disclaimerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  disclaimerText: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 9,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
