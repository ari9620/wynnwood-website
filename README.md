# WYNNWOOD 蔚木 — Brand Website

A handcrafted brand website for WYNNWOOD aromatherapy candles, built as a static site deployable for free.

## 🚀 Free Deployment Options

### Option 1: GitHub Pages (Recommended — Easiest)

```bash
# 1. Create a GitHub repository
# 2. Push this folder to the repo
cd /Users/qingshan./Desktop/wynnwood-website
git init
git add .
git commit -m "Initial WYNNWOOD website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wynnwood-website.git
git push -u origin main

# 3. Go to repo Settings → Pages → Source: "Deploy from a branch" → main → Save
# 4. Site live at: https://YOUR_USERNAME.github.io/wynnwood-website/
```

### Option 2: Vercel (Free tier, auto-deploy)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Import your GitHub repo → Deploy
3. Custom domain supported (free SSL)

### Option 3: Netlify (Free tier, drag & drop)

1. Go to [netlify.com](https://netlify.com) → Sign up
2. Drag the `wynnwood-website` folder onto the Netlify dashboard
3. Custom domain supported (free SSL)

### Option 4: Cloudflare Pages (Free, unlimited bandwidth)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo → Deploy

## 📁 Structure

```
wynnwood-website/
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # Styles
├── js/
│   └── main.js         # Interactions
├── images/             # Product photos (23 images)
└── README.md
```

## 🎨 Sections

- **Hero** — Full-screen brand intro
- **Story** — WYNN + WOOD = 蔚木
- **Scents** — McIntosh / Raspberry / Lemon Eucalyptus
- **Gallery** — Product photography
- **Craft** — Quality pillars
- **Principles** — Lines we won't cross
- **Contact** — Taobao / Xiaohongshu / Email
- **Footer** — Links & copyright

## 🔧 Customization

- Edit colors in `css/style.css` → `:root` variables
- Update product images in `images/` folder
- Change contact info in `index.html` → `#contact` section
- Add your Taobao/Xiaohongshu links in footer & contact sections

## 📱 Responsive

- Desktop: full layout
- Tablet (≤1024px): stacked layouts
- Mobile (≤768px): single column, hamburger menu
- All images lazy-loaded, optimized for performance
