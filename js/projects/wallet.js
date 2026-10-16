/* Внутренняя страница «1inch Wallet» — по скриншоту.
   Картинки: assets/projects/wallet/<file>. */
PAGES["wallet"] = {
  heading: "1inch Wallet",
  text: [
    "A mobile crypto wallet designed from a blank page<br>When I started, there was no wallet and no prototype, and the market had very few examples to learn from. Most crypto wallets felt technical and intimidating, built for insiders rather than everyday users.",
    "I designed the 1inch Wallet from the ground up, starting with extensive research into how people manage money on their phones. The key decision was finding the right balance between a crypto wallet and a banking app: the power and transparency DeFi users expect, combined with the clarity and trust of familiar financial apps. That balance shaped everything, from the core structure and onboarding to swaps, payments and everyday flows."
  ],
  meta: [
    { label: "Role", value: ["Product Design", "UX Research", "Visual Design"] }
  ],
  blocks: [
    { metrics: [
      { value: "500K+", label: "downloads" },
      { value: "25K",   label: "downloads in the first month" },
      { value: "250K",  label: "downloads in the first year" },
      { value: "13+",   label: "networks supported" }
    ] },
    { row: [ { file: "01-app-icon.jpg" }, { file: "02-wallets.jpg" } ] },
    { row: [ { file: "03-history.jpg" },  { file: "04-widgets.jpg" } ] },
    { statement: "The first version, shipped in 2020, carried the density of crypto at the time: too many numbers, settings and edge cases on every screen. Every iteration since has been about removing friction, flattening the hierarchy and making each action obvious to someone opening a wallet for the first time." },
    { full: { file: "05-first-version.jpg" } },
    { row: [ { file: "06-user-flow.jpg" },
             { title: "User flow", text: "Every screen and state was mapped together with the engineering team, so no crypto-specific edge case slipped through." } ] },
    { full: { file: "07-cards.jpg" } },
    { statement: "By 2022 the product design team had grown, and I handed day-to-day work on the wallet over to them. I stayed in the loop as design reviewer, signing off every layout before it reached development." },
    { full: { file: "08-screens.jpg" } },
    { full: { file: "09-design-system.jpg" } }
  ]
};
