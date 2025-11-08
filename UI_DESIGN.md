# DocCast UI Screens

## Screen Flow and Layout

### 1. Home Screen
```
┌─────────────────────────────────┐
│          DocCast                │
│  Mobile Document Scanner &      │
│     Network Sharing             │
│                                 │
│  ┌─────────────────────────┐   │
│  │   📷 Scan Document      │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   📁 View Gallery       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   🌐 Network Devices    │   │
│  └─────────────────────────┘   │
│                                 │
│    Scan documents with your     │
│          camera                 │
│    Share across your network    │
└─────────────────────────────────┘
```

**Features:**
- Main navigation hub
- Three primary action buttons
- Clean, centered layout
- Footer with app description

---

### 2. Camera Screen
```
┌─────────────────────────────────┐
│                                 │
│     [LIVE CAMERA PREVIEW]       │
│                                 │
│           Document              │
│            Here                 │
│                                 │
│                                 │
│  ┌──────┐        ┌──────┐      │
│  │ Back │    ◉   │      │      │
│  └──────┘        └──────┘      │
│           Capture Button        │
└─────────────────────────────────┘
```

**Features:**
- Full-screen camera preview
- Large capture button (center)
- Back button (left)
- Real-time camera feed

---

### 3. Preview Screen
```
┌─────────────────────────────────┐
│                                 │
│    [CAPTURED DOCUMENT IMAGE]    │
│                                 │
│                                 │
│                                 │
│                                 │
│  ┌─────────┐     ┌─────────┐   │
│  │↻ Retake │     │ ✓ Save  │   │
│  └─────────┘     └─────────┘   │
└─────────────────────────────────┘
```

**Features:**
- Full-screen image preview
- Retake option (left)
- Save option (right)
- Image fits to screen

---

### 4. Gallery Screen
```
┌─────────────────────────────────┐
│  ← Back    Gallery (3)          │
├─────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐    │
│  │          │  │          │    │
│  │ Document │  │ Document │    │
│  │    1     │  │    2     │    │
│  │          │  │          │    │
│  │10/15/24  │  │10/15/24  │    │
│  │3:45 PM   │  │2:30 PM   │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  ┌──────────┐                   │
│  │          │                   │
│  │ Document │                   │
│  │    3     │              ┌──┐ │
│  │          │              │+│  │
│  │10/14/24  │              └──┘ │
│  │5:15 PM   │              FAB   │
│  └──────────┘                   │
└─────────────────────────────────┘
```

**Features:**
- Grid layout (2 columns)
- Document thumbnails
- Date/time stamps
- Floating action button (FAB) for quick scan
- Long-press to delete
- Shows document count in header

**Empty State:**
```
┌─────────────────────────────────┐
│  ← Back    Gallery (0)          │
├─────────────────────────────────┤
│                                 │
│                                 │
│     No documents yet            │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📷 Scan First Document  │   │
│  └─────────────────────────┘   │
│                                 │
│                                 │
└─────────────────────────────────┘
```

---

### 5. Network Screen
```
┌─────────────────────────────────┐
│  ← Back      Network            │
├─────────────────────────────────┤
│                                 │
│  Document Server                │
│  ┌─────────────────────────┐   │
│  │ Enable Server    [ON]   │   │
│  │ 192.168.1.100:8080      │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ✓ Your documents are    │   │
│  │   now accessible        │   │
│  │                         │   │
│  │ Other devices can       │   │
│  │ browse to:              │   │
│  │ http://192.168.1.100:   │   │
│  │ 8080                    │   │
│  └─────────────────────────┘   │
│                                 │
│  Network Devices    🔍 Scan     │
│  ┌─────────────────────────┐   │
│  │ 🖥️ Living Room Device   │   │
│  │ 192.168.1.101:8080   →  │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ 🖥️ Office Scanner       │   │
│  │ 192.168.1.102:8080   →  │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**
- Server toggle switch
- Port configuration
- Local IP display
- Device scan button
- List of discovered devices
- Connection indicator (→)

**Server Disabled State:**
```
┌─────────────────────────────────┐
│  ← Back      Network            │
├─────────────────────────────────┤
│                                 │
│  Document Server                │
│  ┌─────────────────────────┐   │
│  │ Enable Server   [OFF]   │   │
│  │ 192.168.1.100:8080      │   │
│  └─────────────────────────┘   │
│                                 │
│  Port: [8080        ]           │
│                                 │
│  Network Devices    🔍 Scan     │
│  ┌─────────────────────────┐   │
│  │    No devices found     │   │
│  │                         │   │
│  │ Tap 'Scan' to search    │   │
│  │ for DocCast devices on  │   │
│  │ your network            │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

## Color Scheme

### Primary Colors
- **Primary Blue**: #007AFF (buttons, accents)
- **Background**: #f5f5f5 (light gray)
- **White**: #FFFFFF (cards, buttons)
- **Black**: #000000 (camera background)

### Text Colors
- **Primary Text**: #333333 (dark gray)
- **Secondary Text**: #666666 (medium gray)
- **Tertiary Text**: #999999 (light gray)

### Status Colors
- **Success**: #34C759 (green)
- **Info**: #007AFF (blue)
- **Warning**: #FF9500 (orange)
- **Error**: #FF3B30 (red)

---

## Typography

### Font Sizes
- **Title**: 48px (Home title)
- **Heading**: 20px (Screen headers)
- **Body**: 16px (Regular text)
- **Caption**: 14px (Subtitles)
- **Small**: 12px (Timestamps)

### Font Weights
- **Bold**: 700 (Titles, buttons)
- **Semi-Bold**: 600 (Headers, labels)
- **Regular**: 400 (Body text)

---

## Interactive Elements

### Buttons

**Primary Button:**
- Background: #007AFF
- Text: White, bold
- Padding: 20px
- Border Radius: 15px
- Shadow: Subtle elevation

**Secondary Button:**
- Background: White
- Text: #007AFF, bold
- Border: 2px solid #007AFF
- Padding: 20px
- Border Radius: 15px

**Icon Button:**
- Background: rgba(0,0,0,0.5)
- Text: White
- Padding: 15px
- Border Radius: 10px

### Cards
- Background: White
- Border Radius: 10px
- Shadow: Subtle elevation
- Padding: 15px

### FAB (Floating Action Button)
- Size: 60x60px
- Background: #007AFF
- Icon: + (white)
- Position: Bottom-right
- Shadow: Prominent elevation

---

## Animations

### Transitions
- Screen transitions: Slide from right
- Modal transitions: Fade in
- Duration: 300ms

### Interactions
- Button press: Scale 0.95
- Card press: Opacity 0.7
- Long press: Haptic feedback

---

## Responsive Design

### Layout
- Portrait orientation optimized
- Safe area insets respected
- Keyboard-aware scrolling
- Dynamic font scaling support

### Grid
- Gallery: 2 columns on phone
- Padding: 10px between items
- Margin: 20px screen edges

---

## Accessibility

### Screen Reader Support
- All buttons have labels
- Images have descriptions
- Navigation announcements

### Touch Targets
- Minimum size: 44x44px
- Adequate spacing: 8px+
- Clear visual feedback

### Color Contrast
- WCAG AA compliant
- High contrast mode support
- Clear focus indicators
