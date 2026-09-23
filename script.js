(function () {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const BAG_KEY = 'tse-bag';

  function loadBag() {
    try { return JSON.parse(localStorage.getItem(BAG_KEY) || '[]'); }
    catch { return []; }
  }
  function saveBag() {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(state.bag)); } catch {}
  }

  const state = { bag: loadBag(), top: 68, bottom: 64 };
  const pdp = { color: 'Milk', size: 'M', height: 'Regular', qty: 1 };

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
  const bagCount = $('[data-bag-count]');
  const drawerCount = $('[data-drawer-count]');
  const subtotal = $('[data-subtotal]');
  const drawerContent = $('[data-drawer-content]');

  function renderBag() {
    const qty = state.bag.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (bagCount) { bagCount.textContent = qty; bagCount.classList.toggle('empty', qty === 0); }
    if (drawerCount) drawerCount.textContent = qty;
    const total = state.bag.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
    if (subtotal) subtotal.textContent = `$${total}`;
    if (drawerContent) {
      drawerContent.innerHTML = state.bag.length
        ? state.bag.map((item, index) => {
            const line = item.price * (item.qty || 1);
            return `<div class="bag-item">
              <div>${item.name}${item.qty > 1 ? ` ×${item.qty}` : ''}<small>${item.detail || 'Milk · M · Regular'}</small></div>
              <div><span>$${line}</span><button class="remove-item" data-remove="${index}" aria-label="Remove ${item.name}">Remove</button></div>
            </div>`;
          }).join('')
        : '<p class="empty-bag">Your bag is waiting for something considered.</p>';
      $$('[data-remove]', drawerContent).forEach((button) => button.addEventListener('click', () => {
        state.bag.splice(Number(button.dataset.remove), 1);
        renderBag();
      }));
    }
    saveBag();
  }

  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }
  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
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
      addToBag(`${top} + ${bottom}`, setPrice(), `${color} · Custom set · 10% set pricing`);
    } else if (button.closest('.product-detail')) {
      addToBag(button.dataset.add, button.dataset.price, `${pdp.color} · ${pdp.size} · ${pdp.height}`, pdp.qty);
    } else {
      addToBag(button.dataset.add, button.dataset.price);
    }
  }));

  /* ---------- buy now ---------- */
  $$('[data-buy-now]').forEach((button) => button.addEventListener('click', () => {
    addToBag(button.dataset.buyNow || button.dataset.add, button.dataset.price, `${pdp.color} · ${pdp.size} · ${pdp.height}`, pdp.qty);
  }));

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
      $$('.choice', group).forEach((item) => item.classList.remove('is-selected'));
      choice.classList.add('is-selected');
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
      if (group) $$('.swatch', group).forEach((item) => item.classList.remove('is-selected'));
      el.classList.add('is-selected');
    }
    const label = $('[data-color-label]');
    if (label) label.textContent = color;
    const setDetail = $('[data-set-detail]');
    if (setDetail) setDetail.textContent = `${color} · Custom set · 10% set pricing`;
    pdp.color = color;
  }
  $$('.swatch').forEach((swatch) => swatch.addEventListener('click', () => selectColor(swatch.dataset.color, swatch)));

  /* ---------- PDP size / height ---------- */
  function wireSelector(groupSelector, key) {
    $$(groupSelector).forEach((el) => el.addEventListener('click', () => {
      $$(groupSelector).forEach((item) => item.classList.remove('is-selected'));
      el.classList.add('is-selected');
      pdp[key] = el.dataset[key] || el.textContent.trim();
    }));
  }
  wireSelector('[data-size]', 'size');
  wireSelector('[data-height]', 'height');

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
  $$('[data-gallery-thumb]').forEach((thumb) => thumb.addEventListener('click', () => {
    if (!galleryMain) return;
    galleryMain.style.backgroundImage = `url('${thumb.dataset.galleryThumb}')`;
    $$('[data-gallery-thumb]').forEach((item) => item.classList.remove('is-active'));
    thumb.classList.add('is-active');
  }));

  /* ---------- accordions ---------- */
  $$('[data-accordion-toggle]').forEach((toggle) => toggle.addEventListener('click', () => {
    const item = toggle.closest('.accordion-item');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (item) item.classList.toggle('is-open', !expanded);
  }));

  /* ---------- editorial rules carousel ---------- */
  const rules = [
    ['Rule 01', '“Never sacrifice the outfit for the occasion.”'],
    ['Rule 02', '“Good sleep deserves good design.”'],
    ['Rule 03', '“Looking put together counts at home too.”'],
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
    $$('[data-filter]').forEach((item) => item.classList.remove('is-active'));
    filter.classList.add('is-active');
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
    const email = new FormData(newsletter).get('email');
    if (!email || !String(email).includes('@')) {
      if (message) message.textContent = 'Please enter a valid email address.';
      return;
    }
    if (message) message.textContent = 'You’re on the list. See you in the morning.';
    newsletter.reset();
  });

  /* ---------- search overlay ---------- */
  const searchOverlay = $('[data-search-overlay]');
  const searchToggle = $('[data-search-toggle]');
  const searchClose = $('[data-search-close]');
  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    const input = $('input', searchOverlay);
    if (input) input.focus();
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('is-open');
    searchOverlay.setAttribute('aria-hidden', 'true');
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

  /* ---------- coming soon: loader ---------- */
  const loader = $('.cs-loader');
  if (loader) {
    const finish = () => loader.classList.add('is-done');
    if (document.readyState === 'complete') requestAnimationFrame(finish);
    else window.addEventListener('load', () => requestAnimationFrame(finish), { once: true });
    /* safety: never trap the page behind the loader */
    setTimeout(finish, 2500);
  }

  /* ---------- coming soon: reveal on scroll ---------- */
  const revealEls = $$('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in-view'));
  }

  /* ---------- coming soon: waitlist modal ---------- */
  const waitlistModal = $('[data-waitlist-modal]');
  const waitlistForm = $('[data-waitlist-form]');
  const waitlistMessage = $('[data-waitlist-message]');
  const waitlistSuccess = $('[data-waitlist-success]');
  const waitlistSubmit = waitlistForm && $('.waitlist-submit', waitlistForm);
  let lastFocused = null;

  /* Where signups are sent.
     - Set data-endpoint="https://…" on the form (or paste a URL below) to POST
       { email, name, source, page, at } as JSON to a real collector — e.g. a
       Formspree endpoint, a Mailchimp/ConvertKit proxy, or your own API.
     - Leave it empty to run in local demo mode: nothing leaves the browser, the
       address is remembered locally so the UI behaves realistically. */
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

  function showWaitlistForm() {
    if (waitlistForm) waitlistForm.classList.remove('u-hidden');
    if (waitlistSuccess) waitlistSuccess.classList.add('u-hidden');
    if (waitlistMessage) waitlistMessage.textContent = '';
    const email = $('#waitlist-email', waitlistModal);
    if (email) email.classList.remove('invalid');
  }

  function openWaitlist() {
    if (!waitlistModal) return;
    lastFocused = document.activeElement;
    waitlistModal.classList.add('is-open');
    waitlistModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const saved = readWaitlistStore();
    if (saved && saved.email) {
      showWaitlistSuccess(saved.email);
      const close = $('[data-close-waitlist]', waitlistModal);
      if (close) close.focus();
    } else {
      showWaitlistForm();
      const email = $('#waitlist-email', waitlistModal);
      if (email) email.focus();
    }
  }
  function closeWaitlist() {
    if (!waitlistModal || !waitlistModal.classList.contains('is-open')) return;
    waitlistModal.classList.remove('is-open');
    waitlistModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* keep Tab focus inside the open modal */
  if (waitlistModal) {
    waitlistModal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || !waitlistModal.classList.contains('is-open')) return;
      const focusables = $$('button, input, [href]', waitlistModal).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  $$('[data-open-waitlist]').forEach((button) => button.addEventListener('click', openWaitlist));
  $$('[data-close-waitlist], [data-waitlist-backdrop]').forEach((el) => el.addEventListener('click', closeWaitlist));

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const emailInput = $('#waitlist-email', waitlistModal);
      const nameInput = $('#waitlist-name', waitlistModal);
      const value = String(new FormData(waitlistForm).get('email') || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!valid) {
        if (emailInput) { emailInput.classList.add('invalid'); emailInput.focus(); }
        if (waitlistMessage) waitlistMessage.textContent = 'Please enter a valid email address.';
        return;
      }
      if (emailInput) emailInput.classList.remove('invalid');
      if (waitlistMessage) waitlistMessage.textContent = '';

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
        waitlistSubmit.textContent = 'Joining…';
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
          /* local demo mode: simulate a brief round-trip */
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
    closeWaitlist();
    if (accountMenu && accountMenu.classList.contains('is-open')) {
      accountMenu.classList.remove('is-open');
      accountButton.setAttribute('aria-expanded', 'false');
      const dropdown = $('.account-dropdown', accountMenu);
      if (dropdown) dropdown.setAttribute('aria-hidden', 'true');
    }
  });

  renderBag();
  updateSetTotal();
  updateSetPreview();
})();