/* Внутренняя страница «NFT Unicorns» — по скриншоту.
   Картинки: assets/projects/nft-unicorns/<file>. Надпись «64 mln» — внутри картинки 05. */
PAGES["nft-unicorns"] = {
  heading: "NFT Unicorns: an<br>unreleased collection",
  text: [
    "A generative collection of 64 million possible unicorns. The 1inch Unicorns were planned as a generative NFT collection built around the brand’s mascot, designed to reward the community and give every holder a character of their own.",
    "The project was frozen before launch, and the later rebrand moved away from the mascot entirely. It remains one of the largest illustration systems I’ve built."
  ],
  meta: [
    { label: "Role", value: ["Concept", "Character Design", "Illustration", "Trait System"] },
    { label: "Year", value: ["2022"] }
  ],
  blocks: [
    { row: [ { file: "01-unicorns-left.png" }, { file: "02-unicorns-right.png" } ] },
    { statement: "I created the entire collection by hand. Each unicorn was assembled from six trait categories: body, hair, outfit, mouth, eyes and horn, with 20 variations in each. Together they allow for 64 million unique combinations, all sharing one consistent illustration style and personality." },
    { full: { file: "03-collection-grid.png" } },
    { row: [ { title: "NFT Evolution", text: "Unicorns evolved with their owners, upgrading through stages based on activity on the platform." },
             { file: "04-evolution.png" } ] },
    { full: { file: "05-64mln.png" } }
  ]
};
