/* Кубики, которые отталкиваются от курсора — MEDIA { cubes: "x.svg" } на странице проекта.
 * Картинка — обычный SVG из Figma: фон (первый rect) + квадратики <rect>. Скрипт читает их координаты
 * и рисует на canvas. Курсор отталкивает кубики как магнит; когда он уходит, они возвращаются
 * на место на пружине — с покачиванием, как на волнах.
 * Настройки — константы ниже (в пикселях макета 1390×780). */
(function () {
  const RADIUS = 200;               // радиус действия курсора
  const PUSH = 80;                  // насколько далеко кубик уходит от курсора (у самого курсора)
  const STIFF = 0.035;              // жёсткость пружины (больше — быстрее возвращается)
  const DAMP = 0.9;                 // затухание (ближе к 1 — дольше качается)
  const TILT = 0.035;               // наклон кубика от скорости, рад на px/кадр
  const WAVE = 0.012;               // задержка «волны»: дальние от курсора кубики трогаются чуть позже
  const BALL = 9;                   // без мыши (телефон): белый кубик летает как заставка DVD — скорость, px/кадр
  const BALL_SIZE = 24;             // его размер
  const BALL_COLOR = "#fff";

  window.cubesHTML = function (file, dir) {
    return `<div class="media media--cubes" data-cubes="${dir + file}"><img class="cover" src="${dir + file}" alt="" decoding="async"><canvas class="cover" aria-hidden="true" hidden></canvas></div>`;
  };

  window.initCubes = function (root) {
    root.querySelectorAll("[data-cubes]").forEach(box => {
      // без сервера (file://) SVG не прочитать — остаётся обычная картинка без интерактива
      box.classList.add("is-loaded");
      fetch(box.dataset.cubes).then(r => r.text()).then(src => setup(box, src)).catch(() => {});
    });
  };

  function setup(box, src) {
    const svg = new DOMParser().parseFromString(src, "image/svg+xml").documentElement;
    const [, , VW, VH] = (svg.getAttribute("viewBox") || "0 0 1390 780").split(/[\s,]+/).map(Number);
    const rects = [...svg.querySelectorAll("rect")];
    const bg = rects.shift().getAttribute("fill") || "#000";
    // у зеркальных rect из Figma координаты в transform="matrix(-1 0 0 1 X Y)" — кубик стоит левее X
    const cubes = rects.map(r => {
      const w = +r.getAttribute("width"), h = +r.getAttribute("height");
      const m = (r.getAttribute("transform") || "").match(/matrix\(([^)]+)\)/);
      let x = +r.getAttribute("x") || 0, y = +r.getAttribute("y") || 0;
      if (m) { const t = m[1].split(/[\s,]+/).map(Number); x = t[4] + t[0] * (t[0] < 0 ? w : 0) + x; y = t[5] + y; }
      return { x: x + w / 2, y: y + h / 2, w, h, fill: r.getAttribute("fill"), dx: 0, dy: 0, vx: 0, vy: 0, a: 0 };
    });

    const canvas = box.querySelector("canvas"), ctx = canvas.getContext("2d");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scale = 1, mx = 0, my = 0, active = false, visible = false, raf = 0, dpr = 1;
    // на устройствах без мыши «магнитом» служит белый кубик, отскакивающий от краёв; палец его подменяет
    const ball = !still && matchMedia("(hover: none)").matches ? { x: VW * 0.3, y: VH * 0.2, vx: BALL * 0.8, vy: BALL * 0.6 } : null;
    let touching = false;

    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = box.clientWidth * dpr; canvas.height = box.clientHeight * dpr;
      scale = box.clientWidth / VW;
      draw();
    }
    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bg; ctx.fillRect(0, 0, box.clientWidth, box.clientHeight);
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, (box.clientHeight - VH * scale) / 2 * dpr);
      for (const c of cubes) {
        ctx.fillStyle = c.fill;
        if (!c.a) { ctx.fillRect(c.x + c.dx - c.w / 2, c.y + c.dy - c.h / 2, c.w, c.h); continue; }
        ctx.save(); ctx.translate(c.x + c.dx, c.y + c.dy); ctx.rotate(c.a);
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h); ctx.restore();
      }
      if (ball && !touching) { ctx.fillStyle = BALL_COLOR; ctx.fillRect(ball.x - BALL_SIZE / 2, ball.y - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE); }
    }
    function tick() {
      raf = 0;
      if (ball && !touching) {
        const r = BALL_SIZE / 2;
        ball.x += ball.vx; ball.y += ball.vy;
        if (ball.x < r || ball.x > VW - r) { ball.vx = -ball.vx; ball.x = Math.max(r, Math.min(VW - r, ball.x)); }
        if (ball.y < r || ball.y > VH - r) { ball.vy = -ball.vy; ball.y = Math.max(r, Math.min(VH - r, ball.y)); }
        mx = ball.x; my = ball.y; active = true;
      }
      let moving = active;
      for (const c of cubes) {
        let fx = 0, fy = 0;
        if (active) {
          const ex = c.x - mx, ey = c.y - my, d = Math.hypot(ex, ey);
          if (d < RADIUS) {
            const k = (1 - d / RADIUS) ** 2 * PUSH * STIFF / Math.max(d, 1);
            fx = ex * k; fy = ey * k;           // в равновесии кубик стоит на PUSH·(1−d/R)² от дома
          }
        }
        // пружина домой + затухание; «волна» — кубики дальше от курсора реагируют мягче
        const lag = 1 / (1 + Math.hypot(c.x - mx, c.y - my) * WAVE);
        c.vx = (c.vx + (fx - c.dx * STIFF) * (0.6 + 0.4 * lag)) * DAMP;
        c.vy = (c.vy + (fy - c.dy * STIFF) * (0.6 + 0.4 * lag)) * DAMP;
        c.dx += c.vx; c.dy += c.vy;
        c.a = c.vx * TILT - c.vy * TILT * 0.5;
        if (Math.abs(c.dx) + Math.abs(c.dy) + Math.abs(c.vx) + Math.abs(c.vy) > 0.02) moving = true;
        else { c.dx = c.dy = c.vx = c.vy = c.a = 0; }
      }
      draw();
      if (moving && visible) raf = requestAnimationFrame(tick);
    }
    const run = () => { if (!raf && visible && !still) raf = requestAnimationFrame(tick); };

    box.addEventListener("pointermove", e => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / scale;
      my = (e.clientY - r.top - (r.height - VH * scale) / 2) / scale;
      active = true; touching = e.pointerType !== "mouse"; run();
    });
    ["pointerleave", "pointercancel", "pointerup"].forEach(t => box.addEventListener(t, e => {
      if (t === "pointerup" && e.pointerType === "mouse") return;
      active = false; touching = false; run();
    }));
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) run(); }).observe(box);
    new ResizeObserver(size).observe(box);
    canvas.hidden = false; box.querySelector("img").remove();
  }
})();
