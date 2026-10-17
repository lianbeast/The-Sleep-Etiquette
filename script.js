(function () {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const BAG_KEY = 'tse-bag';

  function loadBag() {
    try {
      const items = JSON.parse(localStorage.getItem(BAG_KEY) || '[]');
      return Array.isArray(items) ? items.filter((item) => item && typeof item.name === 'string' &&
        Number.isFinite(item.price) && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 10 &&
        typeof item.detail === 'string') : [];
    }
    catch { return []; }
  }
  function saveBag() {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(state.bag)); } catch {}
  }

  const state = { bag: loadBag(), top: 68, bottom: 64 };
  const params = new URLSearchParams(location.search);
  const catalog = window.TSE_PRODUCTS || {};
  const productKey = Object.hasOwn(catalog, params.get('product')) ? params.get('product') : 'short-sleeve-shirt';
  const product = catalog[productKey];
  const colorImages = { Milk: 'milk', Butter: 'butter', Matcha: 'matcha', Cocoa: 'cocoa', Sky: 'blue-hour', Petal: 'dusty-rose' };
  const pdp = { color: Object.hasOwn(colorImages, params.get('color')) ? params.get('color') : 'Milk', size: '', height: '', qty: 1 };
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  /* ---------- focus trap utility ---------- */
  function trapFocus(root) {
    const sel = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    function handler(e) {
      if (e.key !== 'Tab') return;
      // Re-query each Tab: the bag re-renders on add/remove, so the set of
      // tabbable nodes changes while the drawer stays open.
      const focusable = [...root.querySelectorAll(sel)].filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    root.addEventListener('keydown', handler);
    return () => root.removeEventListener('keydown', handler);
  }

  /* ---------- mobile nav ---------- */
  const menuToggle = $('[data-menu-toggle]');
  const mainNav = $('[data-main-nav]');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.main-nav a', mainNav).forEach((link) => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- cart / bag ---------- */
  const cartDrawer = $('[data-cart-drawer]');
  const backdrop = $('.drawer-backdrop');
  let cartOpener = null;
  const bagCount = $('[data-bag-count]');
  const drawerCount = $('[data-drawer-count]');
  const subtotal = $('[data-subtotal]');
  const drawerContent = $('[data-drawer-content]');

  function renderBag() {
    const qty = state.bag.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (bagCount) { bagCount.textContent = qty; bagCount.classList.toggle('empty', qty === 0); }
    if (drawerCount) drawerCount.textContent = qty;
    const total = state.bag.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    if (subtotal) subtotal.textContent = money.format(total);
    if (drawerContent) {
      drawerContent.innerHTML = state.bag.length
        ? state.bag.map((item, index) => {
            const line = item.price * (item.qty || 1);
            return `<div class="bag-item">
              <div>${escapeHTML(item.name)}${item.qty > 1 ? ` ×${item.qty}` : ''}<small>${escapeHTML(item.detail)}</small></div>
              <div><span>${money.format(line)}</span><button class="remove-item" data-remove="${index}" aria-label="Remove ${escapeHTML(item.name)}">Remove</button></div>
            </div>`;
          }).join('')
        : '<p class="empty-bag">Your bag is waiting for something considered.</p>';
      $$('[data-remove]', drawerContent).forEach((button) => button.addEventListener('click', () => {
        const index = Number(button.dataset.remove);
        state.bag.splice(index, 1);
        renderBag();
        const remaining = $$('[data-remove]', drawerContent);
        (remaining[Math.min(index, remaining.length - 1)] || $('[data-close-cart]', cartDrawer)).focus();
      }));
    }
    saveBag();
  }

  let inertBackground = [];
  function openCart() {
    if (!cartDrawer || cartDrawer.classList.contains('is-open')) return;
    // Remember who opened the drawer so focus can return there on close.
    // document.activeElement covers the bag button and every quick-add alike.
    cartOpener = document.activeElement;
    cartDrawer.inert = false;
    cartDrawer.hidden = false;
    cartDrawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartDrawer._focusTrap = trapFocus(cartDrawer);
    inertBackground = [...document.body.children].filter((el) => el !== cartDrawer && el !== backdrop &&
      !el.inert && !['SCRIPT', 'STYLE', 'LINK'].includes(el.tagName));
    inertBackground.forEach((el) => { el.inert = true; });
    // Visibility has no transition: force the rendered state before focusing.
    cartDrawer.getBoundingClientRect();
    $('[data-close-cart]', cartDrawer).focus({ preventScroll: true });
  }
  function closeCart() {
    if (!cartDrawer || !cartDrawer.classList.contains('is-open')) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.inert = true;
    cartDrawer.hidden = true;
    inertBackground.forEach((el) => { el.inert = false; });
    inertBackground = [];
    if (backdrop) backdrop.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    if (cartDrawer._focusTrap) { cartDrawer._focusTrap(); cartDrawer._focusTrap = null; }
    if (cartOpener) { cartOpener.focus(); cartOpener = null; }
  }

  const cartButton = $('[data-cart]');
  if (cartButton) cartButton.addEventListener('click', openCart);
  $$('[data-close-cart]').forEach((button) => button.addEventListener('click', closeCart));

  function addToBag(name, price, detail, qty = 1) {
    state.bag.push({ name, price: Number(price), detail, qty });
    renderBag();
    openCart();
  }

  /* ---------- add to bag (quick add / set add / PDP) ---------- */
  $$('[data-add]').forEach((button) => button.addEventListener('click', () => {
    if (button.closest('.builder-intro')) {
      const top = ($('[data-top-label]')?.textContent || 'Top').trim();
      const bottom = ($('[data-bottom-label]')?.textContent || 'Bottom').trim();
      const color = ($('[data-color-label]')?.textContent || 'Milk').trim();
      const fit = $$('[data-set-fit]');
      const missing = fit.find((el) => !el.value);
      if (missing) {
        $('[data-set-message]').textContent = 'Choose a top size, bottom size and height before adding your set.';
        missing.focus();
        return;
      }
      $('[data-set-message]').textContent = '';
      addToBag(`${top} + ${bottom}`, setPrice(), `${color} · Top ${fit[0].value} · Bottom ${fit[1].value} · ${fit[2].value}`);
    } else if (button.closest('.product-detail')) {
      if (!validateFit()) return;
      addToBag(product ? product.name : button.dataset.add, product ? product.price : button.dataset.price, `${pdp.color} · ${pdp.size} · ${pdp.height}`, pdp.qty);
    } else {
      // Cards lead to explicit fit selection instead of inventing size/color.
      location.href = button.dataset.productUrl || 'product.html';
    }
  }));

  function validateFit() {
    const message = $('[data-fit-message]');
    if (!pdp.size || !pdp.height) {
      if (message) message.textContent = 'Choose your size and height before adding this piece.';
      const first = pdp.size ? $('[data-height]') : $('[data-size]');
      if (first) first.focus();
      return false;
    }
    if (message) message.textContent = '';
    return true;
  }

  /* ---------- set builder ---------- */
  function setPrice() {
    return Math.floor((state.top + state.bottom) * 0.9);
  }
  function updateSetTotal() {
    const total = $('[data-total]');
    if (total) total.textContent = `$${setPrice()}`;
  }
  function updateSetPreview() {
    const preview = $('[data-set-preview]');
    if (!preview) return;
    const top = ($('[data-top-label]')?.textContent || '').trim();
    const bottom = ($('[data-bottom-label]')?.textContent || '').trim();
    preview.textContent = `${top} + ${bottom}`;
  }

  $$('[data-choice-group]').forEach((group) => {
    $$('.choice', group).forEach((choice) => choice.addEventListener('click', () => {
      $$('.choice', group).forEach((item) => {
        item.classList.remove('is-selected');
        item.setAttribute('aria-pressed', 'false');
      });
      choice.classList.add('is-selected');
      choice.setAttribute('aria-pressed', 'true');
      const name = choice.dataset.name;
      const price = Number(choice.dataset.price);
      if (group.dataset.choiceGroup === 'top') {
        state.top = price;
        const label = $('[data-top-label]');
        if (label) label.textContent = name;
      } else {
        state.bottom = price;
        const label = $('[data-bottom-label]');
        if (label) label.textContent = name;
      }
      updateSetTotal();
      updateSetPreview();
    }));
  });

  /* ---------- color swatches (set builder + PDP) ---------- */
  function selectColor(color, el) {
    if (el) {
      const group = el.closest('.swatches, .color-swatches');
      if (group) {
        $$('.swatch', group).forEach((item) => {
          item.classList.remove('is-selected');
          item.setAttribute('aria-pressed', 'false');
        });
        el.classList.add('is-selected');
        el.setAttribute('aria-pressed', 'true');
      }
    }
    const label = $('[data-color-label]');
    if (label) label.textContent = color;
    const setDetail = $('[data-set-detail]');
    if (setDetail) setDetail.textContent = `${color} · Custom set · 10% set pricing`;
    pdp.color = color;
    if (product && $('[data-gallery-main]')) updateProductGallery('model');
    const builderImage = $('.builder-lookbook');
    if (builderImage && colorImages[color]) {
      builderImage.style.backgroundImage = `url('../assets/${colorImages[color]}-model-v2.webp')`;
      builderImage.setAttribute('aria-label', `Illustrative collection photograph in ${color}`);
    }
  }
  $$('.swatch').forEach((swatch) => swatch.addEventListener('click', () => selectColor(swatch.dataset.color, swatch)));

  /* ---------- PDP size / height ---------- */
  function wireSelector(groupSelector, key) {
    $$(groupSelector).forEach((el) => el.addEventListener('click', () => {
      $$(groupSelector).forEach((item) => item.classList.remove('is-selected'));
      el.classList.add('is-selected');
      $$(groupSelector).forEach((item) => item.setAttribute('aria-pressed', String(item === el)));
      pdp[key] = el.dataset[key] || el.textContent.trim();
      if (pdp.size && pdp.height && $('[data-fit-message]')) $('[data-fit-message]').textContent = '';
    }));
  }
  wireSelector('[data-size]', 'size');
  wireSelector('[data-height]', 'height');
  $$('[data-size], [data-height]').forEach((el) => el.setAttribute('aria-pressed', String(el.classList.contains('is-selected'))));

  /* ---------- PDP quantity ---------- */
  const qtyValue = $('[data-qty-value]');
  const qtyMinus = $('[data-qty-minus]');
  const qtyPlus = $('[data-qty-plus]');
  function renderQty() {
    if (qtyValue) qtyValue.textContent = pdp.qty;
  }
  if (qtyMinus) qtyMinus.addEventListener('click', () => { pdp.qty = Math.max(1, pdp.qty - 1); renderQty(); });
  if (qtyPlus) qtyPlus.addEventListener('click', () => { pdp.qty = Math.min(10, pdp.qty + 1); renderQty(); });

  /* ---------- PDP gallery ---------- */
  const galleryMain = $('[data-gallery-main]');
  function updateProductGallery(view) {
    if (!galleryMain || !product) return;
    const stem = colorImages[pdp.color];
    const url = `../assets/${stem}-${view}-v2.webp`;
    galleryMain.style.backgroundImage = `url('${url}')`;
    galleryMain.setAttribute('aria-label', `${product.name} · ${pdp.color} · illustrative ${view} photograph`);
    $$('[data-gallery-view]').forEach((thumb) => {
      const active = thumb.dataset.galleryView === view;
      thumb.classList.toggle('is-active', active);
      thumb.setAttribute('aria-pressed', String(active));
      thumb.style.backgroundImage = `url('../assets/${stem}-${thumb.dataset.galleryView}-v2.webp')`;
      thumb.setAttribute('aria-label', `View ${pdp.color} ${thumb.dataset.galleryView} photograph`);
    });
  }
  $$('[data-gallery-view]').forEach((thumb) => thumb.addEventListener('click', () => updateProductGallery(thumb.dataset.galleryView)));
  if (product && galleryMain) {
    document.title = `${product.name} — The Sleep Etiquette`;
    $('#product-title').textContent = product.name;
    $('.detail-price').textContent = money.format(product.price);
    $('.product-copy>.section-desc').textContent = `${product.name} in ${product.fabric.toLowerCase()}. A collection concept; final garment details and photography are pending client approval.`;
    const details = $('.accordion-content p');
    if (details) details.textContent = `${product.name}. Final cut, measurements and construction details will be confirmed with the product samples.`;
    $$('[data-size], [data-height]').forEach((el) => {
      el.classList.remove('is-selected');
      el.setAttribute('aria-pressed', 'false');
    });
    selectColor(pdp.color, $(`[data-color="${pdp.color}"]`));
  }

  /* ---------- accordions ---------- */
  $$('[data-accordion-toggle]').forEach((toggle) => toggle.addEventListener('click', () => {
    const item = toggle.closest('.accordion-item');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (item) {
      item.classList.toggle('is-open', !expanded);
      const panel = $('.accordion-content', item);
      if (panel) panel.hidden = expanded;
    }
  }));

  /* ---------- editorial rules carousel ---------- */
  const rules = [
    ['Rule 01', 'Never sacrifice the outfit for the occasion.'],
    ['Rule 02', 'Good sleep deserves good design.'],
    ['Rule 03', 'Looking put together counts at home too.'],
  ];
  let ruleIndex = 0;
  const nextRule = $('[data-next-rule]');
  if (nextRule) nextRule.addEventListener('click', () => {
    ruleIndex = (ruleIndex + 1) % rules.length;
    const num = $('[data-rule-number]');
    const text = $('[data-rule-text]');
    if (num) num.textContent = rules[ruleIndex][0];
    if (text) text.textContent = rules[ruleIndex][1];
  });

  /* ---------- journal filters ---------- */
  $$('[data-filter]').forEach((filter) => filter.addEventListener('click', () => {
    $$('[data-filter]').forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-pressed', 'false');
    });
    filter.classList.add('is-active');
    filter.setAttribute('aria-pressed', 'true');
    const selected = filter.dataset.filter;
    $$('.journal-card').forEach((card) => {
      card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected);
    });
  }));

  /* ---------- newsletter ---------- */
  const newsletter = $('[data-newsletter]');
  if (newsletter) newsletter.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = $('[data-form-message]');
    const input = $('#email', newsletter);
    const email = new FormData(newsletter).get('email');
    if (!email || !String(email).includes('@')) {
      if (input) input.setAttribute('aria-invalid', 'true');
      if (message) message.textContent = 'Please enter a valid email address.';
      return;
    }
    if (input) input.removeAttribute('aria-invalid');
    if (message) message.textContent = "This is a store preview. Email signup will open at launch.";
    newsletter.reset();
  });

  /* ---------- search overlay ---------- */
  const searchOverlay = $('[data-search-overlay]');
  const searchToggle = $('[data-search-toggle]');
  const searchClose = $('[data-search-close]');
  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.inert = false;
    searchOverlay.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    const input = $('input', searchOverlay);
    if (input) input.focus();
    searchOverlay._focusTrap = trapFocus(searchOverlay);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    const wasOpen = searchOverlay.classList.contains('is-open');
    searchOverlay.classList.remove('is-open');
    searchOverlay.inert = true;
    if (wasOpen && searchToggle) searchToggle.focus();
    searchOverlay.setAttribute('aria-hidden', 'true');
    if (searchOverlay._focusTrap) searchOverlay._focusTrap();
  }
  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  /* ---------- account dropdown ---------- */
  const accountMenu = $('.account-menu');
  const accountButton = accountMenu && $('button', accountMenu);
  if (accountMenu && accountButton) {
    accountButton.addEventListener('click', () => {
      const open = accountMenu.classList.toggle('is-open');
      accountButton.setAttribute('aria-expanded', String(open));
      const dropdown = $('.account-dropdown', accountMenu);
      if (dropdown) dropdown.setAttribute('aria-hidden', String(!open));
    });
  }

  /* ---------- coming soon: inline waitlist form ---------- */
  const waitlistForm = $('[data-waitlist-form]');
  const waitlistMessage = $('[data-waitlist-message]');
  const waitlistSuccess = $('[data-waitlist-success]');
  const waitlistSubmit = waitlistForm && $('.waitlist-submit, .cs-join', waitlistForm);

  const WAITLIST_KEY = 'tse-waitlist';
  const waitlistEndpoint = (waitlistForm && waitlistForm.dataset.endpoint) || '';

  function readWaitlistStore() {
    try { return JSON.parse(localStorage.getItem(WAITLIST_KEY) || 'null'); }
    catch { return null; }
  }
  function writeWaitlistStore(entry) {
    try { localStorage.setItem(WAITLIST_KEY, JSON.stringify(entry)); } catch {}
  }

  function showWaitlistSuccess(email) {
    if (!waitlistForm || !waitlistSuccess) return;
    waitlistForm.classList.add('u-hidden');
    waitlistSuccess.classList.remove('u-hidden');
    if (waitlistMessage) waitlistMessage.textContent = '';
    const echo = $('[data-waitlist-email-echo]', waitlistSuccess);
    if (echo) echo.textContent = email || '';
  }

  const saved = readWaitlistStore();
  if (saved && saved.email && waitlistEndpoint) showWaitlistSuccess(saved.email);

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const emailInput = $('#waitlist-email', waitlistForm);
      const nameInput = $('#waitlist-name', waitlistForm);
      const value = String(new FormData(waitlistForm).get('email') || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!valid) {
        if (emailInput) {
          emailInput.classList.add('invalid');
          emailInput.setAttribute('aria-invalid', 'true');
          emailInput.focus();
        }
        if (waitlistMessage) waitlistMessage.textContent = 'Please enter a valid email address.';
        return;
      }
      if (emailInput) {
        emailInput.classList.remove('invalid');
        emailInput.removeAttribute('aria-invalid');
      }
      if (waitlistMessage) waitlistMessage.textContent = '';

      if (!waitlistEndpoint) {
        if (waitlistMessage) waitlistMessage.textContent = 'Email signup is not open yet. Please check back soon.';
        return;
      }

      const payload = {
        email: value,
        name: nameInput ? String(nameInput.value || '').trim() : '',
        source: 'coming-soon',
        page: location.pathname,
        at: new Date().toISOString(),
      };

      if (waitlistSubmit) {
        waitlistSubmit.dataset.label = waitlistSubmit.dataset.label || waitlistSubmit.textContent;
        waitlistSubmit.disabled = true;
        waitlistSubmit.textContent = 'Joining...';
      }
      try {
        if (waitlistEndpoint) {
          const response = await fetch(waitlistEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('Request failed: ' + response.status);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        writeWaitlistStore({ email: value, at: payload.at });
        waitlistForm.reset();
        showWaitlistSuccess(value);
      } catch (error) {
        if (waitlistMessage) waitlistMessage.textContent = 'Something went wrong. Please try again.';
      } finally {
        if (waitlistSubmit) {
          waitlistSubmit.disabled = false;
          waitlistSubmit.textContent = waitlistSubmit.dataset.label || 'Join the list';
        }
      }
    });
  }

  /* ---------- esc closes overlays ---------- */
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeCart();
    closeSearch();
    if (accountMenu && accountMenu.classList.contains('is-open')) {
      accountMenu.classList.remove('is-open');
      accountButton.setAttribute('aria-expanded', 'false');
      const dropdown = $('.account-dropdown', accountMenu);
      if (dropdown) dropdown.setAttribute('aria-hidden', 'true');
    }
  });

  /* ---------- Initialise ARIA on choice buttons and swatches ----------
     These are real <button> elements: they already have the button role, are
     already in the tab order, and already fire on Enter (keydown) and Space
     (keyup). Re-adding role/tabindex/key handlers duplicated that behaviour
     and made Space activate on keydown, double-firing with the native one.
     Only the initial aria-pressed mirror of the server-rendered .is-selected
     is needed — the click handlers keep it in sync. */
  $$('[data-choice-group] .choice, .swatch, .color-swatches .swatch').forEach((el) => {
    el.setAttribute('aria-pressed', el.classList.contains('is-selected') ? 'true' : 'false');
  });

  $$('[data-review-step]').forEach((button) => button.addEventListener('click', () => {
    const rail = $('.reviews .journal-grid');
    if (!rail) return;
    rail.scrollBy({ left: Number(button.dataset.reviewStep) * rail.clientWidth * 0.8,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));

  renderBag();
  updateSetTotal();
  updateSetPreview();
})();
