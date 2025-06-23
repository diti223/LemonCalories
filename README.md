# Lemon Macros Landing Page

A focused landing page for `macros.lemonnutrition.eu` - AI-powered recipe nutrition analysis tool.

## 🎯 **Overview**

Simple, elegant landing page showcasing Lemon Macros - paste any recipe and instantly get macronutrients and calorie content with AI-powered analysis.

### **Features**
- **Domain**: macros.lemonnutrition.eu
- **Tech Stack**: Astro + Tailwind CSS
- **Deployment**: GitHub Pages with custom domain
- **Performance**: Optimized static site generation
- **Design**: Clean, conversion-focused UI

## 📁 **Project Structure**

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

## 🚀 **Development**

### **Prerequisites**
- Node.js 23+
- npm 10+

### **Setup**
```bash
npm install
npm run dev
```

### **Build**
```bash
npm run build
npm run preview
```

## 📦 **Deployment**

Automatically deploys to `macros.lemonnutrition.eu` via GitHub Actions on push to `main` branch.

### **Manual Deploy**
```bash
npm run build
# Upload dist/ to hosting provider
```

## 🎨 **Design System**

- **Primary Colors**: Lemon brand palette
- **Typography**: Clean, readable fonts
- **Layout**: Mobile-first responsive design
- **Components**: Reusable Astro components

## 📄 **License**

MIT License - see LICENSE file for details.

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

Automatically deploys to `macros.lemonnutrition.eu` via GitHub Actions on push to `main` branch.

## 📝 Content Strategy

**Value Proposition**: "From recipe to macros in seconds"  
**Target Audience**: Home cooks, meal planners, and nutrition-conscious individuals  
**Call-to-Action**: "Join Early Access" / "Get Notified"

**Core Features**: Recipe parsing, macro calculation, dietary adaptations

---

Built with ❤️ for smarter nutrition tracking