import React from 'react';
import { Image } from 'react-native';

const UserProfileImage = ({ uri, size = 64 }) => (
  <Image
    source={uri ? { uri } : require('../assets/logo.png')}
    style={{ width: size, height: size, borderRadius: size / 2 }}
  />
);

export default UserProfileImage;
