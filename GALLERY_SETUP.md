# Personal Gallery Setup Guide

## Image Gallery Added to Your Portfolio!

I've added a professional image gallery to your About section that showcases different aspects of yourself. Here's what was implemented:

### 📸 Gallery Features

- **3 image slots** with hover effects
- **Responsive design** (stacks on mobile)
- **Smooth animations** with overlay captions
- **Lazy loading** for performance
- **Accessibility** with proper alt text

### 🖼️ Current Placeholder Images

The gallery currently uses these placeholder image names:

1. `williams-professional.jpg` - Professional headshot
2. `williams-workspace.jpg` - You at your workspace/coding
3. `williams-casual.jpg` - Casual professional setting

### 🔄 How to Replace with Your Images

1. **Prepare your images:**
   - Save as JPG format for best quality/size balance
   - Recommended size: 400x400px minimum
   - Keep file sizes under 200KB each
   - Professional, high-quality photos only

2. **Replace the image sources in `index.html`:**

   ```html
   <!-- Change these lines in your About section -->
   <img
     src="williams-professional.jpg"
     alt="Williams Ihechi - Professional headshot"
     loading="lazy"
   />
   <img
     src="williams-workspace.jpg"
     alt="Williams Ihechi - At work in coding environment"
     loading="lazy"
   />
   <img
     src="williams-casual.jpg"
     alt="Williams Ihechi - Casual professional setting"
     loading="lazy"
   />
   ```

3. **Update alt text** to accurately describe each image

### 💡 Image Ideas

- **Professional**: Suit, business casual, or formal headshot
- **Workspace**: You coding, at your desk, with your setup
- **Casual**: Smart casual, showing personality but still professional

### 📱 Responsive Behavior

- **Desktop**: 3 images in a row
- **Tablet**: 2 images in a row
- **Mobile**: 1 image per row (stacked)

The gallery will automatically adapt to different screen sizes and includes smooth hover animations that reveal captions.

### 🎨 Customization

You can modify the captions ("Professional", "Workspace", "Casual") in the HTML to better match your images, or add more gallery items if needed.

Ready to add your photos? Just replace the image files and update the `src` attributes!
