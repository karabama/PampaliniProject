import React, { useContext } from 'react';
import { View, Button } from 'react-native';
const MapView = require('react-native-maps').default;
const Marker = require('react-native-maps').Marker;
const Location = require('expo-location');
import { ThemeContext } from '../context/ThemeContext';

export default function LocationPicker({ onPick, initialLocation }) {
  const { theme } = useContext(ThemeContext);
  const [region, setRegion] = React.useState(initialLocation || {
    latitude: 35.6892,
    longitude: 51.3890,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [marker, setMarker] = React.useState(initialLocation || null);

  const handleMapPress = (e) => {
    setMarker(e.nativeEvent.coordinate);
  };

  const handlePickCurrent = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    let loc = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setMarker({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1, minHeight: 300 }}
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={handleMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
      <Button title="مکان فعلی من" onPress={handlePickCurrent} color={theme.button} />
      <Button title="تأیید موقعیت" onPress={() => marker && onPick(marker)} color={theme.button} />
    </View>
  );
}
