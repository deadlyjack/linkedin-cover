# LinkedIn Cover Editor - Features

## Overview
A full-fledged LinkedIn banner/cover image editor with support for both Personal Profile and Company Page sizes.

## Canvas Sizes

### Personal Profile
- **Dimensions:** 1584 × 396 pixels
- **Aspect Ratio:** 4:1
- **Safe Zones:**
  - Mobile Avatar: 542×264px from bottom-left
  - Desktop Avatar: 320×224px from bottom-left

### Company Page
- **Dimensions:** 1128 × 191 pixels
- **Aspect Ratio:** ~6:1
- **Safe Zones:**
  - Mobile Avatar: 387×264px from bottom-left
  - Desktop Avatar: 228×224px from bottom-left

## Core Features

### 1. Canvas Settings
- **Size Selection:** Switch between Personal Profile and Company Page formats
- **Safe Zone Overlay:** Visual guides showing where profile avatars will cover content
- **Safe Zone Views:** Toggle between Mobile, Desktop, or Both overlays
- **Dynamic Scaling:** All content automatically scales to fit selected canvas size

### 2. Text & Branding
- **Main Title:** Large, customizable headline text
- **Subtitle:** Secondary text for additional context
- **Badge:** Optional badge/label with custom text
- **Dynamic Font Sizing:** Automatically adjusts font sizes for different canvas sizes
  - Personal Profile: 52px title
  - Company Page: 28px title

### 3. Social Links
- **Supported Platforms:**
  - GitHub
  - Twitter/X
  - LinkedIn
  - Website
- **Visual Icons:** Platform-specific icons with custom styling
- **Dynamic Layout:** Icons scale and position based on canvas size

### 4. Featured Apps
- **App Cards:** Display up to 3 app screenshots
- **Customization:**
  - App screenshot upload
  - App logo upload
  - App name
  - Download count/stats
- **Smart Positioning:** Cards automatically adjust based on canvas dimensions

### 5. Color Scheme System
- **Theme Presets:**
  - Cyber Blue (default)
  - Purple Dream
  - Mint Fresh
  - Sunset Glow
  - Ocean Deep
  - Forest Green
  - Rose Pink
  - Dark Slate
- **Custom Colors:** Manual color picker for all color values
- **Color Properties:**
  - Primary gradient start
  - Primary gradient end
  - Accent color
  - Text color

### 6. Watermark Patterns
- **Styles:**
  - Code Doodles: Programming symbols and brackets
  - Geometric Shapes: Abstract geometric patterns
  - Dot Grid: Subtle dotted background
  - Gradient Blobs: Organic blob shapes
- **Controls:**
  - Density: Adjust pattern complexity
  - Opacity: Control pattern visibility
- **Dynamic Adaptation:** Patterns scale to canvas dimensions

### 7. Export Options
- **Formats:**
  - PNG (lossless)
  - JPEG (with quality control)
- **Scaling:**
  - 1x: Original size
  - 2x: Retina/high-DPI displays
- **Quality Control:** JPEG quality slider (70%-100%)
- **Copy to Clipboard:** Direct copy for quick sharing
- **Clean Export:** Safe zone overlays excluded from exported images

### 8. State Management
- **Auto-Save:** Changes automatically saved to browser localStorage (500ms debounce)
- **Persistence:** Settings persist across browser sessions
- **Reset to Defaults:** Quick reset button to restore original settings
- **Real-time Preview:** Instant updates as you edit

## Technical Architecture

### Modular Structure
- **19 JavaScript modules** organized by functionality
- **3 CSS files** for separated styling concerns
- **ES6 modules** - no build tools required
- **Canvas API** for rendering

### File Organization
```
├── css/
│   ├── main.css         # Layout and canvas container
│   ├── editor.css       # Editor panel styles
│   └── components.css   # Buttons, cards, toast notifications
├── js/
│   ├── canvas/
│   │   ├── renderer.js      # Main rendering orchestrator
│   │   ├── background.js    # Gradient backgrounds
│   │   ├── text.js          # Text and badges
│   │   ├── social.js        # Social media icons
│   │   ├── cards.js         # App screenshot cards
│   │   ├── watermarks.js    # Background patterns
│   │   └── safeZone.js      # Safe zone overlays
│   ├── state/
│   │   ├── store.js         # Reactive state management
│   │   ├── defaults.js      # Default values and presets
│   │   └── persistence.js   # localStorage integration
│   ├── editor/
│   │   ├── panel.js         # Editor sidebar
│   │   ├── formFields.js    # Form input handling
│   │   ├── colorPicker.js   # Color theme picker
│   │   └── imageUpload.js   # Image upload handling
│   ├── utils/
│   │   ├── export.js        # Export utilities
│   │   ├── imageLoader.js   # Image caching
│   │   └── shapes.js        # Shape drawing helpers
│   ├── config.js            # Configuration constants
│   └── main.js              # Application entry point
└── index.html               # Main HTML shell
```

### Key Technical Features
- **Reactive State:** Observer pattern with automatic UI updates
- **Image Caching:** Map-based cache for screenshots and logos
- **Debounced Auto-Save:** Prevents excessive localStorage writes
- **Dynamic Layout System:** All positioning calculated from canvas config
- **Focus Management:** Optimized DOM updates prevent input focus loss
- **Safe Zone Rendering:** Conditional overlay system for preview/export

## Safe Zone Guidelines

### What are Safe Zones?
Safe zones indicate areas where the LinkedIn profile avatar will cover content on mobile and desktop views. Content in these areas should be decorative only, as it will be hidden by the profile picture.

### Best Practices
- **Avoid** placing important text in safe zones
- **Avoid** placing logos or branding in safe zones
- **Use** safe zones for decorative elements only
- **Test** with both Mobile and Desktop views
- **Toggle** safe zone overlay on/off to see the difference

### Safe Zone Overlay Colors
- **Red:** Mobile avatar overlay (larger area)
- **Orange:** Desktop avatar overlay (smaller area)

## Usage Tips

1. **Start with Canvas Size:** Select Personal Profile or Company Page first
2. **Enable Safe Zones:** Turn on the safe zone overlay to see danger areas
3. **Add Content:** Fill in text, social links, and app cards
4. **Choose Theme:** Select a color preset or customize colors
5. **Add Watermark:** Choose a pattern style and adjust density/opacity
6. **Preview:** Check both Mobile and Desktop safe zone views
7. **Export:** Download as PNG or JPEG, or copy to clipboard

## Browser Compatibility
- Modern browsers with ES6 module support
- Canvas API support required
- Clipboard API for copy functionality
- FileReader API for image uploads
- localStorage for state persistence

## Development

### Running Locally
```bash
# Navigate to project directory
cd linkedin-cover

# Start local server (Python 3)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

### No Build Required
This project uses vanilla JavaScript with ES6 modules. No bundler, compiler, or build step is needed. Just serve the files with any static file server.
