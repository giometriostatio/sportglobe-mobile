import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SportFilter } from '../types';
import { FILTERS } from '../data/constants';

interface Props {
  current: SportFilter;
  onChange: (filter: SportFilter) => void;
}

export function SportFilters({ current, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTERS.map(f => {
        const isActive = current === f.key;
        return (
          <TouchableOpacity
            key={f.key}
            style={[styles.btn, isActive && styles.btnActive]}
            onPress={() => onChange(f.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{f.icon}</Text>
            {isActive && (
              <Text style={styles.labelActive}>{f.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    gap: 5,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnActive: {
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  icon: {
    fontSize: 14,
  },
  labelActive: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
});
