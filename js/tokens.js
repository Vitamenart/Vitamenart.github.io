/* Соты иконок «как на Apple Watch» — ячейка { tokens: { dir, count } } на странице проекта.
 * Иконки лежат шестиугольной сеткой, сетка бесконечно повторяется.
 * Сдвигается против скролла и против курсора; заполняют всю ячейку, у её краёв иконки уменьшаются и пропадают.
 * Настройки — константы ниже. */
(function () {
  const SIZE = 64;                  // размер иконки, px
  const STEP = 88;                  // шаг сетки (центр — центр), px: зазор между иконками 24
  const EDGE = 0.2;                 // зона у края ячейки (доля ширины), где иконки уменьшаются до нуля
  const ROUND = 0.3;                // скругление углов области (доля ширины): к краям доходят, в углах затухают
  const PULL = 0.08;                // насколько уменьшающиеся иконки подтягиваются к центру (мало — доходят до края)
  const MOUSE = 4;                  // сдвиг от курсора, в шагах сетки
  const SCROLL = 0.7;               // сдвиг от скролла (доля прокрутки)
  const EASE = 0.08;                // плавность догоняния (меньше — мягче)

  // иконки создаёт initTokens: их число зависит от размера ячейки
  window.tokensHTML = function (t, dir) {
    return `<div class="media media--tokens" data-tokens="${dir}${t.dir || "tokens/"}" data-count="${t.count || 64}"></div>`;
  };

  window.initTokens = function (root) {
    root.querySelectorAll("[data-tokens]").forEach(box => {
      const base = box.dataset.tokens, n = +box.dataset.count;
      let icons = [], COLS = 0, ROWS = 0;
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const step = STEP, size = SIZE;
      let w = 0, h = 0, visible = false, raf = 0;
      let mx = 0, my = 0;                             // курсор относительно центра, -1…1
      let x = 0, y = 0;                               // текущий сдвиг сетки
      const mod = (a, b) => ((a % b) + b) % b;

      function measure() {
        w = box.clientWidth; h = box.clientHeight;
        // сетка с запасом в 2 шага по краям; ROWS чётное — соты стыкуются при повторе
        const cols = Math.ceil(w / step) + 2, rows = Math.ceil(h / (step * 0.866) / 2) * 2 + 2;
        if (cols === COLS && rows === ROWS) return;
        COLS = cols; ROWS = rows;
        let html = "";
        for (let i = 0; i < COLS * ROWS; i++) {
          const k = String(i % n + 1).padStart(2, "0");
          html += `<img class="tokens__icon" src="${base}token${k}.svg" alt="" decoding="async" loading="lazy" style="width:${size}px;height:${size}px">`;
        }
        box.innerHTML = html;
        icons = [...box.children];
      }
      function target() {
        const r = box.getBoundingClientRect();
        const scroll = (r.top + r.height / 2 - innerHeight / 2) * SCROLL;   // ячейка ниже центра экрана → >0
        return { tx: -mx * MOUSE * step, ty: -my * MOUSE * step + scroll };
      }
      function draw() {
        const sy = step * 0.866, PX = COLS * step, PY = ROWS * sy;
        const cx = w / 2, cy = h / 2, edge = EDGE * w;
        icons.forEach((el, i) => {
          const c = i % COLS, r = (i / COLS) | 0;
          // позиция в повторяющейся сетке, центр периода совпадает с центром ячейки
          let px = mod(c * step + (r % 2) * step / 2 + x, PX) - (PX - w) / 2;
          let py = mod(r * sy + y, PY) - (PY - h) / 2;
          // до края скруглённого квадрата во всю ячейку (signed distance)
          const R = ROUND * w, qx = Math.abs(px - cx) - (w / 2 - R), qy = Math.abs(py - cy) - (h / 2 - R);
          const d = R - Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - Math.min(Math.max(qx, qy), 0);
          let s = Math.max(0, Math.min(1, d / edge));
          s = s * s * (3 - 2 * s);                                     // плавное затухание
          px += (cx - px) * (1 - s) * PULL;
          py += (cy - py) * (1 - s) * PULL;
          el.style.transform = `translate(${px - size / 2}px, ${py - size / 2}px) scale(${s})`;
          el.style.opacity = s;
        });
      }
      function tick() {
        const t = target();
        x += (t.tx - x) * EASE; y += (t.ty - y) * EASE;
        draw();
        raf = visible && Math.abs(t.tx - x) + Math.abs(t.ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
      }
      const wake = () => { if (visible && !raf && !still) raf = requestAnimationFrame(tick); };

      addEventListener("pointermove", e => {
        const r = box.getBoundingClientRect();
        mx = Math.max(-1, Math.min(1, (e.clientX - r.left - r.width / 2) / r.width));
        my = Math.max(-1, Math.min(1, (e.clientY - r.top - r.height / 2) / r.height));
        wake();
      }, { passive: true });
      addEventListener("scroll", wake, { passive: true });
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(box);
      new ResizeObserver(() => { measure(); draw(); }).observe(box);

      measure();
      if (still) { draw(); return; }
      const t = target(); x = t.tx; y = t.ty;          // стартуем без «подъезда»
      draw();
    });
  };
})();
