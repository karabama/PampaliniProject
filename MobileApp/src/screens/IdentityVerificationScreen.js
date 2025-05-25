import React from 'react';
import { View, Text } from 'react-native';
import UploadFileComponent from '../components/UploadFileComponent';

const IdentityVerificationScreen = () => {
  const handleUpload = (uri) => {
    console.log('Uploaded:', uri);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>احراز هویت</Text>
      <UploadFileComponent label="آپلود کارت ملی" onUpload={handleUpload} />
    </View>
  );
};

export default IdentityVerificationScreen;
