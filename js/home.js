/* Главная: барабан + большие карточки. Всё из PROJECTS. */
(function () {
  document.getElementById("scroll-icon").innerHTML = ICON.scroll;
  fadeScrollHint();   // «Scroll down» гаснет при прокрутке — layout.js

  /* --- Hero: лента квадратных обложек ---
     Карточки медленно едут справа налево, а линия изгибается волной, которая
     сама плавно колышется в ту же сторону. Обложки те же файлы, что и везде (квадрат = CSS-обрезка).
     Карточек — кратно числу проектов, чтобы порядок не ломался на стыке;
     повторы не догружают ничего нового.
     При первом заходе (в этой вкладке) лента влетает из-за правого края: быстро, с плавной остановкой. */
  const SPEED = -26;         // px/с, минус — движение влево
  const INTRO = 1600;        // мс, влёт ленты справа при первом заходе
  const introEase = p => 1 - Math.pow(1 - p, 4);   // ease-out: быстро → медленно
  const AMP = 0.35;          // амплитуда волны в долях размера карточки (≈55px на 1440)
  const WAVE = 8.7;          // длина волны в размерах карточки (≈1560px на 1440)
  const SWAY = 0.12;         // колыхание волны, полных колебаний в секунду
  /* Курсор у краёв экрана управляет лентой: у левого — едет назад, у правого — разгоняется.
     В центре (EDGE_DEAD) ничего не меняется; к самому краю влияние плавно растёт до максимума. */
  const EDGE_DEAD = 0.4;     // доля полуширины экрана от центра без эффекта
  const EDGE_BACK = -4;      // множитель скорости у самого левого края (минус — в обратную сторону, как EDGE_FAST)
  const EDGE_FAST = 4;       // множитель скорости у самого правого края
  const EDGE_EASE = 2.5;     // как быстро скорость догоняет цель (больше — резче)
  const track = document.getElementById("drum");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let items = [], size = 0, step = 0, loop = 0, offset = 0, t = 0;
  let speedGoal = 1, speedNow = 1;   // множитель скорости от положения курсора

  function edgeSpeed(clientX) {
    const n = clientX / window.innerWidth * 2 - 1;                       // -1 слева … 1 справа
    const e = Math.min(1, Math.max(0, (Math.abs(n) - EDGE_DEAD) / (1 - EDGE_DEAD)));
    const s = e * e * (3 - 2 * e);                                       // smoothstep
    return 1 + s * ((n < 0 ? EDGE_BACK : EDGE_FAST) - 1);
  }
  /* ОТКЛЮЧЕНО (2026-10-16): разгон у краёв не понравился. Вернуть — раскомментировать две строки.
  addEventListener("pointermove", e => { if (e.pointerType === "mouse") speedGoal = edgeSpeed(e.clientX); });
  document.documentElement.addEventListener("mouseleave", () => { speedGoal = 1; });
  */

  /* Ленту можно промотать вручную: горизонтальный свайп тачпадом, Shift + колесо, палец на телефоне.
     Сдвиг копится в push и плавно добавляется к offset за несколько кадров; после пальца — инерция. */
  const PUSH_EASE = 14;      // как быстро лента догоняет прокрутку (больше — резче)
  const FLING_DECAY = 4;     // как быстро гаснет инерция после свайпа пальцем
  let push = 0, fling = 0;   // px, ещё не применённый сдвиг; px/с, инерция
  const drumEl = document.querySelector(".drum");
  drumEl.addEventListener("wheel", e => {
    const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;   // Shift + колесо мыши = горизонтально
    if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return;   // вертикальный скролл — странице
    e.preventDefault();                                          // и не листаем историю жестом «назад»
    push -= dx * (e.deltaMode === 1 ? 16 : 1);
    fling = 0; start();
  }, { passive: false });

  let touch = null, dragged = false;
  drumEl.addEventListener("pointerdown", e => {
    if (e.pointerType !== "touch") return;
    touch = { x: e.clientX, y: e.clientY, at: performance.now(), dir: null };
    dragged = false; fling = 0;
  });
  drumEl.addEventListener("pointermove", e => {
    if (!touch || e.pointerType !== "touch") return;
    const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
    if (!touch.dir && Math.hypot(dx, dy) > 8) touch.dir = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (touch.dir !== "x") return;
    const now = performance.now(), dt = Math.max(1, now - touch.at) / 1000;
    offset += dx; fling = dx / dt; dragged = true;
    touch.x = e.clientX; touch.y = e.clientY; touch.at = now;
    start();
  });
  const touchEnd = () => { if (touch && performance.now() - touch.at > 100) fling = 0; touch = null; };
  drumEl.addEventListener("pointerup", touchEnd);
  drumEl.addEventListener("pointercancel", () => { touch = null; fling = 0; });
  drumEl.addEventListener("click", e => { if (dragged) { e.preventDefault(); dragged = false; } }, true);   // свайп — не клик по обложке

  function build() {
    const vw = window.innerWidth;
    size = Math.round(Math.min(220, Math.max(120, vw * 0.125)));   // 180 на 1440
    step = size + Math.round(size * 0.09);                         // зазор 16 на 1440
    const need = Math.ceil(vw / step) + 2;
    const count = Math.ceil(need / PROJECTS.length) * PROJECTS.length;
    if (count !== items.length) {
      track.innerHTML = "";
      items = [];
      for (let i = 0; i < count; i++) {
        const p = PROJECTS[i % PROJECTS.length];
        const a = document.createElement("a");
        a.className = "drum__item";
        a.href = "project.html?id=" + p.id;
        // все обложки ленты грузим сразу: те же файлы, что и везде, повторы берутся из кэша
        a.innerHTML = coverImg(p, { eager: i < need, lazy: false, alt: i < PROJECTS.length ? p.title : "" });
        if (i >= PROJECTS.length) a.setAttribute("tabindex", "-1");
        track.appendChild(a);
        items.push(a);
      }
    }
    track.style.setProperty("--size", size + "px");
    loop = items.length * step;
  }

  function layout() {
    const vw = window.innerWidth;
    const k = (2 * Math.PI) / (size * WAVE);
    // влёт: вся лента сдвинута за правый край и съезжает на место (сдвиг после «закольцовки», чтобы не переносилась влево)
    const shift = introWait ? vw + step
      : introAt === null ? 0 : (1 - introEase(Math.min(1, (performance.now() - introAt) / INTRO))) * (vw + step);
    items.forEach((el, i) => {
      // позиция по кругу длиной loop, начиная за левым краем
      const x = ((i * step + offset) % loop + loop) % loop - step + shift;
      const visible = x > -step && x < vw + step;
      el.style.visibility = visible ? "visible" : "hidden";
      if (!visible) return;
      const y = Math.sin(k * (x + size / 2) + t * SWAY * 2 * Math.PI) * AMP * size;
      el.style.transform = `translate3d(${x}px, ${y - size / 2}px, 0)`;
    });
  }

  let last = performance.now();
  /* Позиция ленты переживает переходы по страницам: при уходе сохраняем,
     при возврате продолжаем с того же места (sessionStorage — только эта вкладка). */
  let introAt = null, introWait = false;   // introWait — лента ждёт за краем; introAt — старт влёта
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem("drum") || "null"); } catch (e) {}
  if (saved) { offset = saved.offset; t = saved.t; }
  else if (!reduce.matches) introWait = true;   // первый заход — лента влетит справа
  window.addEventListener("pagehide", () => {
    try { sessionStorage.setItem("drum", JSON.stringify({ offset, t })); } catch (e) {}
  });

  /* Анимация идёт только пока hero на экране: проскроллили вниз — стоит, вернулись — едет дальше */
  let visible = true, running = false;
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);   // после паузы не прыгаем
    last = now;
    if (!reduce.matches) {
      speedNow += (speedGoal - speedNow) * (1 - Math.exp(-EDGE_EASE * dt));   // плавный разгон/торможение
      offset += SPEED * speedNow * dt;
      t += speedNow * dt;                                                    // волна колышется в ту же сторону
    }
    const p = push * (1 - Math.exp(-PUSH_EASE * dt));                        // ручная прокрутка — плавно
    offset += p; push -= p;
    if (!touch && fling) { offset += fling * dt; fling *= Math.exp(-FLING_DECAY * dt); if (Math.abs(fling) < 5) fling = 0; }
    layout();
    running = visible;
    if (running) requestAnimationFrame(frame);
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(frame); } }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); })
    .observe(document.querySelector(".drum"));
  build();
  layout();
  start();
  // влёт стартует, когда обложки готовы (чтобы не летели пустые скелетоны), но не позже 1.2 с
  if (introWait) {
    const ready = Promise.all(items.map(a => a.querySelector("img")).filter(Boolean)
      .map(img => img.decode ? img.decode().catch(() => {}) : null));
    Promise.race([ready, new Promise(r => setTimeout(r, 1200))])
      .then(() => { introWait = false; introAt = performance.now(); });
  }
  window.addEventListener("resize", () => { build(); layout(); });

  /* --- Большие карточки --- */
  document.getElementById("features").innerHTML = PROJECTS.filter(p => p.home).sort((a, b) => a.home - b.home).map(p => `
    <a class="feature" href="project.html?id=${p.id}">
      <div class="media">${coverImg(p)}</div>
      <div class="feature__caption">
        <h2 class="feature__title">${p.homeTitle || p.title}</h2>
        <span class="pill pill--solid pill--plain">View Project</span>
      </div>
    </a>`).join("");

  /* Раскрытие картинок при прокрутке (CSS: .feature --p). Верх карточки входит снизу экрана — 0,
     доходит до REVEAL_END высоты экрана — 1. Кривая — ease-out (к полной ширине доезжает мягко),
     плюс инерция: --p догоняет цель за несколько кадров, поэтому прокрутка колёсиком не даёт ступенек. */
  const REVEAL_END = 0.2;
  const REVEAL_LAG = 0.14;                                // доля пути за кадр (меньше — мягче)
  const revealEase = x => 1 - Math.pow(1 - x, 3);         // ease-out cubic
  const features = [...document.querySelectorAll(".feature")];
  const shown = features.map(() => null);                 // текущее значение --p у каждой карточки
  let revealRaf = 0;
  function reveal() {
    revealRaf = 0;
    const vh = innerHeight;
    let moving = false;
    features.forEach((f, i) => {
      const top = f.getBoundingClientRect().top;
      const x = Math.min(1, Math.max(0, (vh - top) / (vh * (1 - REVEAL_END))));
      const goal = reduce.matches ? 1 : revealEase(x);
      let p = shown[i] === null ? goal : shown[i] + (goal - shown[i]) * REVEAL_LAG;
      if (Math.abs(goal - p) < 0.001) p = goal; else moving = true;
      if (p !== shown[i]) { shown[i] = p; f.style.setProperty("--p", p.toFixed(4)); }
    });
    if (moving) revealRaf = requestAnimationFrame(reveal);
  }
  const queueReveal = () => { if (!revealRaf) revealRaf = requestAnimationFrame(reveal); };
  addEventListener("scroll", queueReveal, { passive: true });
  addEventListener("resize", queueReveal);
  reveal();

  /* --- This is What I Do: аккордеон категорий из SKILLS ---
     Сначала все свёрнуты, открыта максимум одна; клик по другой сворачивает предыдущую.
     Анимации — в CSS (.service-row.is-open): высота, пункты по очереди (--i), шеврон выворачивается. */
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const byId = Object.fromEntries(PROJECTS.map(p => [p.id, p]));
  const skills = document.getElementById("skills");
  skills.innerHTML = SKILLS.map((s, n) => `
    <li class="service-row">
      <button class="service-row__head" type="button" aria-expanded="false" aria-controls="skill-${n}">
        <span class="service-row__name">${esc(s.name)}</span>
        <span class="service-row__icon">${ICON.chevron}</span>
      </button>
      <div class="service-row__body" id="skill-${n}">
        <ul class="service-row__links">${s.projects.filter(id => byId[id]).map((id, i) => `
          <li style="--i:${i}"><a href="project.html?id=${id}">${esc(byId[id].skillTitle || byId[id].title)}</a></li>`).join("")}
        </ul>
      </div>
    </li>`).join("");
  skills.addEventListener("click", e => {
    const head = e.target.closest(".service-row__head");
    if (!head) return;
    const row = head.parentElement, open = !row.classList.contains("is-open");
    skills.querySelectorAll(".service-row.is-open").forEach(r => {
      r.classList.remove("is-open");
      r.querySelector(".service-row__head").setAttribute("aria-expanded", "false");
    });
    if (open) { row.classList.add("is-open"); head.setAttribute("aria-expanded", "true"); }
  });

  /* --- Showreel: по нажатию на Play --- */
  const reel = document.getElementById("showreel");
  reel.innerHTML = media({ video: CONTACTS.showreel, poster: "assets/showreel/poster.jpg", play: "click", kind: "video" });
  initVideos(reel);
})();
