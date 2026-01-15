# LinkedIn Cover Editor

A full-fledged web application for creating custom LinkedIn banner/cover images with real-time editing, multiple themes, watermark options, and advanced export features.

## Features

### 🎨 Real-Time Editor
- **Text Content**: Edit title, subtitle, tagline, and experience badge
- **Social Links**: Add, remove, and customize social media links with custom icons
- **App Cards**: Upload and showcase up to 4 app screenshots with logos
- **Live Preview**: See changes instantly on the canvas

### 🌈 Theme Customization
- **5 Preset Themes**: Dark, Light, Ocean, Sunset, Forest
- **Custom Colors**: Full control over background gradients, text colors, and accents
- **Color Picker**: Easy-to-use color selection for all elements

### 🎭 Watermark Options
- **Multiple Styles**:
  - Code Symbols (default)
  - Geometric Shapes
  - Dot Grid
  - Gradient Blobs
  - None (clean background)
- **Customizable**: Adjust density and opacity

### 💾 Export & Persistence
- **Export Formats**: PNG, JPEG with quality control
- **Scaling**: 1x (1584×396) or 2x (3168×792) for retina displays
- **Clipboard**: One-click copy to clipboard
- **Auto-Save**: Automatically saves your work to localStorage
- **Reset**: Reset to default settings with confirmation

## Project Structure

```
linkedin-cover/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Base styles and layout
│   ├── editor.css         # Editor panel styles
│   └── components.css     # Reusable component styles
├── js/
│   ├── main.js            # Application entry point
│   ├── config.js          # Configuration constants
│   ├── canvas/
│   │   ├── renderer.js    # Main canvas rendering orchestrator
│   │   ├── background.js  # Background gradients
│   │   ├── watermarks.js  # Watermark patterns
│   │   ├── cards.js       # App card rendering
│   │   ├── text.js        # Text rendering
│   │   └── social.js      # Social links rendering
│   ├── editor/
│   │   ├── panel.js       # Main editor panel with sections
│   │   ├── colorPicker.js # Theme and color selection
│   │   ├── imageUpload.js # Image upload and app cards manager
│   │   └── formFields.js  # Reusable form components
│   ├── state/
│   │   ├── store.js       # Reactive state management
│   │   ├── defaults.js    # Default values and theme presets
│   │   └── persistence.js # localStorage integration
│   └── utils/
│       ├── imageLoader.js # Image loading utilities
│       ├── shapes.js      # Shape drawing helpers
│       └── export.js      # Canvas export utilities
└── assets/                # App screenshots and logos

## Getting Started

### Prerequisites
- Modern web browser with ES6 module support
- Local web server (for development)

### Running Locally

1. **Clone or download** the repository

2. **Start a local server** (required for ES6 modules):
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8080
   ```

3. **Open in browser**: Navigate to `http://localhost:8080`

### First Time Use

1. The app loads with default settings and sample content
2. Use the editor panel on the left to customize:
   - **Text Content**: Update title, subtitle, and other text fields
   - **Social Links**: Add or edit your social media links
   - **App Cards**: Upload screenshots of your apps/projects
   - **Colors & Theme**: Choose a preset or create custom colors
   - **Watermarks**: Select a style and adjust density/opacity

3. Your changes are automatically saved to browser localStorage

## Usage Guide

### Editing Text
- Open the "Text Content" section in the editor
- Type in any field to see live updates on the canvas
- All text fields support Unicode characters

