# WYNNWOOD 蔚木 — 网站修改指南

## 📁 文件结构

```
wynnwood-website/
├── index.html          ← 主页面（结构+内容）
├── css/
│   └── style.css       ← 所有样式（颜色/字体/布局）
├── js/
│   ├── i18n.js         ← 三语翻译文本（中文/EN/ไทย）
│   └── main.js         ← 交互逻辑（语言切换/下单/支付/动画）
├── images/             ← 所有图片素材
└── README.md
```

---

## ✏️ 常见修改场景

### 1. 修改文字内容

**打开 `js/i18n.js`**，找到对应的 key，修改三种语言的值：

```javascript
'scent1.story': {
  cn: '一位调香师朋友去北海道...',   // ← 改这里
  en: 'A perfumer friend hiked...',   // ← 改这里
  th: 'เพื่อนนักปรุงน้ำหอมเดินป่า...'   // ← 改这里
}
```

> 每个文本都有 `cn` `en` `th` 三个版本，改完保存即可生效。

### 2. 替换收款二维码

**Step 1**: 把你的微信/支付宝收款码截图保存为 PNG，放到 `images/` 文件夹  
**Step 2**: 打开 `index.html`，找到 `id="qrWechat"` 或 `id="qrAlipay"`  
**Step 3**: 把里面的 `<svg>...</svg>` 替换为：

```html
<img src="images/your-qr-code.png" alt="WeChat Pay QR" style="width:200px;height:200px;">
```

### 3. 修改价格

**打开 `index.html`**，搜索 `¥68` 或 `¥188`，替换为你的实际价格。

### 4. 替换图片

把新图片放到 `images/` 文件夹，然后在 `index.html` 的 Gallery 区域修改文件名：

```html
<div class="gallery-item"><img src="images/YOUR-NEW-IMAGE.jpg" alt="描述"></div>
```

### 5. 修改颜色/风格

**打开 `css/style.css`**，找到顶部的 `:root` 区块：

```css
--color-accent: #7a9a5c;        /* 主色调-森林绿 */
--color-accent-light: #9ab380;  /* 浅绿色 */
--color-ocean: #5b9db5;         /* 海洋蓝 */
--color-sand: #e8dcc8;          /* 沙滩色 */
```

改颜色值即可全局生效。

### 6. 添加新香型

在 `index.html` 的 `<section class="scents">` 中复制一个 `scent-item` 块，修改内容。同时在 `js/i18n.js` 中添加对应的翻译。

### 7. 连接银行卡支付（Stripe）

1. 注册 [stripe.com](https://stripe.com)
2. 创建 Payment Link
3. 在 `index.html` 中找到 `#qrCard` 下的按钮，把 href 改为你的 Stripe payment link

---

## 🔄 修改后如何更新网站

### 如果用 Netlify：
直接把修改后的整个文件夹拖到 [app.netlify.com](https://app.netlify.com) 即可覆盖更新。

### 如果用 GitHub Pages：
```bash
cd /Users/qingshan./Desktop/wynnwood-website
git add -A
git commit -m "更新内容描述"
git push
# 等1-2分钟自动部署
```
