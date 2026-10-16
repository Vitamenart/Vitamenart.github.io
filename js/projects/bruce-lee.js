/* Внутренняя страница «1inch × Bruce Lee» — Figma: BruceLee (382:42169).
   Кнопки-ссылки на новости — в js/projects.js (links). Картинки: assets/projects/bruce-lee/<file>.
   .svg — анимированный SVG. */
PAGES["bruce-lee"] = {
  heading: "1inch × Bruce Lee:<br>Take Crypto SeriousLee",
  text: [
    "The first global campaign for 1inch, made in partnership with the Bruce Lee Family Company",
    "1inch takes its name from Bruce Lee's famous one-inch punch: maximum impact with minimum effort. In 2024, after almost three years of preparation, the brand made that connection official through a partnership with the Bruce Lee Family Company, founded by his daughter Shannon Lee.",
    "The campaign set out to change how people see crypto: not as a joke or a gamble, but as a serious financial system. Its message was simple: Take crypto SeriousLee. At its centre was a comedic, kung-fu-inspired commercial that brought Bruce Lee back to the screen through AI morphing technology. It was produced with the creative agency Talent and the production company Birth."
  ],
  meta: [
    { label: "Role", value: ["Art Director"] },
    { label: "Illustrations", value: ["Julien Rico Jr."] },
    { label: "Agency", value: ["Talent"] },
    { label: "Year", value: ["2024"] }
  ],
  blocks: [
    { full: { video: "https://youtu.be/Xv2-G-JIOrI", play: "click" } },
    { statement: "As Art Director on the 1inch side, I oversaw the visual direction of the film and carried the campaign across every touchpoint, from key visuals and social content to event materials, print and merch." },
    { row: [ { file: "01-self-custodial.jpg" }, { file: "02-phone.jpg" } ] },
    { row: [ { file: "03-tshirt.jpg" },        { file: "04-gasless.jpg" } ] },
    { row: [ { title: "In Wallet App", text: "The campaign didn’t stop at the screen. Bruce Lee also appeared inside 1inch Wallet, with a special loading animation and in-app cover that brought the campaign into the product itself." },
             { file: "05-wallet-card.svg" } ] }
  ]
};
