# Fidha Fathima — Portfolio

A painter-themed React + Vite portfolio with a rich dark canvas aesthetic.

## 🎨 Theme
Dark moody palette — charcoal, deep crimson, warm gold. Custom cursor, paint splash animations, reveal-on-scroll effects, and a rotating badge.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Cursor.jsx / .css      — Custom animated cursor
│   ├── Nav.jsx / .css         — Sticky navigation
│   ├── Hero.jsx / .css        — Landing section
│   ├── About.jsx / .css       — About & tech palette
│   ├── Skills.jsx / .css      — Skills with progress bars
│   ├── Projects.jsx / .css    — Filterable project gallery
│   └── Contact.jsx / .css     — Contact form & footer
├── App.jsx
├── App.css
├── index.css                  — Global styles & CSS variables
└── main.jsx
```

## 🎨 Customizing Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --canvas: #1a1410;          /* Background */
  --pigment-gold: #c9993a;    /* Primary accent */
  --pigment-crimson: #8b2635; /* Secondary accent */
  --pigment-sage: #5a7a5c;    /* Tertiary accent */
  --ink: #f0e8d8;             /* Text */
}
```
