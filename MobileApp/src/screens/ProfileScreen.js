import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ padding: 20, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>
        پروفایل کاربر
      </Text>
      <Button title="ویرایش پروفایل" onPress={() => {}} color={theme.button} />
    </View>
  );
}
