/* Внутренняя страница «Gear Face» — по скриншоту.
   Картинки: assets/projects/gear-face/<file>. .svg — анимированный SVG. */
PAGES["gear-face"] = {
  heading: "Gear Face",
  text: [
    "Custom watch faces for Samsung Gear, made as a personal side project.",
    "When I found out Samsung had its own store for watch faces, I started learning how to build them myself, from the visual design to the logic behind every complication. I made them purely for my own wrist, as a playground for interface ideas on a tiny round screen."
  ],
  meta: [],
  blocks: [
    { row: [ { file: "01-garfield.jpg" }, { file: "02-back-to-the-future.jpg" } ] },
    { row: [ { text: "Designed around the OLED display: a true-black background keeps most pixels off to save battery, and a minimal layout keeps every reading legible at a glance. Steps, floors, charge, heart rate, date and even world time fit on a single face without overloading it." },
             { file: "05-oled-anim.svg", clock: { hour: "Union_8", minute: "Union_9", second: "Vector_34", center: [50.8, 136] } } ] },
    { row: [ { file: "03-nixie.jpg" }, { file: "04-side.jpg" } ] }
  ]
};
