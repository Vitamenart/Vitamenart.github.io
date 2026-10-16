/* Общий рендер медиа — страницы проектов и Showreel на главной.
 *
 * video может быть:
 *   файлом  — "x.mp4" / "x.webm" (из папки проекта) или полной ссылкой на файл
 *   Vimeo   — "https://vimeo.com/123456789"
 *   YouTube — "https://youtu.be/ID" или "https://www.youtube.com/watch?v=ID"
 * play: "auto"  — сразу, без звука, по кругу (фоном)
 *       "click" — кнопка Play, запуск со звуком
 */
function videoSource(url) {
  let m;
  if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { host: "vimeo", id: m[1] };
  if ((m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/))) return { host: "youtube", id: m[1] };
  return { host: "file" };
}
function embedUrl(src, auto) {
  if (src.host === "vimeo") return `https://player.vimeo.com/video/${src.id}?` +
    (auto ? "background=1&autoplay=1&loop=1&muted=1" : "autoplay=1&title=0&byline=0&portrait=0&dnt=1");
  return `https://www.youtube-nocookie.com/embed/${src.id}?` +
    (auto ? `autoplay=1&mute=1&loop=1&playlist=${src.id}&controls=0&playsinline=1&rel=0`
          : "autoplay=1&playsinline=1&rel=0&modestbranding=1");
}
/* Обложка от самого сервиса. YouTube: maxres, если её нет — hq.
   Vimeo отдаёт ссылку на обложку через oEmbed — подставляется в initVideos. */
function thumb(src) {
  if (src.host === "youtube") return `<img class="cover" src="https://i.ytimg.com/vi/${src.id}/maxresdefault.jpg" alt=""
    loading="lazy" decoding="async"
    onload="if(this.naturalWidth<200)this.onerror()" onerror="this.onerror=null;this.src=this.src.replace('maxresdefault','hqdefault')">`;
  return `<img class="cover" data-vimeo="${src.id}" alt="" decoding="async" hidden>`;
}
function iframe(url) {
  return `<iframe class="cover" src="${url}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
    title="Video" loading="lazy"></iframe>`;
}

function media(m = {}, dir = "") {
  if (m.cubes && window.cubesHTML) return cubesHTML(m.cubes, dir);   // интерактивные кубики, js/cubes.js
  const ext = ((m.file || m.video || "").split("?")[0].split(".").pop() || "").toLowerCase();
  const kind = m.kind || (m.video ? "video" : ext === "gif" ? "gif" : ext === "svg" ? "svg" : "img");
  const cap = m.caption ? `<p class="media__caption">${m.caption}</p>` : "";
  const auto = m.play === "auto";
  let inner = "", attrs = "";
  if (kind === "video" && m.video) {
    const src = videoSource(m.video);
    const poster = m.poster ? `<img class="cover" src="${dir + m.poster}" alt="" loading="lazy" decoding="async">` : "";
    if (src.host === "file") {
      const url = /^https?:|^\//.test(m.video) ? m.video : dir + m.video;
      inner = `<video class="cover" src="${url}" ${m.poster ? `poster="${dir + m.poster}"` : ""} playsinline loop
        ${auto ? "muted autoplay" : 'preload="metadata"'}></video>${auto ? "" : playBtn()}`;
    } else if (auto) {
      inner = iframe(embedUrl(src, true));
    } else {
      // плеер не грузим, пока не нажали Play: страница остаётся лёгкой
      // превью — родная обложка YouTube / Vimeo (своя — только если явно задан poster)
      attrs = ` data-embed="${embedUrl(src, false)}"`;
      inner = (poster || thumb(src)) + playBtn();
    }
  } else if (kind === "video") {
    inner = auto ? "" : playBtn();                     // заглушка без ссылки
  } else if (m.file) {
    inner = `<img class="cover" src="${dir + m.file}" alt="${m.alt || m.caption || ""}" loading="lazy" decoding="async"
      data-reveal onload="revealImg(this)" onerror="this.remove()">`;
  }
  if (m.clock) attrs += ` data-clock='${JSON.stringify(m.clock)}'`;   // часы с реальным временем, js/clock.js
  return `<div class="media media--${kind}"${attrs}>${inner}${cap}</div>`;
}
function playBtn() {
  return `<button class="play" type="button" aria-label="Play video">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>`;
}
/* Кнопка Play: запускает видео со звуком и прячется. */
function initVideos(root) {
  // скелетон с бликом (.media--video::before) — пока нет ни кадра, ни обложки, ни плеера
  root.querySelectorAll(".media--video").forEach(box => {
    const ready = () => box.classList.add("is-ready");
    const v = box.querySelector("video");
    if (v) {
      if (v.readyState >= 2) ready();
      v.addEventListener("loadeddata", ready);
      v.addEventListener("playing", ready);
    }
    box.querySelectorAll("img").forEach(img => img.complete && img.naturalWidth ? ready() : img.addEventListener("load", ready));
    box.querySelectorAll("iframe").forEach(f => f.addEventListener("load", ready));
  });

  root.querySelectorAll("img[data-vimeo]").forEach(img =>
    fetch("https://vimeo.com/api/oembed.json?width=1920&url=https://vimeo.com/" + img.dataset.vimeo)
      .then(r => r.json())
      .then(d => { if (d.thumbnail_url) { img.src = d.thumbnail_url; img.hidden = false; } })
      .catch(() => {}));                                 // нет сети — остаётся серая плашка

  root.querySelectorAll(".media--video .play").forEach(btn => btn.addEventListener("click", () => {
    const box = btn.parentNode;
    if (box.dataset.embed) {                            // Vimeo / YouTube: превью убираем, ставим плеер
      box.querySelectorAll("img").forEach(img => img.remove());
      box.classList.remove("is-ready");                // плеер грузится — снова блик
      box.insertAdjacentHTML("beforeend", iframe(box.dataset.embed));
      box.lastElementChild.addEventListener("load", () => box.classList.add("is-ready"));
      box.classList.add("is-playing");
      btn.hidden = true;
      return;
    }
    const v = box.querySelector("video");
    if (!v) return;                                     // заглушка без ссылки
    v.controls = true; v.play(); btn.hidden = true;
    box.classList.add("is-playing");
  }));
}
