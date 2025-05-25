import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {user ? <MainTabs userType={user.userType} /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;