import React, { createContext, useState, useEffect } from 'react';
import { getProfile, login as apiLogin, signup as apiSignup } from '../services/api';
import { getToken, storeToken, removeToken } from '../utils/auth';
import { View, Text } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, try to load user from token
    (async () => {
      const token = await getToken();
      console.log('Loaded token:', token);
      if (token) {
        const profile = await getProfile(token);
        console.log('Loaded profile:', profile);
        if (profile && profile.userType) setUser(profile);
      }
      setLoading(false);
    })();
  }, []);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.token) {
      // دریافت اطلاعات کاربر پس از ورود موفق
      const profile = await getProfile(res.token);
      if (profile && profile.userType) {
        await storeToken(res.token);
        setUser(profile);
        return true;
      }
    }
    return false;
  };

  const signup = async (credentials) => {
    const res = await apiSignup(credentials);
    if (res.token) {
      const profile = await getProfile(res.token);
      if (profile && profile.userType) {
        await storeToken(res.token);
        setUser(profile);
        return true;
      }
    }
    return false;
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  return (
    <>
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <Text>AuthProvider loading...</Text>
        </View>
      )}
      <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
