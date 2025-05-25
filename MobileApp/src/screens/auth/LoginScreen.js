import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { USER_TYPES } from '../../constants/constants';
import { Picker } from '@react-native-picker/picker';

const LoginScreen = ({ navigation }) => {
  const [nationalCode, setNationalCode] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('basic');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setError('');
    const success = await login({ nationalCode, password, userType });
    if (!success) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>ورود</Text>
      <TextInput placeholder="کد ملی" value={nationalCode} onChangeText={setNationalCode} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="رمز عبور" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Picker selectedValue={userType} onValueChange={setUserType} style={{ marginBottom: 8 }}>
        {USER_TYPES.map(type => <Picker.Item key={type.value} label={type.label} value={type.value} />)}
      </Picker>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="ورود" onPress={handleLogin} />
      <Button title="ثبت‌نام" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default LoginScreen;
