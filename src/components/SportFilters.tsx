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
      {FILTERS.map(f => (
        <TouchableOpacity
          key={f.key}
          style={[styles.btn, current === f.key && styles.btnActive]}
          onPress={() => onChange(f.key)}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{f.icon}</Text>
          <Text style={[styles.label, current === f.key && styles.labelActive]}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 6,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnActive: {
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  icon: {
    fontSize: 13,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.45)',
  },
  labelActive: {
    color: '#fff',
  },
});
