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
      showsVerticalScrollIndicator={false}
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
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    alignItems: 'center',
    paddingVertical: 4,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  icon: {
    fontSize: 16,
  },
});
