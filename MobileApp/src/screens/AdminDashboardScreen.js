import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const AdminDashboardScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={{ padding: 20 }}>
      <Text>داشبورد ادمین</Text>
      <Button title="خروج" onPress={logout} color="#d32f2f" />
    </View>
  );
};

export default AdminDashboardScreen;
