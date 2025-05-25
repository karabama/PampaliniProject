import React, { useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const UserProfileEditScreen = () => {
  const { theme } = useContext(ThemeContext);

  const handleSave = async () => {
    // Logic to save user profile changes
    console.log('Profile changes saved');
  };

  return (
    <View style={{ padding: 20, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>
        ویرایش پروفایل کاربر
      </Text>
      <TextInput
        placeholder="نام"
        placeholderTextColor={theme.text}
        style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: theme.primary, color: theme.text }}
      />
      <TextInput
        placeholder="شماره تماس"
        placeholderTextColor={theme.text}
        style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: theme.primary, color: theme.text }}
      />
      <TextInput
        placeholder="کد ملی"
        placeholderTextColor={theme.text}
        style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: theme.primary, color: theme.text }}
      />
      <Button title="ذخیره تغییرات" onPress={handleSave} color={theme.button} />
    </View>
  );
};

export default UserProfileEditScreen;
