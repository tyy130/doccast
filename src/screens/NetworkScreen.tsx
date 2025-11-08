import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, NetworkDevice } from '../types';
import { NetworkService } from '../services/NetworkService';

type NetworkScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Network'
>;

export default function NetworkScreen() {
  const navigation = useNavigation<NetworkScreenNavigationProp>();
  const [isServerEnabled, setIsServerEnabled] = useState(false);
  const [serverPort, setServerPort] = useState('8080');
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [localAddress, setLocalAddress] = useState<string>('');

  useEffect(() => {
    loadNetworkInfo();
  }, []);

  const loadNetworkInfo = async () => {
    try {
      const address = await NetworkService.getLocalIPAddress();
      setLocalAddress(address);
    } catch (error) {
      console.error('Error getting network info:', error);
    }
  };

  const toggleServer = useCallback(async () => {
    try {
      if (!isServerEnabled) {
        // Start server
        const port = parseInt(serverPort, 10);
        if (isNaN(port) || port < 1024 || port > 65535) {
          Alert.alert('Invalid Port', 'Please enter a port between 1024 and 65535');
          return;
        }

        await NetworkService.startServer(port);
        setIsServerEnabled(true);
        Alert.alert(
          'Server Started',
          `Documents are now accessible at:\nhttp://${localAddress}:${port}`,
        );
      } else {
        // Stop server
        await NetworkService.stopServer();
        setIsServerEnabled(false);
        Alert.alert('Server Stopped', 'Document sharing has been disabled');
      }
    } catch (error) {
      console.error('Error toggling server:', error);
      Alert.alert('Error', 'Failed to toggle server');
    }
  }, [isServerEnabled, serverPort, localAddress]);

  const scanNetwork = useCallback(async () => {
    try {
      Alert.alert('Scanning Network', 'Looking for other DocCast devices...');
      const foundDevices = await NetworkService.scanForDevices();
      setDevices(foundDevices);

      if (foundDevices.length === 0) {
        Alert.alert('No Devices Found', 'No other DocCast devices found on the network');
      } else {
        Alert.alert('Devices Found', `Found ${foundDevices.length} device(s)`);
      }
    } catch (error) {
      console.error('Error scanning network:', error);
      Alert.alert('Error', 'Failed to scan network');
    }
  }, []);

  const connectToDevice = useCallback((device: NetworkDevice) => {
    Alert.alert(
      'Connect to Device',
      `Connect to ${device.name} at ${device.address}:${device.port}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => {
            // TODO: Implement device connection
            Alert.alert('Coming Soon', 'Device connection will be available soon');
          },
        },
      ],
    );
  }, []);

  const renderDevice = ({ item }: { item: NetworkDevice }) => (
    <TouchableOpacity
      style={styles.deviceItem}
      onPress={() => connectToDevice(item)}>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>🖥️ {item.name}</Text>
        <Text style={styles.deviceAddress}>{item.address}:{item.port}</Text>
      </View>
      <Text style={styles.connectButton}>→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Network</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Server</Text>
          <View style={styles.serverControl}>
            <View style={styles.serverInfo}>
              <Text style={styles.label}>Enable Server</Text>
              {localAddress ? (
                <Text style={styles.addressText}>
                  {localAddress}:{serverPort}
                </Text>
              ) : (
                <Text style={styles.addressText}>Getting address...</Text>
              )}
            </View>
            <Switch
              value={isServerEnabled}
              onValueChange={toggleServer}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isServerEnabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>

          {!isServerEnabled && (
            <View style={styles.portInput}>
              <Text style={styles.label}>Port:</Text>
              <TextInput
                style={styles.input}
                value={serverPort}
                onChangeText={setServerPort}
                keyboardType="number-pad"
                placeholder="8080"
                editable={!isServerEnabled}
              />
            </View>
          )}

          {isServerEnabled && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                ✓ Your documents are now accessible to devices on this network
              </Text>
              <Text style={styles.infoSubtext}>
                Other devices can browse to:
              </Text>
              <Text style={styles.urlText}>
                http://{localAddress}:{serverPort}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Network Devices</Text>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={scanNetwork}>
              <Text style={styles.scanButtonText}>🔍 Scan</Text>
            </TouchableOpacity>
          </View>

          {devices.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No devices found</Text>
              <Text style={styles.emptySubtext}>
                Tap 'Scan' to search for DocCast devices on your network
              </Text>
            </View>
          ) : (
            <FlatList
              data={devices}
              renderItem={renderDevice}
              keyExtractor={item => item.id}
              style={styles.deviceList}
            />
          )}
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  serverControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serverInfo: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  portInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: '#e6f7ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  infoSubtext: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  urlText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#bbb',
    textAlign: 'center',
  },
  deviceList: {
    maxHeight: 300,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  deviceAddress: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  connectButton: {
    fontSize: 24,
    color: '#007AFF',
  },
});
