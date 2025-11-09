module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(' +
    '@react-native|' +
    'react-native|' +
    '@react-navigation|' +
    'react-native-vision-camera|' +
    'react-native-fs|' +
    'react-native-gesture-handler|' +
    'react-native-screens|' +
    'react-native-safe-area-context|' +
    'react-native-image-crop-picker' +
    ')/)',
  ],
  setupFiles: [
    './jest.setup.js',
  ],
};
