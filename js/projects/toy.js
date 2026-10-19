/* Внутренняя страница «1inch Toy: Sir Inchalot» — по скриншоту.
   Картинки: assets/projects/toy/<file>. У блока 1inch Mascot — анимированный SVG из assets/projects/mascot. */
PAGES["toy"] = {
  heading: "1inch Toy: Sir<br>Inchalot",
  text: [
    "A plush mascot turned conference collectible.",
    "Sir Inchalot is a plush unicorn created as a surprise gift from 1inch for conference attendees. He is built on the brand’s unicorn mascot, with a slightly sly grin and a lot of attitude.",
    "I took the character from first sketches to final 3D. The early drawings explored pose, proportions and personality, aiming for something cute enough to hug but still unmistakably 1inch. I then modelled and textured him in 3D, translating the flat mascot into a soft, simplified form that would survive production as a plush. The 3D model became the reference for the manufacturer.",
    "At events, Sir Inchalot quickly became one of the most wanted items on the booth. People came back for him, traded for him, and actively hunted him down."
  ],
  meta: [
    { label: "Role", value: ["Character Design", "Sketching", "3D Modelling &amp; Texturing"] },
    { label: "Production", value: ["External manufacturer"] },
    { label: "Year", value: ["2023"] }
  ],
  blocks: [
    { row: [ { file: "01-3d-model.jpg" }, { file: "02-sketches.jpg" } ] },
    { row: [ { video: "03-render.webm", play: "auto" }, { file: "04-event.jpg" } ] },
    { row: [ { file: "05-booth.jpg" },    { file: "06-plush.jpg" } ] },
    { row: [ { title: "1inch Mascot", text: "The 1inch unicorn is the brand’s core mascot. Sir Inchalot gives it a body: the same character, reimagined as a soft, tactile object people want to take home.", link: "mascot" },
             { file: "../mascot/uni-anim.svg" } ] }
  ]
};
