/* ============================================
   WYNNWOOD 蔚木 — Site Interactions
   i18n Language Switcher + Payment System
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // LANGUAGE SWITCHER
  // ==========================================
  let currentLang = localStorage.getItem('wynnwood-lang') || 'cn';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('wynnwood-lang', lang);

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update all i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (I18N[key] && I18N[key][lang]) {
        el.innerHTML = I18N[key][lang];
      }
    });

    // Update HTML lang attribute
    const htmlLangMap = { cn: 'zh-CN', en: 'en', th: 'th' };
    document.documentElement.lang = htmlLangMap[lang] || 'zh-CN';

    // Update order summary
    updateOrderSummary();
  }

  // Language button clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Initialize language
  setLanguage(currentLang);

  // ==========================================
  // NAVIGATION
  // ==========================================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Mobile menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // INTERSECTION OBSERVER — Fade-in animations
  // ==========================================
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatable = '.scent-item, .craft-item, .principle-item, .story-card, .gallery-item, .contact-channel, .coastal-feat';
  document.querySelectorAll(animatable).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // ==========================================
  // GALLERY LIGHTBOX
  // ==========================================
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.92);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; padding: 40px; opacity: 0; transition: opacity 0.3s ease;
      `;

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.style.cssText = 'max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 4px;';

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 30px;
        background: none; border: none; color: #fff;
        font-size: 40px; cursor: pointer; font-weight: 200;
        line-height: 1; padding: 8px;
      `;

      overlay.appendChild(lightboxImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      const closeLightbox = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = '';
        }, 300);
      };

      requestAnimationFrame(() => { overlay.style.opacity = '1'; });
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
      closeBtn.addEventListener('click', closeLightbox);
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', escHandler); }
      });
    });
  });

  // ==========================================
  // ORDER & PAYMENT SYSTEM
  // ==========================================
  const orderScent = document.getElementById('orderScent');
  const orderQty = document.getElementById('orderQty');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const orderTotal = document.getElementById('orderTotal');
  const summaryTotal = document.getElementById('summaryTotal');
  const summaryList = document.getElementById('summaryList');
  const orderName = document.getElementById('orderName');
  const orderPhone = document.getElementById('orderPhone');
  const orderAddress = document.getElementById('orderAddress');
  const summaryInfo = document.getElementById('summaryInfo');
  const summaryName = document.getElementById('summaryName');
  const summaryPhone = document.getElementById('summaryPhone');
  const summaryAddr = document.getElementById('summaryAddr');

  // Extract price from select value
  function getPriceFromSelect() {
    if (!orderScent) return 68;
    const val = orderScent.value;
    const match = val.match(/¥(\d+)/);
    return match ? parseInt(match[1]) : 68;
  }

  // Extract scent name from select value
  function getScentName() {
    if (!orderScent) return 'McIntosh 红苹果';
    return orderScent.value.split(' (')[0];
  }

  function updateOrderSummary() {
    if (!orderScent || !orderQty) return;
    const price = getPriceFromSelect();
    const qty = parseInt(orderQty.value) || 1;
    const total = price * qty;
    const scentName = getScentName();

    if (orderTotal) orderTotal.textContent = `¥${total}`;
    if (summaryTotal) summaryTotal.textContent = `¥${total}`;

    if (summaryList) {
      summaryList.innerHTML = `
        <div class="summary-item">
          <span>${scentName} ×${qty}</span>
          <span>¥${total}</span>
        </div>
      `;
    }

    // Update address summary
    if (summaryInfo && orderName && orderPhone && orderAddress) {
      const hasInfo = orderName.value || orderPhone.value || orderAddress.value;
      summaryInfo.style.display = hasInfo ? 'block' : 'none';
      if (summaryName) summaryName.textContent = orderName.value || '—';
      if (summaryPhone) summaryPhone.textContent = orderPhone.value || '—';
      if (summaryAddr) summaryAddr.textContent = orderAddress.value || '—';
    }
  }

  // Quantity controls
  if (qtyMinus && qtyPlus && orderQty) {
    qtyMinus.addEventListener('click', () => {
      let v = parseInt(orderQty.value) || 1;
      if (v > 1) { orderQty.value = v - 1; updateOrderSummary(); }
    });
    qtyPlus.addEventListener('click', () => {
      let v = parseInt(orderQty.value) || 1;
      if (v < 20) { orderQty.value = v + 1; updateOrderSummary(); }
    });
  }

  if (orderScent) {
    orderScent.addEventListener('change', updateOrderSummary);
  }

  // Address input listeners
  [orderName, orderPhone, orderAddress].forEach(el => {
    if (el) el.addEventListener('input', updateOrderSummary);
  });

  // ==========================================
  // PAYMENT URLS — 在这里配置你的支付链接
  // ==========================================
  // 方式1: 注册 stripe.com → 创建 Payment Link → 粘贴链接
  // 方式2: 使用你的淘宝店铺链接
  // 方式3: 使用你的 PayPal.me 链接
  const PAYMENT_URLS = {
    alipay: 'https://buy.stripe.com/your-alipay-link',   // TODO: 替换为实际支付宝支付链接
    wechat: 'https://buy.stripe.com/your-wechat-link',    // TODO: 替换为实际微信支付链接
    card: 'https://buy.stripe.com/your-card-link',        // TODO: 替换为实际银行卡支付链接
  };

  // Submit order button
  const btnSubmit = document.getElementById('btnSubmitOrder');
  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const name = orderName?.value?.trim() || '';
      const phone = orderPhone?.value?.trim() || '';
      const addr = orderAddress?.value?.trim() || '';

      if (!name || !phone || !addr) {
        alert('请填写完整的收货信息（姓名/电话/地址）');
        return;
      }

      const scent = getScentName();
      const qty = parseInt(orderQty?.value) || 1;
      const total = getPriceFromSelect() * qty;
      const activePayment = document.querySelector('.payment-tab.active');
      const payMethod = activePayment ? activePayment.dataset.payment : 'alipay';
      const payNames = { wechat: '微信支付', alipay: '支付宝', card: '银行卡' };

      const confirmed = confirm(
        `确认订单信息：\n\n` +
        `📦 ${scent} ×${qty}\n` +
        `💰 ¥${total}\n` +
        `💳 ${payNames[payMethod]}\n` +
        `👤 ${name}\n` +
        `📱 ${phone}\n` +
        `📍 ${addr}\n\n` +
        `点击"确定"跳转至支付页面`
      );

      if (confirmed) {
        const url = PAYMENT_URLS[payMethod];
        if (url && !url.includes('your-')) {
          window.location.href = url;
        } else {
          alert('支付链接尚未配置，请联系客服完成付款。\n📧 hello@wynnwood.cn');
        }
      }
    });
  }

  // Payment method tabs
  const paymentTabs = document.querySelectorAll('.payment-tab');
  const payWechat = document.getElementById('payWechat');
  const payAlipay = document.getElementById('payAlipay');
  const payCard = document.getElementById('payCard');

  paymentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      paymentTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const method = tab.dataset.payment;
      if (payWechat) payWechat.style.display = method === 'wechat' ? 'block' : 'none';
      if (payAlipay) payAlipay.style.display = method === 'alipay' ? 'block' : 'none';
      if (payCard) payCard.style.display = method === 'card' ? 'block' : 'none';
    });
  });

  // Buy buttons on scent cards scroll to order section
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const scentName = btn.dataset.scent;

      // Pre-select the matching scent
      if (orderScent) {
        const options = orderScent.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].text.includes(scentName.split(' ')[0])) {
            orderScent.selectedIndex = i;
            break;
          }
        }
        updateOrderSummary();
      }

      // Scroll to order section
      const target = document.getElementById('order-sec');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Flash effect
        target.style.transition = 'box-shadow 0.3s ease';
        target.style.boxShadow = '0 0 0 4px var(--color-accent)';
        setTimeout(() => {
          target.style.boxShadow = '';
        }, 1500);
      }
    });
  });

  // ==========================================
  // FOOTER YEAR
  // ==========================================
  const footerP = document.querySelector('.footer-bottom p');
  if (footerP && footerP.textContent.includes('2026')) {
    // Will be updated by i18n, keep current year
  }

  // Initial summary update
  updateOrderSummary();

});
