import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { getUserRequests } from '../services/api';

const RequestListScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await getUserRequests();
      if (response.success) {
        setRequests(response.data);
        setError(null);
      } else {
        setError(response.message || 'خطا در دریافت لیست درخواست‌ها');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#FFA000';
      case 'ACCEPTED': return '#2E7D32';
      case 'IN_PROGRESS': return '#1976D2';
      case 'COMPLETED': return '#388E3C';
      case 'CANCELLED': return '#D32F2F';
      default: return theme.text;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'در انتظار بررسی';
      case 'ACCEPTED': return 'پذیرفته شده';
      case 'IN_PROGRESS': return 'در حال انجام';
      case 'COMPLETED': return 'تکمیل شده';
      case 'CANCELLED': return 'لغو شده';
      default: return 'نامشخص';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.button, borderColor: theme.buttonBorder }]}
      onPress={() => navigation.navigate('RequestStatusScreen', { requestId: item.id })}
    >
      <Text style={[styles.title, { color: theme.buttonText }]}>{item.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={[styles.date, { color: theme.buttonText }]}>
          {new Date(item.scheduledDate).toLocaleDateString('fa-IR')}
        </Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
      {item.price && (
        <Text style={[styles.price, { color: theme.buttonText }]}>
          {item.price.toLocaleString('fa-IR')} تومان
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: theme.button, borderColor: theme.buttonBorder }]}
          onPress={fetchRequests}
        >
          <Text style={[styles.retryButtonText, { color: theme.buttonText }]}>تلاش مجدد</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.headerText, { color: theme.text }]}>لیست درخواست‌ها</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.text }]}>
            هیچ درخواستی ثبت نشده است
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'right',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    marginTop: 5,
  },
  error: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  retryButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default RequestListScreen;
