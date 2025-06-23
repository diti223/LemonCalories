# Lemon Calories Landing Page

A focused landing page for `calories.lemonnutrition.eu` - AI-powered recipe nutrition analysis tool.

## 🚀 Tech Stack

- **Framework**: Astro 5.x (Static Site Generation)
- **Styling**: TailwindCSS 4.x with Lemon brand colors
- **Deployment**: GitHub Actions → GitHub Pages  
- **Domain**: calories.lemonnutrition.eu

## 📁 Project Structure

```
├── .github/workflows/deploy.yml    # Automated deployment
├── public/
│   ├── CNAME                      # Custom domain config
│   ├── favicon.svg                # Site icon
│   └── robots.txt                 # SEO configuration
├── src/
│   ├── components/                # @/components/*
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── HowItWorks.astro
│   │   ├── CallToAction.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro           # @/layouts/Layout
│   └── pages/
│       └── index.astro            # Homepage
├── astro.config.mjs               # Path aliases + deployment
├── tailwind.config.mjs            # Brand design system
└── package.json                   # Dependencies
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Brand Colors

- **Primary**: `lemon-400` (#F7C720)
- **Secondary**: `lemon-500` (#E6B200) 
- **Backgrounds**: `lemon-50` to `lemon-100`
- **Text**: `gray-900` (#111827)

## 📊 Performance Targets

- **Lighthouse Score**: 90+ on all metrics
- **Page Load**: < 3 seconds on mobile
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1

## 🚀 Deployment

Automatically deploys to `calories.lemonnutrition.eu` via GitHub Actions on push to `main` branch.

## 📝 Content Strategy

**Value Proposition**: "From recipe to macros in seconds"  
**Target Audience**: Home cooks, meal planners, and nutrition-conscious individuals  
**Call-to-Action**: "Join Early Access" / "Get Notified"

**Core Features**: Recipe parsing, macro calculation, dietary adaptations

---

Built with ❤️ for smarter nutrition tracking