### Adding Social Links
1. Open "Social Links" section
2. Click "+ Add Social Link"
3. Enter icon URL (use [Simple Icons CDN](https://simpleicons.org/))
4. Enter display text
5. Remove unwanted links with "Remove" button

### Managing App Cards
1. Open "App Cards" section
2. Click "+ Add App Card" (max 4 cards)
3. Upload screenshot image
4. Optionally upload a logo
5. Enter app name
6. Remove cards with "Remove App" button

### Changing Theme
1. Open "Colors & Theme" section
2. Click a preset theme button, or
3. Use custom color pickers for full control

### Adjusting Watermarks
1. Open "Watermarks" section
2. Select style from dropdown
3. Adjust density (5-30 elements)
4. Adjust opacity (0.02-0.15)

### Exporting
1. Choose export scale (1x or 2x)
2. Adjust JPEG quality if needed (70-100%)
3. Click desired export button:
   - **Download PNG**: Lossless format
   - **Download JPEG**: Smaller file size
   - **Copy to Clipboard**: Quick sharing

### Resetting
- Click "Reset to Defaults" to restore original settings
- Confirmation dialog prevents accidental resets
- All localStorage data is cleared

## Technical Details

### Architecture
- **No build tools**: Pure ES6 modules, no bundler required
- **Reactive state**: Centralized state management with observer pattern
- **Modular design**: Separated concerns for maintainability
- **Canvas API**: High-performance rendering with HTML5 Canvas

### Browser Compatibility
- Chrome/Edge 89+
- Firefox 88+
- Safari 14.1+
- Requires ES6 module support

### Performance
- Debounced localStorage writes (500ms)
- Image caching for repeated renders
- Efficient canvas rendering with minimal redraws

### localStorage
State is automatically persisted to `localStorage` under key:
```
linkedin-cover-state
```

## Customization

### Adding New Themes
Edit [js/state/defaults.js](js/state/defaults.js) and add to `THEMES`:
```javascript
myTheme: {
  name: 'My Theme',
  bgStart: '#000000',
  bgEnd: '#111111',
  primaryText: '#ffffff',
  secondaryText: '#cccccc',
  accent: '#ff0000',
}
```

### Creating Watermark Patterns
Add new pattern function in [js/canvas/watermarks.js](js/canvas/watermarks.js):
```javascript
function drawMyPattern(ctx, density, opacity, theme) {
  // Your custom pattern code
}
```

### Modifying Canvas Layout
Edit rendering logic in respective canvas modules:
- Background: [js/canvas/background.js](js/canvas/background.js)
- Text positioning: [js/canvas/text.js](js/canvas/text.js)
- Card layout: [js/canvas/cards.js](js/canvas/cards.js)

## Troubleshooting

### Canvas is blank
- Check browser console for errors
- Ensure local server is running (required for ES6 modules)
- Check that image files exist in correct paths

### Images not loading
- Check CORS settings for external images
- Verify image file paths are correct
- Use data URLs for uploaded images (handled automatically)

### State not persisting
- Check if localStorage is enabled in browser
- Look for quota exceeded errors (unlikely with this app)
- Clear localStorage and refresh if corrupted

### Export not working
- Ensure canvas has rendered before exporting
- Check browser permissions for clipboard access
- Try different export format if one fails

## License

This project is open source and available for personal and commercial use.

## Credits

- Icons: [Simple Icons](https://simpleicons.org/)
- Font: [Inter](https://fonts.google.com/specimen/Inter)

---

**LinkedIn Cover Editor** - Built with ❤️ using vanilla JavaScript and Canvas API Generator

A simple HTML canvas-based tool to create a custom LinkedIn cover image.

## Features

- Canvas rendering at LinkedIn's recommended size (1584 x 396 pixels)
- Download as PNG or JPEG
- App screenshots with logos
- Social media links with icons
- Floating code doodles in background

## Usage

1. Open `index.html` in a browser
2. Click "Download PNG" or "Download JPEG" to save the image
3. Upload to LinkedIn as your cover photo

## Customization

Edit the `index.html` file to change:
- Title and subtitle text
- App screenshots and logos
- Social media usernames
- Background colors and gradients

## Assets

Place your images in the same folder:
- `acode.jpg` - App screenshot
- `better-keep.jpg` - App screenshot
- `acode-logo.png` - App logo
- `betterkeep-logo.png` - App logo
