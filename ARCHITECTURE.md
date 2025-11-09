# DocCast App Architecture

## Overview
DocCast is a mobile document scanner application built with React Native that allows users to scan documents using their phone camera and share them over a local network.

## Application Flow

```
┌─────────────────┐
│   Home Screen   │
│                 │
│  - Scan Doc     │───┐
│  - Gallery      │───┼───┐
│  - Network      │───┼───┼───┐
└─────────────────┘   │   │   │
                      │   │   │
        ┌─────────────┘   │   │
        │                 │   │
        ▼                 │   │
┌─────────────────┐       │   │
│  Camera Screen  │       │   │
│                 │       │   │
│  - Live Preview │       │   │
│  - Capture Btn  │       │   │
└─────────────────┘       │   │
        │                 │   │
        │ Capture         │   │
        ▼                 │   │
┌─────────────────┐       │   │
│ Preview Screen  │       │   │
│                 │       │   │
│  - Image View   │       │   │
│  - Save/Retake  │       │   │
└─────────────────┘       │   │
        │                 │   │
        │ Save            │   │
        └─────────────────┼───┘
                          │
        ┌─────────────────┘
        │
        ▼
┌─────────────────┐
│  Gallery Screen │
│                 │
│  - Grid View    │
│  - Delete       │
└─────────────────┘
                          
        ┌─────────────────┘
        │
        ▼
┌─────────────────┐
│ Network Screen  │
│                 │
│  - Server Toggle│
│  - Device List  │
└─────────────────┘
```

## Directory Structure

```
doccast/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx         # Main landing page
│   │   ├── CameraScreen.tsx       # Camera capture interface
│   │   ├── PreviewScreen.tsx      # Image preview and save
│   │   ├── GalleryScreen.tsx      # Document gallery grid
│   │   └── NetworkScreen.tsx      # Network sharing controls
│   │
│   ├── services/
│   │   └── NetworkService.ts      # Network operations (mock)
│   │
│   └── types/
│       └── index.ts               # TypeScript type definitions
│
├── android/                        # Android native code
├── ios/                            # iOS native code
├── App.tsx                         # Root component with navigation
└── package.json                    # Dependencies
```

## Key Components

### HomeScreen
- Entry point of the application
- Provides navigation to all main features
- Clean, button-based interface

### CameraScreen
- Uses `react-native-vision-camera` for camera access
- Real-time camera preview
- Handles camera permissions
- Captures photos on button press
- Navigates to preview after capture

### PreviewScreen
- Displays captured image
- Options to save or retake
- Saves to local filesystem using `react-native-fs`
- Navigation to gallery after save

### GalleryScreen
- Grid layout (2 columns)
- Displays all scanned documents
- Sort by date (newest first)
- Delete documents (long press)
- Empty state with scan prompt
- Floating action button for quick scan

### NetworkScreen
- Toggle server on/off
- Configure server port
- Display local IP address
- Scan for network devices
- Device list with connection options
- Mock implementation ready for real networking

## Data Flow

### Document Scanning Flow
1. User taps "Scan Document" on Home
2. Camera screen opens with live preview
3. User captures photo
4. Preview screen shows captured image
5. User saves document
6. Document stored in local filesystem
7. User navigated to gallery or home

### Document Storage
- Location: `{DocumentDirectory}/scanned-documents/`
- Format: `document_{timestamp}.jpg`
- Managed by React Native FS

### Network Flow (Mock Implementation)
1. User enables server in Network screen
2. Server binds to specified port
3. Local IP address displayed
4. Other devices can discover via UDP broadcast
5. Documents served over HTTP

## Technologies & Libraries

### Core
- React Native 0.82.1
- TypeScript 5.8.3
- React 19.1.1

### Navigation
- @react-navigation/native
- @react-navigation/native-stack

### Camera
- react-native-vision-camera

### File System
- react-native-fs

### UI
- react-native-gesture-handler
- react-native-screens
- react-native-safe-area-context

## Permissions

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

### iOS (Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>DocCast needs access to your camera to scan documents</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>DocCast needs access to your photo library to save scanned documents</string>
```

## State Management

### Local State (useState)
- Component-level state for UI interactions
- Loading states
- Form inputs

### Navigation State
- Managed by React Navigation
- Screen parameters for passing data
- Navigation history

### Persistent Storage
- Local filesystem via React Native FS
- No external database required

## Future Enhancements

### High Priority
1. Real network implementation (replace mock)
2. OCR for text extraction
3. PDF export functionality
4. Image enhancement filters

### Medium Priority
5. Cloud storage integration
6. Multi-page document support
7. Document annotations
8. Search functionality

### Low Priority
9. Batch scanning mode
10. QR code sharing
11. End-to-end encryption
12. Document templates

## Testing

### Current Tests
- App rendering test
- Mock configurations for native modules

### Test Coverage
- Unit tests: Jest
- Mocks: Camera, File System, Navigation

## Build & Run

### Development
```bash
npm install
npm run ios    # iOS simulator
npm run android # Android emulator
```

### Production
```bash
# Android
cd android && ./gradlew assembleRelease

# iOS
cd ios && xcodebuild -workspace DocCast.xcworkspace \
  -scheme DocCast -configuration Release
```

## Notes

- NetworkService is currently a mock implementation
- Real network features require native modules or libraries
- Camera permissions must be granted at runtime
- Documents stored locally, not in cloud
- Cross-platform compatible (iOS & Android)
