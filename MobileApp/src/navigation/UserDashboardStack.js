import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import NewMissionScreen from '../screens/NewMissionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import IdentityVerificationScreen from '../screens/IdentityVerificationScreen';
import ThemeSettingsScreen from '../screens/ThemeSettingsScreen';
// سایر صفحات مورد نیاز را اضافه کنید

const Stack = createNativeStackNavigator();

const UserDashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="UserDashboardScreen" component={UserDashboardScreen} options={{ title: 'داشبورد کاربر' }} />
    <Stack.Screen name="NewMissionScreen" component={NewMissionScreen} options={{ title: 'ثبت ماموریت جدید' }} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'پروفایل' }} />
    <Stack.Screen name="IdentityVerificationScreen" component={IdentityVerificationScreen} options={{ title: 'احراز هویت' }} />
    <Stack.Screen name="ThemeSettingsScreen" component={ThemeSettingsScreen} options={{ title: 'تنظیمات تم' }} />
    {/* سایر صفحات */}
  </Stack.Navigator>
);

export default UserDashboardStack;
