import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getAllUsers, getAllAgents, getAllRequests, getAllTransactions } from '../../services/api';
import { getToken } from '../../utils/auth';

const AdminDashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [requests, setRequests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [section, setSection] = useState('');

  const fetchUsers = async () => {
    const token = await getToken();
    const data = await getAllUsers(token);
    setUsers(data);
    setSection('users');
  };
  const fetchAgents = async () => {
    const token = await getToken();
    const data = await getAllAgents(token);
    setAgents(data);
    setSection('agents');
  };
  const fetchRequests = async () => {
    const token = await getToken();
    const data = await getAllRequests(token);
    setRequests(data);
    setSection('requests');
  };
  const fetchTransactions = async () => {
    const token = await getToken();
    const data = await getAllTransactions(token);
    setTransactions(data);
    setSection('transactions');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>داشبورد مدیریت</Text>
      <Button title="مدیریت کاربران" onPress={fetchUsers} />
      <Button title="مدیریت عوامل" onPress={fetchAgents} />
      <Button title="مدیریت درخواست‌ها" onPress={fetchRequests} />
      <Button title="مدیریت تراکنش‌ها و گزارشات" onPress={fetchTransactions} />
      {section === 'users' && (
        <FlatList
          data={users}
          keyExtractor={item => item.id?.toString()}
          renderItem={({ item }) => <Text>{item.fullName} - {item.nationalCode} - {item.userType}</Text>}
        />
      )}
      {section === 'agents' && (
        <FlatList
          data={agents}
          keyExtractor={item => item.id?.toString()}
          renderItem={({ item }) => <Text>{item.fullName} - {item.nationalCode}</Text>}
        />
      )}
      {section === 'requests' && (
        <Text>درخواستی ثبت نشده است.</Text>
      )}
      {section === 'transactions' && (
        <Text>تراکنشی ثبت نشده است.</Text>
      )}
    </View>
  );
};

export default AdminDashboardScreen;
