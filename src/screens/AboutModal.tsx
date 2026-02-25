import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function AboutModal({ visible, onClose }: Props) {
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
          <Text style={styles.icon}>🌍</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>SportGlobe</Text>
            <Text style={styles.label}>ABOUT & LEGAL</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>DISCLAIMER</Text>

          <Text style={styles.body}>
            SportGlobe is an independent application and is not affiliated with, endorsed by,
            sponsored by, or in any way officially connected with the National Basketball
            Association (NBA), National Football League (NFL), National Hockey League (NHL),
            Major League Baseball (MLB), National Collegiate Athletic Association (NCAA), or
            any of their respective teams, franchises, or affiliates.
          </Text>

          <Text style={styles.body}>
            All team names and game data referenced within this application are used solely
            for informational and identification purposes under nominative fair use. No team
            logos, league logos, or other proprietary visual assets are used within this
            application.
          </Text>

          <Text style={styles.body}>
            Game schedules, scores, and location data are provided by third-party data sources
            for informational purposes only and may not be fully accurate or up to date.
            SportGlobe makes no guarantees regarding the accuracy, completeness, or reliability
            of any data displayed.
          </Text>

          <Text style={styles.body}>
            This application is not intended for use in connection with gambling, sports
            betting, or any wagering activity.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.attribution}>
            Map data © OpenStreetMap contributors. Map powered by Leaflet.
          </Text>

          <Text style={styles.copyright}>© 2026 SportGlobe. All rights reserved.</Text>
        </ScrollView>
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
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  label: {
    fontSize: 9,
    color: '#F59E0B',
    fontFamily: 'monospace',
    letterSpacing: 2,
    fontWeight: '700',
    marginTop: 2,
  },
  scrollArea: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'monospace',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  body: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 16,
  },
  attribution: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
