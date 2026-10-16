/*
 * Страница проекта: project.html?id=...
 * Контент берётся из js/projects/<id>.js (PAGES[id]). Если файла нет —
 * показывается шаблон с обложкой и summary.
 *
 * Шапка страницы: heading, text: [абзацы], meta: [{ label, value: [] }],
 *   links: [{ label, href, style: "solid" | "outline" }]   — кнопки под текстом (необязательно)
 *
 * Типы блоков (blocks):
 *   { full: MEDIA }                    — на всю ширину, 16:9 (1392×780 в макете)
 *   { row: [CELL, CELL] }              — две половины, квадраты 688×688
 *   { triple: [CELL, CELL, CELL] }     — три квадрата в ряд
 *   { statement: "текст" }             — крупный текст по центру между блоками
 *   { statement: "текст", title: "Заголовок" } — то же с заголовком над текстом
 *   { compare: { before: "bad.png", after: "good.png" } } — на всю ширину, ползунок до/после
 *   { metrics: [{ value, label }] }    — цифры в ряд (4 колонки): крупное значение + подпись
 *   { tweets: { title, items: [{ url, name, handle, avatar, photo, text }] } } — What People Say, карусель твитов; dark: true — на тёмном фоне; video: true — на фото значок Play (видео открывается в X); 1–2 твита — без карусели
 * CELL:
 *   MEDIA                              — картинка / gif / svg / видео
 *   { title, text, link }              — текстовая ячейка с кнопкой «View more» (link = id проекта)
 *                                        text — строка или массив абзацев; без link — без кнопки; без title — только текст
 *   { tokens: { dir: "tokens/", count: 64 } } — соты иконок как на Apple Watch (js/tokens.js), файлы token01.svg…
 *   { cover: "id" }                    — обложка проекта id из assets/covers (тот же файл, что везде)
 *   { stack: [MEDIA, MEDIA] }          — две картинки друг над другом (h = высоты из макета, необязательно)
 *   { cols: [{ stack, w }, ...] }      — несколько столбиков со стеками внутри половины
 * MEDIA:
 *   { file: "x.webp" }                 — обычная картинка
 *   { file: "x.gif" }  / { file: "x.svg" }   — тип определяется по расширению
 *   { video: "https://…/x.mp4", play: "auto" }   — автоплей, без звука, по кругу
 *   { video: "https://…/x.mp4", play: "click" }  — с кнопкой Play
 *   { cubes: "x.svg" }                — кубики из SVG, отталкиваются от курсора (js/cubes.js)
 *   clock: { hour, minute, second, center } — SVG-часы показывают реальное время (js/clock.js)
 *   caption: "…"                       — подпись внизу ячейки
 *   kind: "img|gif|svg|video"          — можно указать явно
 */
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const idx = Math.max(0, PROJECTS.findIndex(p => p.id === id));
  const p = PROJECTS[idx];
  document.title = p.title + " — Vitalii Menshenin";

  // hero — сразу, не дожидаясь контента страницы: на него приземляется картинка из плитки (layout.js)
  const root = document.getElementById("project");
  root.innerHTML = `
      <section class="project-hero">
        <div class="media">${coverImg(p, { eager: true })}</div>
        <a class="round-btn project-hero__close" href="work.html?cat=${p.category}" aria-label="Back to projects">${ICON.close}</a>
        <a class="scroll-hint" href="#project-intro">Scroll down ${ICON.scroll}</a>
      </section>`;
  fadeScrollHint();
  let fly = null;
  try { fly = JSON.parse(sessionStorage.getItem("heroFly")); sessionStorage.removeItem("heroFly"); } catch (e) {}
  let heroImg = null;
  if (fly && fly.id === p.id && Date.now() - fly.at < 3000) {
    // пришли из плитки — картинка уже на месте, без проявления, иначе мелькнёт
    heroImg = root.querySelector(".project-hero img");
    heroImg.removeAttribute("data-reveal"); heroImg.parentNode.classList.add("is-loaded");
  }
  // стык страниц (View Transitions, CSS в style.css): снимок старой страницы держится, пока hero не отрисован
  addEventListener("pagereveal", e => {
    if (!e.viewTransition) return;
    if (!heroImg) return e.viewTransition.skipTransition();
    const done = () => document.getAnimations().forEach(a => {
      if ((a.effect && a.effect.pseudoElement || "").startsWith("::view-transition")) a.finish();
    });
    e.viewTransition.ready.then(() => heroImg.decode()).then(done, done);
  });

  const s = document.createElement("script");
  s.src = "js/projects/" + p.id + ".js";
  s.onload = s.onerror = () => render(PAGES[p.id]);
  document.head.appendChild(s);

  function render(page) {
    page = page || {
      heading: p.title, text: [p.summary], meta: [],
      blocks: [{ row: [{}, {}] }, { full: {} }]
    };
    page.links = page.links || p.links;
    const dir = MEDIA_DIR + p.id + "/";
    const others = [1, 2, 3, 4].map(k => PROJECTS[(idx + k) % PROJECTS.length]);

    root.insertAdjacentHTML("beforeend", `
      <section class="project-intro" id="project-intro">
        <h1 class="project-intro__title">${page.heading}</h1>
        <div class="project-intro__body">
          ${page.text.map(t => `<p>${t}</p>`).join("")}
          ${page.meta.length ? `<dl class="project-meta">${page.meta.map(m =>
            `<div><dt>${m.label}</dt>${m.value.map(v => `<dd>${v}</dd>`).join("")}</div>`).join("")}</dl>` : ""}
          ${page.links && page.links.length ? `<div class="project-links">${page.links.map(l =>
            `<a class="pill pill--${l.style === "outline" ? "outline" : "solid pill--plain"}" href="${l.href}"
              ${/^https?:/.test(l.href) ? 'target="_blank" rel="noopener"' : ""}>${l.label}</a>`).join("")}</div>` : ""}
        </div>
      </section>

      <div class="blocks">${page.blocks.map(block).join("")}
      </div>

      <section class="other-works">
        <h2 class="other-works__title">Other Works</h2>
        <div class="other-works__row">${others.map(o => `
          <a class="tile" href="project.html?id=${o.id}">
            <div class="media">${coverImg(o)}</div>
            <p class="tile__title">${o.title}</p>
          </a>`).join("")}
        </div>
      </section>`);
    initVideos(document.getElementById("project"));
    if (window.initTokens) initTokens(document.getElementById("project"));
    if (window.initCubes) initCubes(document.getElementById("project"));
    if (window.initClock) initClock(document.getElementById("project"));
    initCompare(document.getElementById("project"));
    initMetrics(document.getElementById("project"));

    function block(b) {
      if (b.full) return `<div class="block block--full">${media(b.full, dir)}</div>`;
      if (b.tweets) return tweets(b.tweets);
      if (b.metrics) return `<div class="block block--metrics">${b.metrics.map(m =>
        `<div class="metric"><p class="metric__value">${m.value}</p><p class="metric__label">${m.label}</p></div>`).join("")}</div>`;
      if (b.statement) return `<div class="block block--statement"><div>${b.title ? `<h2>${b.title}</h2>` : ""}<p>${b.statement}</p></div></div>`;
      if (b.compare) return `<div class="block block--full">${compare(b.compare, dir)}</div>`;
      if (b.triple) return `<div class="block block--triple">${b.triple.map(c => cell(c, dir)).join("")}</div>`;
      return `<div class="block block--row">${b.row.map(c => cell(c, dir)).join("")}</div>`;
    }
  }

  /* What People Say: светлая полоса во всю ширину, карточки твитов листаются по горизонтали.
     Картинки и аватары грузятся с pbs.twimg.com — на сайте не хранятся. */
  function tweets(t) {
    const arrow = d => `<button class="round-btn tweets__arrow" type="button" data-dir="${d}" aria-label="${d < 0 ? "Previous" : "Next"}">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}"/></svg></button>`;
    const fixed = t.items.length <= 2;   // 1–2 твита: просто в ширину контента, без карусели и стрелок
    return `<section class="block block--tweets ${t.dark ? "tweets--dark" : "light"}${fixed ? " tweets--fixed" : ""}">
      <div class="tweets__head"><h2 class="tweets__title">${t.title}</h2>${fixed ? "" : `<div class="tweets__nav">${arrow(-1)}${arrow(1)}</div>`}</div>
      <div class="tweets__track">${t.items.map(i => `
        <article class="tweet">
          <header class="tweet__head">
            <img class="tweet__avatar" src="${i.avatar}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.visibility='hidden'">
            <div class="tweet__who"><p class="tweet__name">${i.name}</p><p class="tweet__handle">@${i.handle}</p></div>
            <a class="tweet__open" href="${i.url}" target="_blank" rel="noopener">Open in X</a>
          </header>
          <p class="tweet__text">${i.text}</p>
          ${i.photo ? `<a class="tweet__photo" href="${i.url}" target="_blank" rel="noopener" tabindex="-1">
            <img src="${i.photo}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">${i.video ? `<span class="tweet__play" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>` : ""}</a>` : ""}
        </article>`).join("")}
      </div>
    </section>`;
  }
  // стрелки карусели: листаем на ширину одной карточки
  document.addEventListener("click", e => {
    const btn = e.target.closest(".tweets__arrow");
    if (!btn) return;
    const track = btn.closest(".block--tweets").querySelector(".tweets__track");
    const card = track.querySelector(".tweet");
    track.scrollBy({ left: +btn.dataset.dir * (card.offsetWidth + 16), behavior: "smooth" });
  });

  /* Цифры (metrics) — «однорукий бандит»: каждый символ (цифры, $, M, +…) — барабан со случайной лентой,
     которая заканчивается нужным символом. Как только блок показался в экране хоть краем, все барабаны
     крутятся разом и встают по очереди: метрика за метрикой (слева направо), внутри — символ за символом.
     Один раз за заход на страницу. Ширину барабана задаёт невидимая копия итогового символа — вёрстка
     не прыгает; в конце возвращается обычный текст. */
  function initMetrics(root) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const POOL = "0123456789$+KMB";
    const esc = ch => ({ "&": "&amp;", "<": "&lt;" })[ch] || ch;
    root.querySelectorAll(".block--metrics").forEach(box => {
      const values = [...box.querySelectorAll(".metric__value")];
      values.forEach((v, i) => {
        const text = v.textContent;
        v.dataset.text = text;
        v.setAttribute("aria-label", text);
        v.innerHTML = [...text].map(ch => {
          if (ch === " ") return " ";
          const n = 8 + i * 3;                                     // дальние метрики крутятся дольше
          const strip = Array.from({ length: n }, () => POOL[Math.random() * POOL.length | 0]).concat(ch);
          return `<span class="reel" aria-hidden="true" data-n="${n}"><span class="reel__sizer">${esc(ch)}</span>` +
            `<span class="reel__strip">${strip.map(c => `<span>${esc(c)}</span>`).join("")}</span></span>`;
        }).join("");
      });
      new IntersectionObserver(([e], io) => {
        if (!e.isIntersecting) return;
        io.disconnect();                                           // только один раз
        values.forEach((v, i) => {
          let last = 0;
          v.querySelectorAll(".reel").forEach((r, j) => {
            const strip = r.querySelector(".reel__strip");
            const dur = 470 + i * 150 + j * 30;                     // остановка: метрика +150 мс, символ +30 мс
            last = Math.max(last, dur);
            strip.style.transition = `transform ${dur}ms cubic-bezier(0.15, 0.85, 0.3, 1.08)`;
            requestAnimationFrame(() => requestAnimationFrame(() => { strip.style.transform = `translateY(${-r.dataset.n}lh)`; }));
          });
          setTimeout(() => { v.textContent = v.dataset.text; v.removeAttribute("aria-label"); }, last + 100);
        });
      }).observe(box);                                             // threshold 0 — старт с первого видимого пикселя
    });
  }

  /* До / после: две картинки одна над другой, «после» открывается ползунком (мышь, палец, стрелки) */
  function compare(c, dir) {
    const img = (f, cls) => `<img class="cover compare__${cls}" src="${dir + f}" alt="" loading="lazy" decoding="async"
      data-reveal onload="revealImg(this, this.closest('.media'))" onerror="this.style.visibility='hidden'">`;
    return `<div class="media compare" style="--pos:50%" role="slider" tabindex="0" aria-label="Before / after"
      aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">${img(c.before, "before")}${img(c.after, "after")}
      <span class="compare__handle" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></span></div>`;
  }
  function initCompare(root) {
    root.querySelectorAll(".compare").forEach(box => {
      const set = p => { p = Math.max(0, Math.min(100, p)); box.style.setProperty("--pos", p + "%"); box.setAttribute("aria-valuenow", Math.round(p)); };
      const at = e => { const r = box.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
      let drag = false;
      box.addEventListener("pointerdown", e => { drag = true; try { box.setPointerCapture(e.pointerId); } catch (_) {} at(e); });
      box.addEventListener("pointermove", e => { if (drag) at(e); });
      ["pointerup", "pointercancel"].forEach(t => box.addEventListener(t, () => { drag = false; }));
      box.addEventListener("keydown", e => {
        const d = { ArrowLeft: -5, ArrowRight: 5 }[e.key];
        if (d) { e.preventDefault(); set(+box.getAttribute("aria-valuenow") + d); }
      });
    });
  }

  function cell(c, dir) {
    if (c.title || c.text) {
      const target = PROJECTS.find(x => x.id === c.link);
      return `<div class="cell cell--text">
        <div class="cell__text">
          ${c.title ? `<h2>${c.title}</h2>` : ""}${[].concat(c.text).map(t => `<p>${t}</p>`).join("")}
          ${target ? `<a class="pill pill--solid pill--plain" href="project.html?id=${target.id}">View more</a>` : ""}
        </div></div>`;
    }
    if (c.tokens) return `<div class="cell">${tokensHTML(c.tokens, dir)}</div>`;   // соты иконок, js/tokens.js
    if (c.cover) {                      // обложка другого проекта из assets/covers (тот же файл, без дубля)
      const cp = PROJECTS.find(x => x.id === c.cover);
      return `<div class="cell"><div class="media">${cp ? coverImg(cp) : ""}</div></div>`;
    }
    if (c.stack) return `<div class="cell cell--stack">${stack(c.stack, dir)}</div>`;
    if (c.cols) return `<div class="cell cell--cols">${c.cols.map(col =>
      `<div class="cell--stack" style="flex:${col.w || 1}">${stack(col.stack, dir)}</div>`).join("")}</div>`;
    return `<div class="cell">${media(c, dir)}</div>`;
  }
  function stack(items, dir) {
    return items.map(m => `<div class="stack-item" style="flex:${m.h || 1}">${media(m, dir)}</div>`).join("");
  }
  window.renderMedia = media;
})();

