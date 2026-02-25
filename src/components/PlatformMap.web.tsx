import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import L from 'leaflet';
import { Game } from '../types';
import { SPORT_ICONS, TRIP_MARKER_COLOR } from '../data/constants';

export interface MapHandle {
  animateToRegion: (region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number }, duration?: number) => void;
}

interface Props {
  initialRegion: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
  games: Game[];
  isInTrip: (id: number) => boolean;
  onMarkerPress: (game: Game) => void;
  onRegionChangeComplete: (region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number }) => void;
}

function deltaToZoom(latDelta: number): number {
  return Math.round(Math.log2(360 / Math.max(latDelta, 0.001)));
}

function injectLeafletCSS() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('leaflet-css')) return;
  const link = document.createElement('link');
  link.id = 'leaflet-css';
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);
}

export const PlatformMap = forwardRef<MapHandle, Props>(
  ({ initialRegion, games, isInTrip, onMarkerPress, onRegionChangeComplete }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);

    useImperativeHandle(ref, () => ({
      animateToRegion: (region, duration = 800) => {
        if (!mapInstanceRef.current) return;
        const zoom = deltaToZoom(region.latitudeDelta);
        mapInstanceRef.current.flyTo([region.latitude, region.longitude], zoom, {
          duration: duration / 1000,
        });
      },
    }));

    const reportRegion = useCallback(() => {
      const map = mapInstanceRef.current;
      if (!map) return;
      const center = map.getCenter();
      const bounds = map.getBounds();
      const latDelta = bounds.getNorth() - bounds.getSouth();
      const lngDelta = bounds.getEast() - bounds.getWest();
      onRegionChangeComplete({
        latitude: center.lat,
        longitude: center.lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
      });
    }, [onRegionChangeComplete]);

    // Initialize map
    useEffect(() => {
      injectLeafletCSS();

      if (!containerRef.current || mapInstanceRef.current) return;

      const zoom = deltaToZoom(initialRegion.latitudeDelta);
      const map = L.map(containerRef.current, {
        center: [initialRegion.latitude, initialRegion.longitude],
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      map.on('moveend', reportRegion);

      mapInstanceRef.current = map;

      return () => {
        map.off('moveend', reportRegion);
        map.remove();
        mapInstanceRef.current = null;
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update markers when games change
    useEffect(() => {
      const map = mapInstanceRef.current;
      if (!map) return;

      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      games.forEach(game => {
        const inTrip = isInTrip(game.id);
        const size = inTrip ? 30 : 22;
        const color = inTrip ? TRIP_MARKER_COLOR : game.color;
        const icon = inTrip ? '\u2B50' : SPORT_ICONS[game.sport];
        const borderW = inTrip ? 2 : 1.5;

        const divIcon = L.divIcon({
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          html: `<div style="
            width:${size}px;height:${size}px;
            border-radius:50%;
            background:${color};
            border:${borderW}px solid rgba(255,255,255,0.9);
            display:flex;align-items:center;justify-content:center;
            font-size:${inTrip ? 13 : 10}px;
            box-shadow:0 0 ${inTrip ? 8 : 4}px ${color};
            cursor:pointer;
          ">${icon}</div>`,
        });

        const marker = L.marker([game.lat, game.lng], { icon: divIcon })
          .on('click', () => {
            onMarkerPress(game);
            map.flyTo([game.lat, game.lng], 6, { duration: 0.6 });
          })
          .addTo(map);

        markersRef.current.push(marker);
      });
    }, [games, isInTrip, onMarkerPress]);

    return (
      <View style={StyleSheet.absoluteFillObject}>
        <div
          ref={containerRef}
          style={{ width: '100%', height: '100%', background: '#06060f' }}
        />
      </View>
    );
  }
);
