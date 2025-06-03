import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { getRequestDetails } from '../services/api';

const RequestStatusScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestId = route.params?.requestId;

  useEffect(() => {
    fetchRequestDetails();
  }, []);

  const fetchRequestDetails = async () => {
    try {
      const response = await getRequestDetails(requestId);
      if (response.success) {
        setRequest(response.data);
      } else {
        setError(response.message || 'خطا در دریافت اطلاعات درخواست');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#FFA000';
      case 'ACCEPTED':
        return '#2E7D32';
      case 'IN_PROGRESS':
        return '#1976D2';
      case 'COMPLETED':
        return '#388E3C';
      case 'CANCELLED':
        return '#D32F2F';
      default:
        return theme.text;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'در انتظار بررسی';
      case 'ACCEPTED':
        return 'پذیرفته شده';
      case 'IN_PROGRESS':
        return 'در حال انجام';
      case 'COMPLETED':
        return 'تکمیل شده';
      case 'CANCELLED':
        return 'لغو شده';
      default:
        return 'نامشخص';
    }
  };

  if (loading) {
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
          style={[styles.button, { backgroundColor: theme.button, borderColor: theme.buttonBorder }]}
          onPress={fetchRequestDetails}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>تلاش مجدد</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.card}>
        <Text style={[styles.title, { color: theme.text }]}>{request?.title}</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: getStatusColor(request?.status) }]}>
            {getStatusText(request?.status)}
          </Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={[styles.label, { color: theme.text }]}>توضیحات:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{request?.description}</Text>
          
          <Text style={[styles.label, { color: theme.text }]}>شهر:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{request?.city}</Text>
          
          <Text style={[styles.label, { color: theme.text }]}>تاریخ:</Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {new Date(request?.scheduledDate).toLocaleDateString('fa-IR')}
          </Text>

          {request?.price && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>قیمت:</Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {request.price.toLocaleString('fa-IR')} تومان
              </Text>
            </>
          )}

          {request?.agent && (
            <>
              <Text style={[styles.label, { color: theme.text }]}>نام عامل:</Text>
              <Text style={[styles.value, { color: theme.text }]}>{request.agent.name}</Text>
            </>
          )}
        </View>

        {['PENDING', 'ACCEPTED'].includes(request?.status) && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.button, borderColor: theme.buttonBorder }]}
            onPress={() => navigation.navigate('RequestFormScreen', { requestId })}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>ویرایش درخواست</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    marginBottom: 15,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
});

export default RequestStatusScreen;