import React from 'react';
import { View, Text } from 'react-native';

export default function UserCard({ user }) {
  return (
    <View style={{ padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>{user.fullName}</Text>
      <Text>{user.nationalCode}</Text>
      <Text>{user.userType}</Text>
    </View>
  );
}
