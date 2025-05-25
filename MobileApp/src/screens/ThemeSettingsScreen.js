import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const modes = [
  { key: 'auto', label: 'اتوماتیک (بر اساس سیستم)' },
  { key: 'light', label: 'تم روشن' },
  { key: 'dark', label: 'تم تیره' },
];

export default function ThemeSettingsScreen() {
  const { mode, setMode, theme } = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.text }]}>انتخاب تم اپلیکیشن</Text>
      {modes.map((m) => (
        <TouchableOpacity
          key={m.key}
          style={[styles.option, { borderColor: mode === m.key ? theme.primary : '#ccc' }]}
          onPress={() => setMode(m.key)}
        >
          <Text style={{ color: theme.text }}>{m.label}</Text>
          {mode === m.key && <Text style={{ color: theme.primary }}>✓</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderWidth: 2, borderRadius: 10, marginBottom: 12 },
});
