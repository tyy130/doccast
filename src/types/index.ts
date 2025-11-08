export interface ScannedDocument {
  id: string;
  uri: string;
  timestamp: number;
  name: string;
}

export interface NetworkDevice {
  id: string;
  name: string;
  address: string;
  port: number;
}

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Preview: { imageUri: string };
  Gallery: undefined;
  Network: undefined;
};
