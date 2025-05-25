import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import UserProfileImage from '../components/UserProfileImage';
import LevelBadge from '../components/LevelBadge';
import UploadFileComponent from '../components/UploadFileComponent';
import { getProfile } from '../services/api';

const UserDashboardScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user || !user.fullName) {
      setLoading(true);
      getProfile(user?.token).then((p) => {
        setProfile(p);
        setLoading(false);
      });
    }
    if (user?.token) {
      import('../services/api').then(api => {
        api.getMyMissions(user.token).then(setMissions);
        api.getMyNotifications(user.token).then(setNotifications);
      });
    }
  }, [user]);

  if (loading || !profile) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={theme.button} />;

  const levelLabel = profile.userType === 'gold' ? 'طلایی' : profile.userType === 'silver' ? 'نقره‌ای' : 'عادی';
  const verifyLabel = profile.isVerified ? 'تأیید شده' : 'در انتظار یا ناقص';

  // styles باید داخل کامپوننت باشد تا theme را بگیرد
  const styles = StyleSheet.create({
    container: { backgroundColor: theme.background },
    profileBox: { alignItems: 'center', marginVertical: 20, backgroundColor: theme.background, padding: 16, borderRadius: 12, borderColor: theme.secondary, borderWidth: 1 },
    name: { fontSize: 20, fontWeight: 'bold', marginVertical: 8, color: theme.secondary },
    status: { color: theme.primary, marginBottom: 8 },
    section: { backgroundColor: theme.background, marginVertical: 10, padding: 12, borderRadius: 10, borderColor: theme.secondary, borderWidth: 0.5 },
    sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: theme.secondary },
    emptyText: { color: '#888', fontStyle: 'italic' },
    requestCard: { backgroundColor: '#e3f2fd', padding: 8, borderRadius: 8, marginBottom: 6, borderColor: theme.primary, borderWidth: 0.5 },
    quickAccessRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
    quickBtn: { backgroundColor: theme.primary, padding: 10, borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 2 },
    button: {
      backgroundColor: theme.button,
      borderColor: theme.buttonBorder,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileBox}>
        <UserProfileImage uri={profile.profilePhoto} size={80} />
        <Text style={styles.name}>{profile.fullName}</Text>
        <LevelBadge level={levelLabel} />
        <Text style={styles.status}>وضعیت احراز: {verifyLabel}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={styles.buttonText}>ویرایش پروفایل</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ماموریت‌های من</Text>
        {missions.length === 0 ? (
          <Text style={styles.emptyText}>ماموریتی ثبت نشده است.</Text>
        ) : (
          missions.map((mission, idx) => (
            <View key={idx} style={styles.requestCard}>
              <Text>{mission.title}</Text>
              <Text>{mission.status}</Text>
            </View>
          ))
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('NewMissionScreen')}
        >
          <Text style={styles.buttonText}>ثبت ماموریت جدید</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>آمار ماموریت‌ها</Text>
        <Text>تعداد کل: {missions.length}</Text>
        <Text>درصد موفق: ۰٪</Text>
      </View>

      {(!profile.isVerified || profile.userType === 'basic') && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ارتقای سطح کاربری</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('IdentityVerificationScreen')}
          >
            <Text style={styles.buttonText}>شروع فرایند ارتقا</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>اعلان‌ها</Text>
        {notifications.length === 0 ? (
          <Text style={styles.emptyText}>اعلانی وجود ندارد.</Text>
        ) : (
          notifications.map((n, idx) => <Text key={idx}>{n.text}</Text>)
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>دعوت از دوستان</Text>
        <Text>لینک دعوت: https://zebelkhan.ir/invite/{profile.nationalCode}</Text>
        <Text>با دعوت دوستان امتیاز یا تخفیف بگیرید!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>اشتراک‌گذاری لینک دعوت</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickAccessRow}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('MissionListScreen')}>
          <Text>ماموریت‌های من</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text>پروفایل</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('UserGuideScreen')}>
          <Text>راهنما</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('SupportScreen')}>
          <Text>پشتیبانی</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate('InviteScreen')}>
          <Text>دعوت از دوستان</Text>
        </TouchableOpacity>
      </View>

      {(!profile.isVerified || !profile.profilePhoto || !profile.nationalCardPhoto || !profile.faceVideo) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>تکمیل احراز هویت</Text>
          {!profile.profilePhoto && <UploadFileComponent label="آپلود عکس پرسنلی" onUpload={() => {}} />}
          {!profile.nationalCardPhoto && <UploadFileComponent label="آپلود کارت ملی" onUpload={() => {}} />}
          {!profile.faceVideo && <UploadFileComponent label="آپلود ویدئو چهره" onUpload={() => {}} />}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#d32f2f', borderColor: '#b71c1c' }]}
        onPress={logout}
      >
        <Text style={[styles.buttonText, { color: '#ffffff' }]}>خروج</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserDashboardScreen;
