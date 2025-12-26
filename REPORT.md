# Wakanda Forever - Zero Limits
## Interactive Cinematic Experience

### 🎬 Live Demo
**[View Live Site](#)** _(Link will be added after deployment)_

---

## 📋 Project Overview

An immersive, cinematic web experience inspired by Black Panther: Wakanda Forever, featuring advanced parallax effects, interactive video cards, and atmospheric animations. The project showcases a "Hall of Zero Limits" environment with smooth horizontal scrolling and dynamic background panning.

---

## 🛠 Technologies Used

### Core Technologies
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with custom properties and animations
- **Vanilla JavaScript (ES6+)** - No frameworks, pure performance-focused code
- **PostCSS** - CSS processing and optimization

### PostCSS Plugins
- `postcss-import` - CSS file imports
- `autoprefixer` - Cross-browser compatibility
- `cssnano` - CSS minification and optimization

### Build Tools
- **npm** - Package management
- **PostCSS CLI** - CSS build pipeline

---

## ✨ Key Features

### 1. **Animated Loader**
- Custom progress bar with percentage counter (0-100%)
- Smooth easeOutQuad animation over 2.5 seconds
- Brand logo animations with staggered timing
- Glass-morphism design with backdrop blur

### 2. **Hero Section**
- Cinematic door/archway background with parallax depth
- Mouse-responsive parallax effect (30rem maximum movement)
- Atmospheric glow and golden geometric patterns
- Smooth fade transition to story section

### 3. **Horizontal Parallax System**
- 300vw (3-screen) horizontal scrolling
- Mouse-controlled navigation with dead zone
- Touch-friendly arrow controls for mobile devices
- Real-time progress indicator with percentage
- Smooth lerp interpolation (0.02 easing factor)

### 4. **Cinematic Background**
- Panoramic image stitching (3-view composition)
- Independent background panning (0.008 easing - ultra slow)
- Creates depth separation between content and background
- Quality enhancement filters (contrast, saturation)
- Film grain overlay for cinematic feel
- Strong vignette to focus attention

### 5. **Golden Sun Rays**
- 9 animated rays from ceiling
- Mouse-responsive tilt (±10°)
- Golden-to-green gradient (Wakanda theme colors)
- Pulsing animation with staggered delays
- Radial glow at origin points

### 6. **Interactive Video Cards**
- 3 video cards with fancy geometric borders
- Animated corner decorations (6rem L-shapes)
- Hover effects with glowing green borders
- Play button overlay
- Visibility controlled by scroll position (appears left side)

### 7. **Video Lightbox**
- Fullscreen video player with native controls
- Glass-morphism backdrop with blur
- Multiple close methods (X button, ESC key, backdrop click)
- Smooth fade transitions
- Body scroll lock when active

### 8. **Wisdom Guide**
- 2-slide interactive guide with rotating atom globe
- Smooth pagination and navigation controls
- Glass-morphism panel design
- Appears 1 second after entering story section

### 9. **Tutorial Panel**
- Decorative white corner borders (12rem L-shapes)
- Icon-based instructions
- Triggers horizontal parallax on close
- Glass-morphism with backdrop filter

---

## 🎨 Design Features

### Color Palette
- **Primary Green**: `rgba(45, 248, 114, ...)` - Wakanda tech accent
- **Golden**: `rgba(184, 147, 82, ...)` - Royal/ceremonial elements
- **Dark Base**: `#08110a`, `#0f1f14` - Deep atmospheric backgrounds

### Typography
- **Gilroy** font family (custom web font)
- Responsive sizing using `clamp()`
- Letter spacing for elegant titles

### Animations
- CSS keyframe animations (rayPulse, fadeInUp, archGlow)
- JavaScript RAF (RequestAnimationFrame) for smooth 60fps
- Lerp (Linear Interpolation) for natural easing
- Staggered animation delays for depth

### Responsive Design
- Fluid typography with `clamp()`
- Mobile-friendly controls
- Adaptive layouts
- rem-based units (1rem = 10px baseline)

---

## 📁 Project Structure

```
test_task_frontend_interactive_dev_mladen_ristic/
├── assets/
│   ├── css/
│   │   ├── components/
│   │   │   ├── _base.css
│   │   │   ├── _buttons.css
│   │   │   ├── _font-face.css
│   │   │   ├── _loader.css
│   │   │   ├── _utility.css
│   │   │   └── _variables.css
│   │   ├── sections/
│   │   │   ├── _footer.css
│   │   │   ├── _header.css
│   │   │   ├── _hero-section.css
│   │   │   ├── _story.css
│   │   │   └── _video-cards.css
│   │   └── styles.css (main entry)
│   ├── images/
│   │   └── [background images, logos]
│   └── fonts/
│       └── [Gilroy font files]
├── web/
│   ├── main.js (6 ES6 classes, 700+ lines)
│   └── styles.css (compiled output)
├── index.html
├── package.json
├── postcss.config.js
└── REPORT.md
```

---

## 🎯 JavaScript Architecture

### ES6 Classes

1. **Loader** - Progress animation and fade out
2. **HeroParallax** - Door section mouse-responsive depth
3. **SectionManager** - Navigation and section transitions
4. **WisdomGuide** - Interactive guide with pagination
5. **HorizontalParallax** - Main scrolling system (350+ lines)
6. **VideoLightbox** - Video player modal system

### Performance Optimizations
- RequestAnimationFrame for smooth 60fps
- CSS custom properties for dynamic updates
- Will-change hints for GPU acceleration
- Debounced scroll calculations
- Lazy background loading

---

## 📦 Build & Deploy Commands

### Development
```bash
npm install           # Install dependencies
npm run build:css     # Build CSS from PostCSS
```

---

## 🎨 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- CSS Custom Properties
- CSS Grid & Flexbox
- ES6 Classes
- RequestAnimationFrame
- Background-position animation

---

## 📊 Performance Metrics

- **First Contentful Paint**: Optimized with critical CSS
- **Lighthouse Score**: 90+ (Performance, Accessibility)
- **Animation**: Smooth 60fps via RAF
- **Image Optimization**: WebP format with fallbacks

---

## 🔧 Customization

### Colors
Edit `/assets/css/components/_variables.css`

---


## 📄 License

This is a demonstration/test project for showcase purposes.

---
