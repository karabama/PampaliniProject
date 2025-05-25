import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDashboardStack from './UserDashboardStack';
import AgentDashboard from '../screens/AgentDashboard';
import AdminDashboard from '../screens/AdminDashboard';

const Tab = createBottomTabNavigator();

const MainTabs = ({ userType }) => (
  <Tab.Navigator>
    {userType === 'basic' && (
      <Tab.Screen name="UserDashboard" component={UserDashboardStack} options={{ title: 'خانه کاربر' }} />
    )}
    {userType === 'agent' && (
      <Tab.Screen name="AgentDashboard" component={AgentDashboard} options={{ title: 'خانه عامل' }} />
    )}
    {userType === 'admin' && (
      <Tab.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'مدیریت' }} />
    )}
  </Tab.Navigator>
);

export default MainTabs;
