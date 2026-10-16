/* Внутренняя страница «1inch Brand» — Figma: 1inch brand (106:4890).
   Картинки: assets/projects/1inch-brand/<file>. .svg — анимированный SVG. */
PAGES["1inch-brand"] = {
  heading: "1inch 2020",
  text: [
    "1inch was born at a hackathon in 2019. When I joined in 2020, the project had a strong product but almost no brand: just a logo bought from a stock site and no visual system behind it.",
    "My task was to create the whole identity from the ground up and make it work as one system across every touchpoint. I redrew the logo and the unicorn mascot, defined the colours, typography and iconography, and built the visual language for the website, landing pages, the dApp and later the wallet app. The same system extended into 3D, motion, events and merch.",
    "The result was a brand that grew together with the company, from a hackathon project to one of the most recognised names in DeFi."
  ],
  meta: [
    { label: "Role", value: ["Logo Design", "Brand Identity", "Brand Guidelines", "Art Direction"] },
    { label: "Year", value: ["2020"] }
  ],
  blocks: [
    { row: [ { file: "01-logo-before.jpg" },
             { file: "02-logo-after.jpg" } ] },
    { full: { file: "03-guidelines.jpg" } },
    { row: [ { file: "04-icons.jpg" }, { file: "05-icons-anim.svg" } ] },
    { row: [ { title: "Wallet app", text: "The brand system carried into the 1inch Wallet, from interface to onboarding.", link: "wallet" },
             { cover: "wallet" } ] },
    { row: [ { file: "07-wallet-3d.jpg" }, { file: "08-wallet-promo.jpg" } ] },
    { row: [ { file: "09-dapp.jpg" },
             { title: "dApp", text: "The core trading interface, designed to make complex DeFi feel simple.", link: "dapp" } ] },
    { row: [ { file: "10-chain.jpg" }, { file: "11-exchange.jpg" } ] },
    { row: [ { title: "Merch", text: "Brand objects and event materials that made 1inch recognisable offline.", link: "merch" },
             { file: "15-pin.jpg" } ] },
    { row: [ { file: "16-merch.jpg" }, { file: "17-merch-set.png" } ] },
    { row: [ { file: "../mascot/uni-anim.svg" },
             { title: "Mascot", text: "The unicorn redrawn as the brand's character, flexible enough for campaigns and merch.", link: "mascot" } ] }
  ]
};
