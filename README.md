# B360 Landing Page with GSAP Scroll Animations

This landing page features smooth scroll animations powered by GSAP (GreenSock Animation Platform) with the following features:

## Features

### 🎯 Smooth Scroll Animations
- **Scroll-triggered animations**: All animations are tied to scroll position for smooth, responsive effects
- **Book-like section loading**: Each section appears to overlay the previous one like turning pages in a book
- **Performance optimized**: Uses GSAP's ScrollTrigger for efficient, smooth animations

### 🌊 Parallax Effects
- **Element parallax**: Text, images, and content move at different speeds during scroll
- **Background parallax**: Slider and header images have enhanced parallax effects
- **Smooth transitions**: All parallax movements are smooth and natural

### 📱 Responsive Design
- **Mobile optimized**: Animations work smoothly on all device sizes
- **Touch-friendly**: Scroll animations respond to touch gestures on mobile devices
- **Performance conscious**: Optimized for smooth 60fps animations

## Technical Implementation

### GSAP Plugins Used
- **ScrollTrigger**: For scroll-based animations and parallax effects
- **ScrollToPlugin**: For smooth section navigation
- **Observer**: For touch and wheel event handling

### Animation Features
- **Scrub animations**: Animations are tied to scroll position (scrub: 1)
- **Z-index layering**: Proper stacking for book-like overlay effect
- **Transform optimizations**: Hardware-accelerated animations using CSS transforms

### CSS Enhancements
- **Smooth scrolling**: CSS scroll-behavior for enhanced user experience
- **Performance optimizations**: will-change and backface-visibility properties
- **3D transforms**: preserve-3d for enhanced visual depth

## Usage

### Adding Parallax to Elements
To add parallax effects to any element, simply add the `parallax` class:

```html
<div class="parallax">
    <img src="image.jpg" alt="Parallax image">
</div>
```

### Section Structure
Each section should have the `fullscreen-section` class for proper animation handling:

```html
<section class="fullscreen-section">
    <!-- Content with parallax elements -->
</section>
```

### Customizing Animation Speeds
Animation speeds can be adjusted in the `createParallaxEffects` function in `js/main.js`:

```javascript
const speed = 0.5 + (elementIndex * 0.1); // Adjust base speed and increment
```

## Browser Support

- **Modern browsers**: Full support for all animation features
- **Mobile browsers**: Optimized for touch scrolling and mobile performance
- **Fallbacks**: Graceful degradation if GSAP fails to load

## Performance Tips

1. **Limit parallax elements**: Too many parallax elements can impact performance
2. **Optimize images**: Use appropriately sized images for smooth parallax effects
3. **Monitor scroll events**: The animations are optimized to minimize scroll event overhead

## Troubleshooting

### Animations Not Working
1. Check browser console for GSAP loading errors
2. Ensure ScrollTrigger plugin is loaded
3. Verify that elements have proper CSS classes

### Performance Issues
1. Reduce number of parallax elements
2. Check for large images that may cause lag
3. Ensure CSS transforms are hardware-accelerated

## Dependencies

- GSAP 3.12.5+
- ScrollTrigger plugin
- ScrollToPlugin plugin
- Observer plugin

All dependencies are loaded via CDN for optimal performance.
