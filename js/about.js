/* About: барабан навыков в hero.
   Слева неподвижное «Design», справа список слов. Каждые STEP_MS список
   сдвигается на одно слово вверх (шагом, с паузой), центральное слово белое,
   остальные гаснут по мере удаления от центра. */
(function () {
  const WORDS = ["Direction", "Systems", "Leadership", "Products", "Brand", "Interface",
                 "Tokens", "Identity", "Teams", "Culture", "Workflows", "Tools", "AI"];
  const STEP_MS = 900;                         // пауза между шагами
  const FADE = [1, 0.5, 0.4, 0.3, 0.2, 0.1];   // прозрачность по расстоянию от центра (как в макете)
  const list = document.getElementById("skills");
  const items = WORDS.concat(WORDS);           // двойной круг: перескок с края на край невидим
  const N = items.length;
  list.innerHTML = items.map(w => `<li>${w}</li>`).join("");
  const els = [...list.children];
  let current = 0;

  function place(animate) {
    els.forEach((el, i) => {
      let d = (i - current) % N;                // позиция относительно центра, в пределах ±N/2
      if (d > N / 2) d -= N;
      if (d < -N / 2) d += N;
      const far = Math.abs(d) >= FADE.length;
      // слово, перескакивающее с верха вниз, двигаем без анимации — оно невидимо
      const jump = Math.abs(d - (el._d ?? d)) > 1;
      el.style.transition = animate && !jump ? "" : "none";
      el.style.transform = `translateY(calc(${d} * var(--skill-step) - 50%))`;
      el.style.opacity = far ? 0 : FADE[Math.abs(d)];
      el._d = d;
    });
  }
  place(false);

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(() => {
    if (document.hidden) return;               // фоновая вкладка — не крутим
    current = (current + 1) % N;
    place(true);
  }, STEP_MS);
})();

/* About hero: шлейф из обложек за курсором (те же картинки, что в волне на главной).
   Мышь прошла GAP px — у курсора появляется следующая обложка, держится и гаснет.
   Только мышь (на тач-экранах нет курсора) и без reduced-motion. Слой под словами. */
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const GAP = 110;        // px пути мыши между картинками
  const MAX = 12;         // больше картинок одновременно не держим
  const HOLD = 450;       // мс картинка стоит до начала исчезания
  const hero = document.querySelector(".skills");
  const layer = document.createElement("div");
  layer.className = "trail";
  layer.setAttribute("aria-hidden", "true");
  hero.prepend(layer);

  const srcs = PROJECTS.map(p => [COVERS_SQ_DIR + p.cover, "50% 50%"]);   // квадраты 600×600 (assets/covers-sq)
  let n = 0, last = null, loaded = false;

  hero.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    if (!loaded) { srcs.forEach(([s]) => { new Image().src = s; }); loaded = true; }   // прогрев кэша
    const r = layer.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (last && Math.hypot(x - last.x, y - last.y) < GAP) return;
    last = { x, y };
    spawn(x, y);
  });
  hero.addEventListener("pointerleave", () => { last = null; });

  function spawn(x, y) {
    const [src, focus] = srcs[n++ % srcs.length];
    const img = document.createElement("img");
    img.className = "trail__img";
    img.src = src; img.alt = ""; img.decoding = "async";
    img.style.cssText = `left:${x}px;top:${y}px;object-position:${focus}`;
    layer.appendChild(img);
    while (layer.children.length > MAX) layer.firstChild.remove();
    img.animate(
      [{ transform: "translate(-50%,-50%) scale(0.4)", opacity: 0 },
       { transform: "translate(-50%,-50%) scale(1)", opacity: 1 }],
      { duration: 350, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" });
    img.animate(
      [{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
       { transform: "translate(-50%,-50%) scale(0.85)", opacity: 0 }],
      { duration: 380, delay: HOLD, easing: "ease-in", fill: "forwards" }
    ).finished.then(() => img.remove(), () => {});
  }
})();
