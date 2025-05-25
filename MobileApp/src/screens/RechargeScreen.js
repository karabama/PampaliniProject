import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const RechargeScreen = () => {
  const { theme } = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: theme.button,
    borderColor: theme.buttonBorder,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  };

  const buttonTextStyle = {
    color: theme.buttonText,
    fontSize: 16,
  };

  return (
    <View style={{ padding: 20, backgroundColor: theme.background }}>
      <Text style={{ color: theme.text }}>
        شارژ کیف پول
      </Text>
      <TextInput
        placeholder="مبلغ"
        placeholderTextColor={theme.text}
        style={{ borderBottomWidth: 1, marginBottom: 10, borderColor: theme.primary, color: theme.text }}
      />
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {}}
      >
        <Text style={buttonTextStyle}>شارژ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RechargeScreen;
