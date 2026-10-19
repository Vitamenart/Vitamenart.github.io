/* Общие куски всех страниц: хэдер, меню, футер и функция обложки. */
(function () {
  const P = window.PROJECTS, C = window.CONTACTS;

  const icon = {
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 7h14M5 12h14M5 17h14"/></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    arrow: '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3"><path d="M26 18l14 14-14 14"/></svg>',
    mail: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8.82129L9.85254 13.8184C11.1628 14.6522 12.8372 14.6522 14.1475 13.8184L22 8.82129V16Z" fill="currentColor"/><path d="M18 4C19.7199 4 21.1849 5.08607 21.75 6.60938L13.0742 12.1318C12.4191 12.5487 11.5809 12.5487 10.9258 12.1318L2.24902 6.60938C2.81405 5.0859 4.27994 4 6 4H18Z" fill="currentColor"/></svg>',
    chevron: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 10l5 5 5-5"/></svg>',
    check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    scroll: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 10l5 5 5-5"/></svg>',
    tg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M19.7175 4.09863L2.88718 10.208C1.73858 10.6423 1.74523 11.2455 2.67645 11.5144L6.99747 12.7833L16.9951 6.84549C17.4678 6.57473 17.8997 6.72039 17.5447 7.01706L9.44466 13.8985H9.44276L9.44466 13.8994L9.14659 18.0921C9.58325 18.0921 9.77595 17.9035 10.0209 17.681L12.1197 15.7598L16.4853 18.7953C17.2903 19.2126 17.8684 18.9982 18.0687 18.0939L20.9345 5.38002C21.2278 4.27288 20.4855 3.77158 19.7175 4.09863Z" fill="currentColor"/> </svg>',
    x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7503 11.1862L19.5187 4.40002H16.7117L12.4626 9.14445L8.84961 4.40002H3.59961L9.85374 12.6169L3.59961 19.6H6.39961L11.1415 14.3132L15.1496 19.6H20.3996L13.7503 11.1862ZM15.8496 18.2182L6.39961 5.78184H8.14961L17.5996 18.2182H15.8496Z" fill="currentColor"/> </svg>',
    ig: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M12.0059 8.66895C13.8468 8.66895 15.3398 10.1618 15.3398 12.002C15.3398 13.8422 13.8468 15.335 12.0059 15.335C10.1649 15.335 8.67188 13.8422 8.67188 12.002C8.67188 10.1618 10.1649 8.66895 12.0059 8.66895Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0059 2C14.7219 2 15.0622 2.01173 16.1328 2.0625C17.1959 2.10938 17.9235 2.2812 18.5605 2.52734C19.2171 2.78127 19.7761 3.12499 20.3311 3.67969C20.89 4.23448 21.2303 4.79382 21.4766 5.45801C21.7227 6.09083 21.8945 6.82138 21.9414 7.88379C21.9883 8.9504 22 9.29049 22 12.0059C22 14.7212 21.9883 15.0613 21.9414 16.1279C21.8945 17.1903 21.7227 17.917 21.4766 18.5537C21.2225 19.2101 20.8783 19.7694 20.3232 20.3242C19.7683 20.8789 19.2093 21.2226 18.5527 21.4766C17.9196 21.7227 17.1881 21.8945 16.125 21.9414C15.0583 21.9883 14.718 22 12.002 22C9.28591 22 8.94557 21.9883 7.87891 21.9414C6.81578 21.8945 6.08826 21.7227 5.45117 21.4766C4.79461 21.2226 4.23562 20.8789 3.68066 20.3242C3.12174 19.7694 2.7814 19.2101 2.52344 18.5498C2.27729 17.917 2.1055 17.1864 2.05859 16.124C2.01169 15.0574 2 14.7173 2 12.002C2 9.28658 2.01169 8.9465 2.05859 7.87598C2.1055 6.81356 2.27729 6.08692 2.52344 5.4502C2.7814 4.79382 3.12174 4.23448 3.68066 3.67969C4.23562 3.12109 4.79461 2.78127 5.45508 2.52344C6.08826 2.2773 6.81969 2.10548 7.88281 2.05859C8.94948 2.01173 9.28982 2 12.0059 2ZM12.0059 6.86426C9.16826 6.86426 6.86621 9.16547 6.86621 12.002C6.86621 14.8384 9.16826 17.1396 12.0059 17.1396C14.8435 17.1396 17.1455 14.8384 17.1455 12.002C17.1455 9.16546 14.8435 6.86426 12.0059 6.86426ZM17.3486 5.46191C16.6882 5.46203 16.1484 5.99701 16.1484 6.66113C16.1485 7.32131 16.6843 7.86024 17.3486 7.86035C18.0091 7.86035 18.5488 7.32528 18.5488 6.66113C18.5488 6.00085 18.0092 5.46191 17.3486 5.46191Z" fill="currentColor"/> </svg>',
    in: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"> <path d="M7.4526 20.2H3.88589V8.70511H7.4526V20.2ZM5.66924 7.13891C4.52414 7.13891 3.59961 6.21236 3.59961 5.06946C3.59961 3.92655 4.52414 3 5.66924 3C6.80965 3 7.73418 3.92655 7.73418 5.06946C7.73418 6.20766 6.80965 7.13891 5.66924 7.13891ZM20.7996 20.2H17.2376V14.6125C17.2376 13.2814 17.2141 11.5647 15.3838 11.5647C13.5301 11.5647 13.2485 13.018 13.2485 14.5184V20.2H9.69118V8.70511H13.1077V10.276H13.1546C13.6286 9.37298 14.7925 8.41821 16.5243 8.41821C20.1332 8.41821 20.7996 10.7981 20.7996 13.8929V20.2Z" fill="currentColor"/> </svg>'
  };
  window.ICON = icon;

  /* Одна функция для всех обложек. Разный размер = разный CSS, файл один. */
  window.coverImg = function (p, opts = {}) {
    // eager — первый экран (высокий приоритет); lazy: false — грузить сразу, но без приоритета
    const lazy = opts.eager ? 'fetchpriority="high"' : opts.lazy === false ? 'loading="eager"' : 'loading="lazy"';
    return `<img class="cover" src="${window.COVERS_DIR + p.cover}" alt="${opts.alt ?? p.title}"
      width="1920" height="1080" decoding="async" ${lazy}
      data-reveal onload="revealImg(this)" onerror="this.remove()" style="object-position:${p.focus || "50% 50%"}">`;
  };

  /* Картинка скачана → ждём, пока браузер её декодирует, и только тогда снимаем скелетон
     и проявляем картинку (CSS: img[data-reveal]). Иначе между ними мелькает пустой кадр. */
  window.revealImg = function (img, box = img.parentNode) {
    const show = () => box && box.classList.add("is-loaded");
    img.decode ? img.decode().then(show, show) : show();
  };

  const page = document.body.dataset.page;
  const activeTab = { index: "overview", work: "work", about: "about" }[page] || null;   // на странице проекта — ни один
  // выпадающий список (iPad / мобильный): на странице проекта, как раньше, — Work
  const selectTab = activeTab || (page === "project" ? "work" : null);
  const theme = document.body.dataset.header || "dark";

  /* Хэдер: имя, три пункта (window.NAV), справа кнопка Contact — открывает панель с контактами.
     iPad и мобильный (≤1024): вместо пунктов — выпадающий список, имя без фамилии, Contact — только иконка. */
  function header() {
    const nav = window.NAV;
    const current = nav.find(c => c.id === selectTab);
    return `
      <header class="site-header site-header--${theme}">
        <a class="site-header__name" href="index.html">Vitalii<span class="site-header__surname"> Menshenin</span></a>
        <nav class="tabs tabs--header" aria-label="Main">
          ${nav.map(c => `<a class="tab ${c.id === activeTab ? "is-active" : ""}" href="${c.href}" data-tab="${c.id}"
            ${c.id === activeTab ? 'aria-current="page"' : ""}>${c.label}</a>`).join("")}
        </nav>
        <div class="tab-select">
          <button class="pill pill--solid tab-select__btn" type="button" aria-expanded="false" aria-controls="tab-select-list">
            ${(current || nav[0]).label} ${icon.chevron}
          </button>
          <ul class="tab-select__list hover-dim" id="tab-select-list" hidden>
            ${nav.map(c => `<li><a href="${c.href}" ${c.id === selectTab ? 'aria-current="page"' : ""}>
              ${c.label}${c.id === selectTab ? icon.check : ""}</a></li>`).join("")}
          </ul>
        </div>
        <button class="pill pill--solid menu-open" type="button" aria-haspopup="dialog" aria-controls="menu" aria-label="Contact">
          <span class="menu-open__label">Contact</span> ${icon.menu}
        </button>
      </header>`;
  }

  /* Круглые иконки соцсетей — в меню и в мобильном футере */
  function socials(cls, before = "") {
    return `<div class="${cls} hover-dim">${before}${["tg", "x", "ig", "in"].map(k => {
      const l = C.links.find(l => l.short === k);
      return `<a class="round-btn" href="${l.href}" aria-label="${l.label}" target="_blank" rel="noopener">${icon[k]}</a>`;
    }).join("")}</div>`;
  }

  function menu() {
    return `
      <div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Contact" hidden>
        <div class="menu__backdrop" data-close></div>
        <div class="menu__panel">
          <div class="menu__top">
            <button class="menu__close" type="button" data-close>
              <span class="menu__close-label">Close</span>
              <span class="menu__close-icon"><span class="menu__close-dot"></span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <line class="l1" x1="5" y1="7" x2="19" y2="7"/><line class="l2" x1="5" y1="12" x2="19" y2="12"/><line class="l3" x1="5" y1="17" x2="19" y2="17"/>
                </svg></span>
            </button>
          </div>
          <nav class="menu__links hover-dim">
            ${C.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join("")}
            <a href="mailto:${C.email}">Mail</a>
          </nav>
          <div class="menu__bottom">
            <a href="mailto:${C.email}">${C.email}</a>
          </div>
        </div>
      </div>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="site-footer__row">
          <p class="site-footer__name">Vitalii</p>
          <div class="site-footer__side">
            <a class="site-footer__cta" href="mailto:${C.email}">
              <span>Let's work together<br>${C.email}</span>${icon.arrow}
            </a>
            <nav class="site-footer__links hover-dim">
              ${C.links.map(l => `<a class="nav-link" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join("")}
            </nav>
            ${socials("site-footer__icons")}
          </div>
        </div>
      </footer>`;
  }

  const slot = n => document.querySelector(`[data-slot="${n}"]`);
  // хэдер закреплён сверху; место под ним держит пустой блок той же высоты, чтобы вёрстка не съезжала
  if (slot("header")) slot("header").outerHTML = `<div class="site-header-spacer">${header()}</div>`;
  // при скролле — фон чёрный 50% и размытие под хэдером
  const hdr = document.querySelector(".site-header");
  if (hdr) {
    const stuck = () => hdr.classList.toggle("is-stuck", scrollY > 0);
    addEventListener("scroll", stuck, { passive: true }); stuck();
  }
  /* Фоновая предзагрузка обложек (~7 МБ): когда страница загрузилась, по одной и с низким
     приоритетом кладём в кэш остальные — при переходе на вкладку картинки уже на месте. */
  addEventListener("load", () => {
    const queue = [...new Set(P.map(p => window.COVERS_DIR + p.cover))];
    const next = () => {
      const src = queue.shift(); if (!src) return;
      const img = new Image(); img.fetchPriority = "low";
      img.onload = img.onerror = () => (window.requestIdleCallback || setTimeout)(next);
      img.src = src;
    };
    next();
  });

  /* «Scroll down» (главная, страницы проектов): прозрачность зависит от прокрутки —
     гаснет за первые HINT_FADE px, при возврате наверх проявляется. Надпись может появиться позже (project.js) —
     ищем её при каждом вызове; после отрисовки страница вызывает fadeScrollHint() сама. */
  const HINT_FADE = 240;
  window.fadeScrollHint = () => {
    const hint = document.querySelector(".scroll-hint");
    if (!hint) return;
    const o = Math.max(0, 1 - scrollY / HINT_FADE);
    hint.style.opacity = o;
    hint.style.visibility = o ? "" : "hidden";   // погасла — не кликается и не ловит фокус
  };
  addEventListener("scroll", fadeScrollHint, { passive: true });

  /* Клик по «Scroll down» — плавная прокрутка к якорю вместо прыжка (ease-in-out, ~1 с).
     Колесо / тач во время анимации её прерывают. При reduced motion — обычный переход. */
  document.addEventListener("click", e => {
    const link = e.target.closest(".scroll-hint");
    const target = link && document.querySelector(link.getAttribute("href"));
    if (!target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    const from = scrollY, to = target.getBoundingClientRect().top + scrollY, dist = to - from;
    const DUR = Math.min(1200, 600 + Math.abs(dist) * 0.4), t0 = performance.now();
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let stop = false;
    const cancel = () => { stop = true; };
    ["wheel", "touchstart", "keydown"].forEach(ev => addEventListener(ev, cancel, { once: true, passive: true }));
    const step = now => {
      if (stop) return;
      const t = Math.min(1, (now - t0) / DUR);
      scrollTo(0, from + dist * ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  if (slot("footer")) slot("footer").outerHTML = footer();
  /* About: кнопка CV + почта + соцсети */
  if (slot("socials")) slot("socials").outerHTML = socials("socials socials--about",
    `<a class="pill pill--solid pill--dark" href="${C.cv}" download>Download CV</a>
     <a class="round-btn" href="mailto:${C.email}" aria-label="Email">${icon.mail}</a>`);
  document.body.insertAdjacentHTML("beforeend", menu());

  /* Меню: открыть / закрыть, Esc, возврат фокуса.
     Открытие: белый фон кнопки Contact растягивается в панель (clip-path от рамки кнопки до всей панели),
     бургер на месте кнопки превращается в крестик, под ним вырастает чёрный кружок,
     пункты появляются по очереди. Закрытие — то же в обратную сторону, панель сжимается обратно в кнопку. */
  const m = document.getElementById("menu");
  const panel = m.querySelector(".menu__panel"), closeIcon = m.querySelector(".menu__close-icon");
  const noMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const EASE = "cubic-bezier(0.76, 0, 0.24, 1)", EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
  let opener = null, closing = null;

  // рамка кнопки Contact в координатах панели — отсюда растёт и сюда сжимается фон
  function fromButton() {
    const b = opener.getBoundingClientRect(), p = panel.getBoundingClientRect();
    const clip = `inset(${b.top - p.top}px ${p.right - b.right}px ${p.bottom - b.bottom}px ${b.left - p.left}px round ${b.height / 2}px)`;
    // сдвиг иконки: чтобы крестик начинался ровно на месте бургера кнопки
    const bi = opener.querySelector("svg").getBoundingClientRect(), ci = closeIcon.getBoundingClientRect();
    const shift = `translate(${bi.left + bi.width / 2 - ci.left - ci.width / 2}px, ${bi.top + bi.height / 2 - ci.top - ci.height / 2}px)`;
    return { clip, shift };
  }
  const full = `inset(0px 0px 0px 0px round 24px)`;
  const stop = () => m.getAnimations({ subtree: true }).forEach(a => a.cancel());
  const items = () => [...m.querySelectorAll(".menu__links > a, .menu__bottom > *")];

  function open(btn) {
    opener = btn; closing = null; stop();
    m.hidden = false; document.body.classList.add("no-scroll");
    m.querySelector(".menu__close").focus({ preventScroll: true });
    if (noMotion.matches) { m.classList.add("is-x"); return; }
    const { clip, shift } = fromButton();
    m.classList.remove("is-x");
    panel.animate([{ clipPath: clip }, { clipPath: full }], { duration: 650, easing: EASE });
    closeIcon.animate([{ transform: shift }, { transform: "none" }], { duration: 650, easing: EASE });
    m.querySelector(".menu__backdrop").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: "ease" });
    m.querySelector(".menu__close-label").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 350, fill: "backwards" });
    // пункты — по очереди, но быстро
    items().forEach((el, i) => el.animate(
      [{ opacity: 0, transform: "translateY(40px)" }, { opacity: 1, transform: "none" }],
      { duration: 500, delay: 280 + i * 45, easing: EASE_OUT, fill: "backwards" }));
    setTimeout(() => { if (!closing && !m.hidden) m.classList.add("is-x"); }, 220);
  }

  function close() {
    if (m.hidden || closing) return;
    const done = () => { m.hidden = true; m.classList.remove("is-x"); document.body.classList.remove("no-scroll"); opener && opener.focus({ preventScroll: true }); };
    if (noMotion.matches) return done();
    stop();
    const { clip, shift } = fromButton();
    m.classList.remove("is-x");   // крестик → бургер, кружок уходит
    items().forEach(el => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: "forwards" }));
    m.querySelector(".menu__close-label").animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
    m.querySelector(".menu__backdrop").animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 150, fill: "forwards" });
    closeIcon.animate([{ transform: "none" }, { transform: shift }], { duration: 550, delay: 150, easing: EASE, fill: "forwards" });
    closing = panel.animate([{ clipPath: full }, { clipPath: clip }], { duration: 550, delay: 150, easing: EASE, fill: "forwards" });
    const me = closing;
    me.finished.then(() => { if (closing !== me) return; closing = null; done(); stop(); }, () => {});
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest(".menu-open");
    if (btn) open(btn);
    else if (e.target.closest("[data-close]") || e.target.closest(".menu__links a")) close();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !m.hidden) close(); });

  /* Выпадающий список категорий (iPad / мобильный): клик вне списка и Esc закрывают */
  const sel = document.querySelector(".tab-select");
  if (sel) {
    const btn = sel.querySelector(".tab-select__btn"), list = sel.querySelector(".tab-select__list");
    /* Раскрытие как у меню: список вырастает из-под кнопки (ширина кнопки → своя, высота 0 → полная),
       пункты появляются по очереди; закрытие — обратно под кнопку */
    let shut = null;
    const collapsed = () => {
      const side = Math.max(0, (list.offsetWidth - btn.offsetWidth) / 2);
      return `inset(0px ${side}px ${list.offsetHeight}px ${side}px round 21px)`;
    };
    const opened = "inset(0px 0px 0px 0px round 20px)";
    const toggle = open => {
      if (open === sel.classList.contains("is-open")) return;
      btn.setAttribute("aria-expanded", open); sel.classList.toggle("is-open", open);
      list.getAnimations({ subtree: true }).forEach(a => a.cancel()); shut = null;
      if (open) {
        list.hidden = false;
        if (noMotion.matches) return;
        list.animate([{ clipPath: collapsed() }, { clipPath: opened }], { duration: 450, easing: EASE });
        [...list.children].forEach((li, i) => li.animate(
          [{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "none" }],
          { duration: 350, delay: 120 + i * 40, easing: EASE_OUT, fill: "backwards" }));
      } else {
        if (noMotion.matches) { list.hidden = true; return; }
        [...list.children].forEach(li => li.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, fill: "forwards" }));
        const a = shut = list.animate([{ clipPath: opened }, { clipPath: collapsed() }], { duration: 350, delay: 60, easing: EASE, fill: "forwards" });
        a.finished.then(() => { if (shut !== a) return; shut = null; list.hidden = true; list.getAnimations({ subtree: true }).forEach(x => x.cancel()); }, () => {});
      }
    };
    const isOpen = () => sel.classList.contains("is-open");
    btn.addEventListener("click", () => toggle(!isOpen()));
    // клик мимо открытого списка только закрывает его — то, что под пальцем (плитка, ссылка), не срабатывает
    addEventListener("click", e => {
      if (!isOpen() || sel.contains(e.target)) return;
      e.preventDefault(); e.stopPropagation();
      toggle(false);
    }, true);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && isOpen()) { toggle(false); btn.focus(); } });
  }
  /* Плашка активной вкладки (шапка и фильтры на Work): едет к новой вкладке — тянется вперёд,
     у цели сжимается и выравнивается. Возвращает { links, active, place, slide }. */
  const SLIDE_DUR = 600;
  window.tabSlider = function (nav) {
    const links = [...nav.querySelectorAll(".tab")];
    const pill = document.createElement("div");
    pill.className = "tabs__pill"; pill.setAttribute("aria-hidden", "true");
    pill.innerHTML = links.map(a => `<span class="tab">${a.textContent}</span>`).join("");
    nav.append(pill);
    const active = () => links.find(a => a.classList.contains("is-active"));
    const edges = a => ({ l: a.offsetLeft, r: a.offsetLeft + a.offsetWidth });
    const clip = (l, r) => `inset(4px ${nav.clientWidth - r}px 4px ${l}px round 100px)`;
    const place = () => { const a = active(); pill.style.clipPath = a ? clip(edges(a).l, edges(a).r) : "inset(50%)"; };
    place();
    if (document.fonts) document.fonts.ready.then(place);
    addEventListener("resize", place);
    const slide = (from, to, t = 0) => {
      const a = edges(from), b = edges(to), dir = b.l > a.l ? 1 : -1;
      const squeeze = 14 * dir;   // насколько хвост проскакивает цель
      // ведущий край уходит первым, хвост догоняет: растяжение → сжатие у цели → норма
      const frames = dir > 0
        ? [[a.l, a.r], [a.l + (b.l - a.l) * 0.15, a.r + (b.r - a.r) * 0.75], [b.l + squeeze, b.r], [b.l, b.r]]
        : [[a.l, a.r], [a.l + (b.l - a.l) * 0.75, a.r + (b.r - a.r) * 0.15], [b.l, b.r + squeeze], [b.l, b.r]];
      pill.style.clipPath = clip(b.l, b.r);
      const anim = pill.animate(frames.map(([l, r], i) => ({ clipPath: clip(l, r), offset: [0, 0.4, 0.75, 1][i] })),
        { duration: SLIDE_DUR, easing: "cubic-bezier(0.45, 0, 0.25, 1)" });
      anim.currentTime = t;
    };
    return { links, active, place, slide };
  };

  /* Шапка: пункты — разные страницы, поэтому переход по ссылке после половины анимации */
  const tabsNav = document.querySelector(".tabs--header");
  if (tabsNav) {
    const { links, active, place, slide } = tabSlider(tabsNav);
    // «назад» из кэша браузера — вернуть плашку на пункт этой страницы
    addEventListener("pageshow", e => {
      if (!e.persisted) return;
      links.forEach(l => l.classList.toggle("is-active", l.dataset.tab === activeTab));
      place();
    });

    const NAV_AT = 300;   // переход по ссылке — на середине, вторая половина доигрывается на новой странице
    // пришли с другого пункта — доигрываем анимацию с того места, где ушли со старой страницы
    let handoff = null;
    try { handoff = JSON.parse(sessionStorage.getItem("tabSlide")); sessionStorage.removeItem("tabSlide"); } catch (e) {}
    const fromTab = handoff && links.find(l => l.dataset.tab === handoff.from);
    // сразу, до первой отрисовки — иначе мелькнёт плашка уже на месте
    // всегда с середины (а не по часам): даже если страница грузилась долго, сжатие и выравнивание видны целиком
    if (fromTab && handoff.to === activeTab && active() && Date.now() - handoff.at < 1500)
      slide(fromTab, active(), NAV_AT);

    tabsNav.addEventListener("click", e => {
      const to = e.target.closest(".tab"), from = active();
      if (!to || !from || to === from || noMotion.matches || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      links.forEach(l => l.classList.toggle("is-active", l === to));
      slide(from, to);
      try { sessionStorage.setItem("tabSlide", JSON.stringify({ from: from.dataset.tab, to: to.dataset.tab, at: Date.now() })); } catch (e) {}
      setTimeout(() => { location.href = to.href; }, NAV_AT);
    });
  }

  /* Старый адрес contact.html ведёт сюда с #contact — сразу открыть панель контактов */
  if (location.hash === "#contact") {
    history.replaceState(null, "", location.pathname + location.search);
    open(document.querySelector(".menu-open"));
  }

  /* Открытие проекта: картинка плитки плавно расширяется до hero страницы проекта, страница под ней уходит в чёрный,
     в конце — переход. Плитки: сетка Work (.tile), Other Works (.tile).
     На странице проекта hero показывается сразу, без проявления (project.js читает "heroFly"). Закрытие — без анимации. */
  const HERO_DUR = 700;
  // где будет hero: невидимая копия .project-hero под шапкой — размеры берутся из того же CSS
  function heroRect() {
    const probe = document.createElement("section");
    probe.className = "project-hero";
    probe.style.cssText = `position:fixed;left:0;right:0;top:${document.querySelector(".site-header-spacer")?.offsetHeight || 0}px;visibility:hidden;pointer-events:none`;
    probe.innerHTML = '<div class="media"></div>';
    document.body.append(probe);
    const r = probe.firstChild.getBoundingClientRect(), radius = getComputedStyle(probe.firstChild).borderRadius;
    probe.remove();
    return { r, radius };
  }
  let flying = null;
  document.addEventListener("click", e => {
    const a = e.target.closest('a.tile[href^="project.html"]');
    const box = a && a.querySelector(".media"), img = box && box.querySelector("img.cover");
    if (!img || flying || noMotion.matches || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    e.preventDefault();
    const id = new URL(a.href).searchParams.get("id");
    fetch("js/projects/" + id + ".js").catch(() => {});   // прогреваем контент страницы, пока идёт анимация

    const s = box.getBoundingClientRect(), { r, radius } = heroRect();
    const fly = document.createElement("div");
    fly.className = "hero-fly";
    fly.innerHTML = '<div class="hero-fly__bg"></div><div class="hero-fly__box"></div>';
    // переносим саму картинку плитки (копия на первых кадрах ещё не отрисована — мелькает чёрным)
    const flyBox = fly.lastChild, from = getComputedStyle(img).transform, clone = img;
    flyBox.classList.add("is-loaded");   // чтобы img[data-reveal] оставалась видимой
    flyBox.append(img);
    document.body.append(fly);
    flying = { fly, box, img };

    flyBox.animate([
      { left: s.left + "px", top: s.top + "px", width: s.width + "px", height: s.height + "px", borderRadius: getComputedStyle(box).borderRadius },
      { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: radius }
    ], { duration: HERO_DUR, easing: EASE, fill: "forwards" });
    // плитка могла быть увеличена ховером — начинаем с того же масштаба
    clone.animate([{ transform: from }, { transform: "none" }], { duration: HERO_DUR, easing: EASE, fill: "forwards" });
    fly.firstChild.animate([{ opacity: 0 }, { opacity: 1 }], { duration: HERO_DUR * 0.6, easing: "ease", fill: "forwards" });
    try { sessionStorage.setItem("heroFly", JSON.stringify({ id, at: Date.now() })); } catch (e) {}
    setTimeout(() => { location.href = a.href; }, HERO_DUR);
  });
  // стык со страницей проекта (View Transitions) — только для полёта; все остальные переходы без анимации
  addEventListener("pageswap", e => { if (e.viewTransition && !flying) e.viewTransition.skipTransition(); });
  // «назад» из кэша браузера — убрать летящую копию, вернуть плитку
  addEventListener("pageshow", e => {
    if (!e.persisted || !flying) return;
    flying.img.getAnimations().forEach(x => x.cancel());
    flying.box.prepend(flying.img); flying.fly.remove(); flying = null;
  });
})();
