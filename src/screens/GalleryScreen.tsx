import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';
import type { RootStackParamList, ScannedDocument } from '../types';

type GalleryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Gallery'
>;

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 40) / 2; // 2 columns with padding

export default function GalleryScreen() {
  const navigation = useNavigation<GalleryScreenNavigationProp>();
  const [documents, setDocuments] = useState<ScannedDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = useCallback(async () => {
    try {
      const documentsDir = `${RNFS.DocumentDirectoryPath}/scanned-documents`;
      const dirExists = await RNFS.exists(documentsDir);

      if (!dirExists) {
        setDocuments([]);
        setLoading(false);
        return;
      }

      const files = await RNFS.readDir(documentsDir);
      const imageFiles = files
        .filter(file => file.name.endsWith('.jpg') || file.name.endsWith('.png'))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
        .map(file => ({
          id: file.name,
          uri: `file://${file.path}`,
          timestamp: file.mtime.getTime(),
          name: file.name,
        }));

      setDocuments(imageFiles);
    } catch (error) {
      console.error('Error loading documents:', error);
      Alert.alert('Error', 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDocuments();
    }, [loadDocuments]),
  );

  const deleteDocument = useCallback(
    async (document: ScannedDocument) => {
      Alert.alert(
        'Delete Document',
        'Are you sure you want to delete this document?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const filePath = document.uri.replace('file://', '');
                await RNFS.unlink(filePath);
                loadDocuments();
              } catch (error) {
                console.error('Error deleting document:', error);
                Alert.alert('Error', 'Failed to delete document');
              }
            },
          },
        ],
      );
    },
    [loadDocuments],
  );

  const renderDocument = ({ item }: { item: ScannedDocument }) => (
    <TouchableOpacity
      style={styles.documentItem}
      onLongPress={() => deleteDocument(item)}>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      <View style={styles.documentInfo}>
        <Text style={styles.documentDate} numberOfLines={1}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
        <Text style={styles.documentTime} numberOfLines={1}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>Loading documents...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (documents.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No documents yet</Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.scanButtonText}>📷 Scan First Document</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Gallery ({documents.length})</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={documents}
        renderItem={renderDocument}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  documentItem: {
    width: ITEM_SIZE,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  thumbnail: {
    width: '100%',
    height: ITEM_SIZE,
    backgroundColor: '#e0e0e0',
  },
  documentInfo: {
    padding: 8,
  },
  documentDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  documentTime: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});
