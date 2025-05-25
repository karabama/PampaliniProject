import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { signup } from '../../services/api';
import { USER_TYPES } from '../../constants/constants';
import { AuthContext } from '../../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('basic');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useContext(AuthContext);

  const handleSignup = async () => {
    setError(''); setSuccess('');
    const res = await signup({ fullName, phoneNumber, nationalCode, password, userType });
    if (res.userId) {
      setSuccess('ثبت‌نام موفقیت‌آمیز بود!');
      // ورود خودکار پس از ثبت‌نام
      await login({ nationalCode, password, userType });
      setTimeout(() => navigation.replace(userType === 'admin' ? 'AdminDashboard' : userType === 'agent' ? 'AgentDashboard' : 'UserDashboard'), 1000);
    } else {
      setError(res.message || 'خطا در ثبت‌نام');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>ثبت‌نام</Text>
      <TextInput placeholder="نام و نام خانوادگی" value={fullName} onChangeText={setFullName} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="شماره موبایل" value={phoneNumber} onChangeText={setPhoneNumber} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="کد ملی" value={nationalCode} onChangeText={setNationalCode} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="رمز عبور" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Picker selectedValue={userType} onValueChange={setUserType} style={{ marginBottom: 8 }}>
        {USER_TYPES.map(type => type.value !== 'admin' && <Picker.Item key={type.value} label={type.label} value={type.value} />)}
      </Picker>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}
      <Button title="ثبت‌نام" onPress={handleSignup} />
      <Button title="بازگشت به ورود" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignupScreen;
