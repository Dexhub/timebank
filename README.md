# TimeBank Kids - Static Website

A modern, responsive website for TimeBank Kids - the screen time banking app that helps families create healthy digital habits.

## 🚀 Quick Start

### Local Development

1. Clone this repository
2. Open `index.html` in your browser, or
3. Run a local server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve
   ```
4. Visit http://localhost:8000

### GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/" (root) folder
5. Save and wait for deployment
6. Your site will be available at: `https://[your-username].github.io/[repository-name]/`

## 📁 Structure

```
├── index.html          # Homepage
├── about.html          # About Us page
├── how-it-works.html   # Product explanation
├── pricing.html        # Pricing plans
├── blog.html           # Blog listing
├── contact.html        # Contact form
├── privacy.html        # Privacy policy
├── security.html       # Security information
├── terms.html          # Terms of service
├── help.html           # Help center
├── careers.html        # Career opportunities
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
└── images/             # Image assets (placeholder)
```

## 🎨 Features

- **Fully Static**: No backend required, perfect for GitHub Pages
- **Responsive Design**: Works on all devices
- **Modern UI**: Glassmorphism effects, gradient animations
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized CSS and minimal JavaScript
- **SEO Ready**: Meta tags and semantic HTML

## 🛠️ Customization

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-blue: #5B5FDE;
    --growth-green: #00D9A5;
    --achievement-gold: #FFB800;
}
```

### Content
All content is in HTML files. Simply edit the text and save.

### Forms
Forms are frontend-only. To make them functional:
1. Add a form service like Formspree or Netlify Forms
2. Update the form `action` attributes
3. Or integrate with your preferred backend

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This is a demo/template website. Customize as needed for your use case.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ for families everywhere