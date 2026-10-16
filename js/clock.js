/* Часы с реальным временем — MEDIA { file: "x.svg", clock: { hour, minute, second, center } } на странице проекта.
 * SVG из Figma грузится как обычная картинка, потом скрипт подменяет её встроенной копией и поворачивает стрелки
 * под время компьютера посетителя. hour / minute / second — id стрелок в SVG, center — ось стрелок
 * в координатах их группы. Стрелка в макете может стоять под любым углом: её угол берётся из rotate(…) в transform
 * (0° — стрелка смотрит вверх), скрипт доворачивает её на разницу. Секундная крутится CSS-анимацией из SVG
 * (60 с, от 12 часов) — ей только сдвигается старт.
 * Без сервера (file://) SVG не прочитать — остаётся обычная картинка. */
(function () {
  window.initClock = function (root) {
    root.querySelectorAll("[data-clock]").forEach(box => {
      const img = box.querySelector("img"), cfg = JSON.parse(box.dataset.clock);
      fetch(img.getAttribute("src")).then(r => r.text()).then(src => setup(box, img, cfg, src)).catch(() => {});
    });
  };

  function setup(box, img, cfg, src) {
    const svg = new DOMParser().parseFromString(src, "image/svg+xml").documentElement;
    if (svg.nodeName !== "svg") return;
    svg.setAttribute("class", "cover");
    svg.setAttribute("aria-hidden", "true");
    const [cx, cy] = cfg.center;

    // стрелку оборачиваем в <g>, который доворачивает её вокруг оси
    const hand = id => {
      const el = svg.getElementById(id);
      if (!el) return null;
      const m = (el.getAttribute("transform") || "").match(/rotate\(([-\d.]+)/);
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      el.replaceWith(g); g.appendChild(el);
      return { g, base: m ? +m[1] : 0 };
    };
    const hands = { hour: hand(cfg.hour), minute: hand(cfg.minute) };
    const sec = cfg.second && svg.getElementById(cfg.second);

    function tick() {
      const d = new Date(), s = d.getSeconds() + d.getMilliseconds() / 1000;
      const m = d.getMinutes() + s / 60, h = d.getHours() % 12 + m / 60;
      const set = (k, deg) => hands[k] && hands[k].g.setAttribute("transform", `rotate(${deg - hands[k].base} ${cx} ${cy})`);
      set("hour", h * 30); set("minute", m * 6);
      return s;
    }
    const s = tick();
    if (sec) sec.style.animationDelay = -s + "s";   // секундная: анимация 60 с с отставанием на текущие секунды
    setInterval(tick, 1000);

    box.replaceChild(svg, img);
    box.classList.add("is-loaded");
  }
})();
