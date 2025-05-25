import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Colors from '../constants/Colors';

export default function LocationPicker({ onPick }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ padding: 20 }}>
      <Text>انتخاب محل روی نقشه فقط در اپلیکیشن موبایل فعال است.</Text>
      <Button title="تأیید بدون انتخاب نقشه" onPress={() => onPick(null)} color={theme.button} />
    </View>
  );
}
