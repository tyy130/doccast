import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';
import type { RootStackParamList } from '../types';

type PreviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Preview'
>;

type PreviewScreenRouteProp = RouteProp<RootStackParamList, 'Preview'>;

export default function PreviewScreen() {
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const route = useRoute<PreviewScreenRouteProp>();
  const { imageUri } = route.params;
  const [isSaving, setIsSaving] = useState(false);

  const saveDocument = useCallback(async () => {
    try {
      setIsSaving(true);

      // Create documents directory if it doesn't exist
      const documentsDir = `${RNFS.DocumentDirectoryPath}/scanned-documents`;
      const dirExists = await RNFS.exists(documentsDir);
      if (!dirExists) {
        await RNFS.mkdir(documentsDir);
      }

      // Generate filename with timestamp
      const timestamp = Date.now();
      const filename = `document_${timestamp}.jpg`;
      const destPath = `${documentsDir}/${filename}`;

      // Copy the image to the documents directory
      await RNFS.copyFile(imageUri, destPath);

      Alert.alert(
        'Success',
        'Document saved successfully!',
        [
          {
            text: 'View Gallery',
            onPress: () => navigation.navigate('Gallery'),
          },
          {
            text: 'Scan Another',
            onPress: () => navigation.navigate('Camera'),
          },
          {
            text: 'Home',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    } catch (error) {
      console.error('Error saving document:', error);
      Alert.alert('Error', 'Failed to save document');
    } finally {
      setIsSaving(false);
    }
  }, [imageUri, navigation]);

  const retake = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={retake}
          disabled={isSaving}>
          <Text style={styles.secondaryButtonText}>↻ Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, isSaving && styles.disabledButton]}
          onPress={saveDocument}
          disabled={isSaving}>
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>✓ Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 120,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 120,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
