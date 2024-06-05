import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';

let RNCamera;
if (Platform.OS !== 'web') {
  RNCamera = require('react-native-camera').RNCamera;
}

const HomeScreen = () => {
  const [cameraOn, setCameraOn] = useState(false);

  const renderCamera = () => (
    <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      captureAudio={false}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      onGoogleVisionBarcodesDetected={({ barcodes }) => {
        console.log(barcodes);
      }}
    >
      {({ camera, status }) => {
        if (status !== 'READY') return <Text>Loading...</Text>;
        return (
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <Button title="Take Picture" onPress={() => takePicture(camera)} />
          </View>
        );
      }}
    </RNCamera>
  );

  const takePicture = async (camera: any) => {
    const options = { quality: 0.5, base64: true, doNotSave: false };
    try {
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      Alert.alert("Picture Taken", data.uri);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to take picture: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {Platform.OS !== 'web' ? (
        <>
          <Button 
            title="Open Camera" 
            onPress={() => setCameraOn(!cameraOn)} 
          />
          {cameraOn && renderCamera()}
        </>
      ) : (
        <Text>Camera functionality is not available on web</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

export default HomeScreen;
