/* Внутренняя страница «1inch dApp» — по скриншоту.
   Картинки: assets/projects/dapp/<file>. Подписи (Before / After / Update 2021…) — внутри картинок. */
PAGES["dapp"] = {
  heading: "1inch dApp",
  text: [
    "The interface of one of DeFi’s largest aggregators, from the first version to scale.",
    "When I joined in 2020, 1inch had a powerful aggregator but an interface built in a rush at a hackathon. It was hard to use and didn’t reflect the quality of the technology behind it.",
    "I redesigned the dApp from the ground up, creating a clear swap experience and a complete design system that let the product grow quickly and consistently. As 1inch expanded, the interface evolved with it, from a single swap form to a full trading platform used by millions."
  ],
  meta: [
    { label: "Role", value: ["Product Design", "Design System", "Art Direction"] },
    { label: "Year", value: ["2020 – 2024"] }
  ],
  blocks: [
    { metrics: [
      { value: "1M",    label: "users by 2021" },
      { value: "28M+",  label: "wallets connected" },
      { value: "$800B", label: "total swap volume" },
      { value: "267M",  label: "swaps executed" }
    ] },
    { full: { file: "01-before-hackathon.jpg" } },
    { full: { file: "02-first-redesign.jpg" } },
    { statement: "The first redesign turned a raw prototype into a product people could trust: a clear hierarchy, a focused swap flow and a visual language that matched the 1inch brand." },
    { full: { file: "03-screens.jpg" } },
    { full: { file: "04-update-2021.jpg" } },
    { full: { file: "05-all-screens.jpg" } },
    { statement: "1inch splits every trade across multiple exchanges to find the best rate, but no one had ever shown users how. I designed a routing visual from scratch that makes the path of every token clear at a glance." },
    { full: { file: "06-routing.jpg" } },
    { row: [ { tokens: { dir: "tokens/", count: 64 } },
             { title: "Token icons", text: "More than 1,000 token icons, redrawn by hand in vector so every asset looks sharp and consistent, giving users a cleaner, more trustworthy experience." } ] }
  ]
};
