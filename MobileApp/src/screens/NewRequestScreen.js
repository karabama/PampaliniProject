import React, { useState, useContext } from 'react';
import { View, TextInput, Text, Platform, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import UploadFileComponent from '../components/UploadFileComponent';
import LocationPicker from '../components/LocationPicker';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { submitMissionOrRequest } from '../services/api';
import Colors from '../constants/Colors';

// اگر لیست شهرها ندارید، این آرایه را کامل‌تر کنید
const CITIES = ['تهران', 'شیراز', 'اصفهان', 'مشهد', 'تبریز'];

export default function NewRequestScreen({ navigation, isMission }) {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState(CITIES[0]);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState('');
  const [allowAgentPrice, setAllowAgentPrice] = useState(false);
  const [location, setLocation] = useState(null); // برای مختصات نقشه
  const [showMap, setShowMap] = useState(false);

  const handleFileUpload = (uri) => setFiles([...files, uri]);

  const handleDateChange = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate) setDate(selectedDate);
  };
  const handleTimeChange = (event, selectedTime) => {
    setShowTime(false);
    if (selectedTime) setDate(selectedTime);
  };

  const handleLocationPick = () => setShowMap(true);
  const handleLocationSelected = (coords) => {
    setLocation(coords);
    setShowMap(false);
  };

  const handleSubmit = async () => {
    if (!title || !description || !city || !date) {
      alert('لطفاً همه فیلدهای ضروری را پر کنید.');
      return;
    }
    const result = await submitMissionOrRequest({
      token: user.token,
      isMission,
      title,
      description,
      city,
      date,
      files,
      price,
      allowAgentPrice,
      location
    });
    if (result && !result.error) {
      navigation.navigate('RequestStatusScreen');
    } else {
      alert(result.error || 'خطا در ثبت اطلاعات');
    }
  };

  if (showMap) {
    return <LocationPicker onPick={handleLocationSelected} initialLocation={location} />;
  }

  const buttonStyle = {
    backgroundColor: theme.button,
    borderColor: theme.buttonBorder,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  };

  const buttonTextStyle = {
    color: theme.buttonText,
    fontSize: 16,
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{isMission ? 'ثبت ماموریت جدید' : 'ثبت درخواست جدید'}</Text>
      <TextInput
        placeholder="عنوان {isMission ? 'ماموریت' : 'درخواست'}"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10, color: theme.text }}
      />
      <TextInput
        placeholder="توضیحات"
        value={description}
        onChangeText={setDescription}
        style={{ borderBottomWidth: 1, marginBottom: 10, minHeight: 60, textAlignVertical: 'top', color: theme.text }}
        multiline
      />
      <Text style={{ marginTop: 10, color: theme.text }}>شهر محل انجام خدمت:</Text>
      <Picker selectedValue={city} onValueChange={setCity} style={{ marginBottom: 10 }}>
        {CITIES.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>
      <Text style={{ marginTop: 10, color: theme.text }}>تاریخ و ساعت مورد نظر:</Text>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setShowDate(true)}
      >
        <Text style={buttonTextStyle}>{date.toLocaleString('fa-IR')}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setShowTime(true)}
      >
        <Text style={buttonTextStyle}>انتخاب ساعت</Text>
      </TouchableOpacity>
      {showTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
      <Text style={{ marginTop: 10, color: theme.text }}>محل انجام روی نقشه:</Text>
      <TouchableOpacity
        style={buttonStyle}
        onPress={handleLocationPick}
      >
        <Text style={buttonTextStyle}>
          {location ? 'تغییر محل روی نقشه' : 'انتخاب محل روی نقشه'}
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10, color: theme.text }}>فایل‌های ضمیمه:</Text>
      <UploadFileComponent label="افزودن فایل/عکس" onUpload={handleFileUpload} />
      {files.map((f, i) => <Text key={i} style={{ fontSize: 12, color: theme.text }}>{f}</Text>)}
      <Text style={{ marginTop: 10, color: theme.text }}>مبلغ پیشنهادی شما (تومان):</Text>
      <TextInput
        placeholder="مثلاً ۵۰۰۰۰۰"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10, color: theme.text }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch value={allowAgentPrice} onValueChange={setAllowAgentPrice} />
        <Text style={{ marginLeft: 8, color: theme.text }}>اجازه به عامل برای ارائه قیمت پیشنهادی</Text>
      </View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={handleSubmit}
      >
        <Text style={buttonTextStyle}>
          {isMission ? 'ثبت ماموریت' : 'ثبت درخواست'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
