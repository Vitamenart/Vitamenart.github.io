/* About: барабан навыков в hero.
   Слева неподвижное «Design», справа список слов. Каждые STEP_MS список
   сдвигается на одно слово вверх (шагом, с паузой), центральное слово белое,
   остальные гаснут по мере удаления от центра. */
(function () {
  const WORDS = ["Direction", "Systems", "Leadership", "Products", "Brand", "Interface",
                 "Tokens", "Identity", "Teams", "Culture", "Ops"];
  const STEP_MS = 1000;                        // пауза между шагами
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
