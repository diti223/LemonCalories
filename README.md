# Lemon Macros Landing Page

Transform any recipe into detailed nutrition data with AI-powered analysis. From messy ingredient lists to precise macro breakdowns in seconds.

## ✨ Features

- **🤖 AI-Powered Analysis**: Understands natural language recipes and estimates portions
- **📊 Detailed Nutrition**: Calories, macros, micronutrients, and dietary insights
- **📧 Email Capture**: Functional signup system with ConvertKit integration
- **🎨 Modern UI**: Beautiful, responsive design with dark mode support
- **⚡ Fast Performance**: Optimized Astro build with 95+ Lighthouse score
- **📱 Mobile-First**: Perfect experience on all devices

## 🚀 Live Demo

Visit: [macros.lemonnutrition.eu](https://macros.lemonnutrition.eu)

## 🛠️ Tech Stack

- **Framework**: Astro 5.1.1 with TypeScript
- **Styling**: TailwindCSS with custom lemon theme
- **Email Service**: ConvertKit API integration
- **Analytics**: Google Analytics 4
- **Deployment**: GitHub Pages (or Vercel/Netlify)

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/diti223/LemonCalories.git
   cd LemonCalories
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## ⚙️ Configuration

### Email Service Setup (ConvertKit)

1. Create a [ConvertKit](https://convertkit.com) account
2. Create a new form and get your Form ID
3. Get your API key from Account Settings
4. Add to `.env`:
   ```
   CONVERTKIT_API_KEY=your_api_key_here
   CONVERTKIT_FORM_ID=your_form_id_here
   ```

### Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (GA_MEASUREMENT_ID)
3. Add to `.env`:
   ```
   GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
   ```

### Alternative Email Services

The API endpoint supports multiple email services. To use alternatives:

- **Mailchimp**: Set `MAILCHIMP_API_KEY`
- **Resend**: Set `RESEND_API_KEY`
- **Custom**: Modify `/src/pages/api/subscribe.ts`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EmailForm.astro  # Functional email capture
│   ├── RecipeDemo.astro # Before/after demo section
│   ├── Testimonials.astro # Social proof
│   ├── FAQ.astro        # Frequently asked questions
│   └── ...
├── layouts/
│   └── Layout.astro     # Base layout with SEO/analytics
├── pages/
│   ├── index.astro      # Main landing page
│   └── api/
│       └── subscribe.ts # Email subscription endpoint
└── styles/              # Global styles
```

## 🎯 Performance Features

- **Optimized Images**: WebP format with lazy loading
- **Critical CSS**: Inlined for faster paint times
- **Font Optimization**: Preloaded Inter font family
- **Build Optimization**: CSS minification and compression
- **Analytics**: Conversion tracking and user behavior

## 📊 Success Metrics

Current targets:
- Email conversion rate: 3-5%
- Page load speed: < 2 seconds
- Lighthouse Performance: 95+
- Mobile usability: 100%

## 🚀 Deployment

### GitHub Pages

1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Set custom domain: `macros.lemonnutrition.eu`
4. Configure CNAME record in DNS

### Alternative Deployments

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📧 Email Marketing Strategy

### Welcome Sequence
1. **Immediate**: Welcome + subscription confirmation
2. **Day 1**: Recipe analysis tips and best practices
3. **Day 3**: Early access timeline and expectations
4. **Week 1**: Behind-the-scenes: How the AI works
5. **Week 2**: Recipe transformation examples

### Lead Magnets
- "50 Healthy Recipe Macro Breakdowns" (PDF)
- "Ultimate Guide to Recipe Nutrition" (Email course)
- "Keto Recipe Conversions Cheat Sheet" (Download)

## 🧪 Testing

```bash
# Run type checking
npm run check

# Test email functionality (development)
curl -X POST http://localhost:4321/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"test"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Documentation**: Check this README and inline comments
- **Issues**: Open a GitHub issue for bugs/features
- **Email**: Contact support through the website form

---

Built with 💛 by the Lemon Nutrition team