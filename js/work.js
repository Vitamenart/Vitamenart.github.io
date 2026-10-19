/* Страница Work: заголовок, фильтры (All work / Products / Campaigns / AI & Tools) и сетка проектов.
   Фильтр переключается на месте, без перезагрузки; выбранный — в адресе: work.html?cat=... */
(function () {
  const ids = CATEGORIES.map(c => c.id);
  let cat = new URLSearchParams(location.search).get("cat");
  if (!ids.includes(cat)) cat = "all";

  const filters = document.getElementById("filters");
  filters.innerHTML = CATEGORIES.map(c => `<a class="tab ${c.id === cat ? "is-active" : ""}" href="${c.href}" data-cat="${c.id}"
    ${c.id === cat ? 'aria-current="true"' : ""}>${c.label}</a>`).join("");

  const grid = document.getElementById("grid");
  // первый показ — вся сетка грузится сразу (не по скроллу), первый ряд в приоритете
  function render(first) {
    const list = cat === "all" ? PROJECTS : PROJECTS.filter(p => p.category === cat);
    grid.innerHTML = list.length ? list.map((p, i) => `
      <a class="tile" href="project.html?id=${p.id}">
        <div class="media">${coverImg(p, first ? { eager: i < 3, lazy: false } : { lazy: false })}</div>
        <p class="tile__title">${p.title}</p>
        <p class="tile__text">${p.summary}</p>
      </a>`).join("") : '<p class="empty">No projects in this category yet.</p>';
  }
  render(true);

  const { links, active, slide } = tabSlider(filters);
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  filters.addEventListener("click", e => {
    const to = e.target.closest(".tab"), from = active();
    if (!to || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (to === from) return;
    links.forEach(l => { const on = l === to; l.classList.toggle("is-active", on); on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"); });
    if (from && !still.matches) slide(from, to);
    cat = to.dataset.cat;
    history.replaceState(null, "", to.getAttribute("href"));
    render(false);
    if (!still.matches) grid.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }],
      { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" });
    // активный фильтр — в видимую область (на телефоне ряд прокручивается)
    to.scrollIntoView({ block: "nearest", inline: "nearest", behavior: still.matches ? "auto" : "smooth" });
  });
})();
