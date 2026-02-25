import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { Game } from '../types';
import { SPORT_ICONS, TRIP_MARKER_COLOR } from '../data/constants';

export interface MapHandle {
  animateToRegion: (region: Region, duration?: number) => void;
}

interface Props {
  initialRegion: Region;
  games: Game[];
  isInTrip: (id: number) => boolean;
  onMarkerPress: (game: Game) => void;
  onRegionChangeComplete: (region: Region) => void;
}

export const PlatformMap = forwardRef<MapHandle, Props>(
  ({ initialRegion, games, isInTrip, onMarkerPress, onRegionChangeComplete }, ref) => {
    const mapRef = useRef<MapView>(null);

    useImperativeHandle(ref, () => ({
      animateToRegion: (region: Region, duration?: number) => {
        mapRef.current?.animateToRegion(region, duration);
      },
    }));

    return (
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        mapType="mutedStandard"
        userInterfaceStyle="dark"
        showsUserLocation={false}
        showsCompass={false}
        showsScale={false}
        rotateEnabled={false}
        pitchEnabled={false}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {games.map(game => {
          const inTrip = isInTrip(game.id);
          return (
            <Marker
              key={`${game.id}-${inTrip}`}
              coordinate={{ latitude: game.lat, longitude: game.lng }}
              onPress={() => onMarkerPress(game)}
              tracksViewChanges={false}
            >
              <View style={markerStyles.markerWrap}>
                <View
                  style={[
                    markerStyles.markerDot,
                    {
                      backgroundColor: inTrip ? TRIP_MARKER_COLOR : game.color,
                      width: inTrip ? 30 : 22,
                      height: inTrip ? 30 : 22,
                      borderWidth: inTrip ? 2 : 1.5,
                      shadowColor: inTrip ? TRIP_MARKER_COLOR : game.color,
                      shadowOpacity: inTrip ? 0.8 : 0.4,
                      shadowRadius: inTrip ? 8 : 4,
                    },
                  ]}
                >
                  <Text style={{ fontSize: inTrip ? 13 : 10 }}>
                    {inTrip ? '\u2B50' : SPORT_ICONS[game.sport]}
                  </Text>
                </View>
              </View>
            </Marker>
          );
        })}
      </MapView>
    );
  }
);

const markerStyles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
  },
  markerDot: {
    borderRadius: 999,
    borderColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
});
