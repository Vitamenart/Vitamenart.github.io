/* Вкладки Products / Campaigns / DesignOps: work.html?cat=... */
(function () {
  const cat = new URLSearchParams(location.search).get("cat") || "products";
  const c = CATEGORIES.find(c => c.id === cat) || CATEGORIES[1];
  document.title = c.label + " — Vitalii Menshenin";
  document.getElementById("cat-title").textContent = c.label;
  document.getElementById("cat-text").textContent = c.text || "";

  /* Keep exploring: две другие вкладки — карточка с 4 обложками раздела (те же файлы, что везде) и кнопкой.
     Клик — по всей карточке, кнопка темнеет только при наведении на неё саму */
  const others = CATEGORIES.filter(o => o.id !== "overview" && o.id !== c.id);
  // всегда 4 обложки: если проектов в разделе меньше — повторяем по кругу
  const four = id => { const l = PROJECTS.filter(p => p.category === id); return l.length ? [0, 1, 2, 3].map(i => l[i % l.length]) : []; };
  // контейнер есть в work.html; если браузер отдал старый HTML из кэша — создаём, чтобы не сломать сетку
  let explore = document.getElementById("explore");
  if (!explore) {
    explore = document.createElement("section"); explore.className = "explore"; explore.id = "explore";
    document.querySelector("[data-slot='footer'], .site-footer").before(explore);
  }
  explore.innerHTML = `
    <h2 class="explore__title">Keep exploring</h2>
    <div class="explore__row">${others.map(o => `
      <a class="explore__card" href="${o.href}">
        <div class="explore__thumbs">${four(o.id).map(p => `<div class="media">${coverImg(p, { alt: "" })}</div>`).join("")}</div>
        <div class="explore__body">
          <p class="explore__name">${o.label}</p>
          <span class="pill pill--solid pill--plain explore__btn">Open section</span>
        </div>
      </a>`).join("")}
    </div>`;

  const list = PROJECTS.filter(p => p.category === c.id);
  const grid = document.getElementById("grid");
  if (!list.length) { grid.outerHTML = '<p class="empty">No projects in this category yet.</p>'; return; }
  // вся сетка грузится сразу (не по скроллу), первый ряд — в приоритете
  grid.innerHTML = list.map((p, i) => `
    <a class="tile" href="project.html?id=${p.id}">
      <div class="media">${coverImg(p, { eager: i < 3, lazy: false })}</div>
      <p class="tile__title">${p.title}</p>
      <p class="tile__text">${p.summary}</p>
    </a>`).join("");
})();
