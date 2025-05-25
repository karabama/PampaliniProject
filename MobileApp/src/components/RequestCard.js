import React from 'react';
import { View, Text } from 'react-native';

const RequestCard = ({ request }) => (
  <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>{request.title}</Text>
    <Text>{request.status}</Text>
  </View>
);

export default RequestCard;
