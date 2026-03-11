# Papichaya Yok — Developer Portfolio

A modern, dark-themed portfolio landing page built with **React.js** + **Vite**.

## 🎨 Design
- Dark theme with lime green (#ADFF2F) accents — inspired by crypto/fintech aesthetic
- Mouse glow cursor effect
- Scroll-triggered animations with IntersectionObserver
- Animated skill progress bars
- Expandable experience cards
- Animated stat counters
- Responsive layout

## 📁 Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # App entry point
    ├── App.jsx           # All components (single-file architecture)
    └── data/
        └── portfolio.js  # All content data
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Build for Production

```bash
npm run build
npm run preview
```

## 📦 Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

## ✨ Sections
1. **Hero** — Intro, stats card, CTA buttons
2. **Skills** — Filterable skill cards with animated bars
3. **Experience** — Expandable timeline cards
4. **Projects** — Featured healthcare demo + GitHub CTA
5. **Contact** — Click-to-copy contact details
