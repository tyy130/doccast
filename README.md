# DocCast - Mobile Document Scanner

A React Native mobile application that transforms your phone camera into a powerful network-accessible document scanner.

## Features

- 📷 **Document Scanning**: Use your phone's camera to capture and scan documents
- 📁 **Document Gallery**: View and manage all your scanned documents
- 🌐 **Network Sharing**: Share documents across your local network
- 🔍 **Device Discovery**: Find and connect to other DocCast devices on your network
- 💾 **Local Storage**: All documents are stored locally on your device
- 🎨 **Clean UI**: Modern, intuitive user interface

## Screenshots

### Home Screen
The main screen provides quick access to all features:
- Scan new documents
- View document gallery
- Access network devices

### Camera Screen
- Real-time camera preview
- One-tap document capture
- Automatic orientation detection

### Preview Screen
- Review captured documents
- Save or retake options
- Image quality optimization

### Gallery Screen
- Grid view of all scanned documents
- Sort by date
- Delete documents
- Quick scan button

### Network Screen
- Enable/disable document server
- Scan for network devices
- Connect to remote DocCast instances
- View network address and port

## Installation

### Prerequisites

- Node.js >= 20
- React Native development environment
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and SDK

### Setup

1. Clone the repository:
```bash
git clone https://github.com/tyy130/doccast.git
cd doccast
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install pods:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. Run the app:

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

## Usage

### Scanning Documents

1. Open the app and tap "Scan Document"
2. Point your camera at the document
3. Tap the capture button
4. Review the scanned image
5. Tap "Save" to store the document

### Network Sharing

1. Go to "Network Devices"
2. Enable the document server
3. Note your network address and port
4. Other devices can access your documents via browser or app

### Device Discovery

1. In Network screen, tap "Scan"
2. Wait for nearby DocCast devices to appear
3. Tap a device to connect and browse their documents

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation
- **React Native Vision Camera**: Camera functionality
- **React Native FS**: File system operations
- **React Native Gesture Handler**: Touch interactions

## Project Structure

```
doccast/
├── src/
│   ├── components/     # Reusable components
│   ├── screens/        # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── PreviewScreen.tsx
│   │   ├── GalleryScreen.tsx
│   │   └── NetworkScreen.tsx
│   ├── services/       # Business logic
│   │   └── NetworkService.ts
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   └── utils/          # Utility functions
├── android/            # Android native code
├── ios/                # iOS native code
├── App.tsx             # Root component
└── package.json        # Dependencies
```

## Permissions

### Android
- Camera access
- Storage read/write
- Internet access

### iOS
- Camera usage
- Photo library access
- Photo library add usage

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production

#### Android
```bash
cd android
./gradlew assembleRelease
```

#### iOS
```bash
cd ios
xcodebuild -workspace DocCast.xcworkspace -scheme DocCast -configuration Release
```

## Future Enhancements

- [ ] OCR (Optical Character Recognition) for text extraction
- [ ] PDF export functionality
- [ ] Cloud storage integration
- [ ] Advanced image filters and enhancement
- [ ] Batch scanning mode
- [ ] Document annotations
- [ ] QR code generation for easy sharing
- [ ] End-to-end encryption for network transfers
- [ ] Multi-page document support
- [ ] Search and organization features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Acknowledgments

- React Native team for the excellent framework
- Vision Camera library for camera functionality
- All open-source contributors

---

Made with ❤️ for document scanning enthusiasts
