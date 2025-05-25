import React from 'react';
import { View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadFileComponent = ({ label, onUpload }) => {
  const handlePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All });
    if (!result.canceled) onUpload(result.assets[0].uri);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Button title={label || 'انتخاب فایل'} onPress={handlePick} />
    </View>
  );
};

export default UploadFileComponent;
