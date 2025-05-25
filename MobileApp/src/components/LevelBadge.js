import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LevelBadge({ level }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{level}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
  },
});
