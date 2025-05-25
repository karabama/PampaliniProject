import React from 'react';
import { View, Text, FlatList } from 'react-native';

const dummyData = [
  { id: '1', title: 'درخواست ۱' },
  { id: '2', title: 'درخواست ۲' },
];

export default function RequestListScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>لیست درخواست‌ها</Text>
      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
