/* Внутренняя страница «1inch Mascot» — по скриншоту.
   Картинки: assets/projects/mascot/<file>. uni-anim.svg здесь не используется — его берут 1inch-brand и toy. */
PAGES["mascot"] = {
  heading: "1inch Mascot",
  text: [
    "A unicorn built for speed, attitude and travel between worlds",
    "In its early years, 1inch was fast, sharp and a little rebellious, a young project taking on the giants of DeFi. The brand needed a character that carried the same energy and could appear anywhere, from campaigns and social media to events and merch."
  ],
  meta: [
    { label: "Role", value: ["Character Design", "Illustration"] }
  ],
  blocks: [
    { full: { file: "01-unicorns.jpg" } },
    { full: { file: "02-stickers.jpg" } },
    { row: [ { title: "NFT Collection", text: "The unicorn was also designed as an NFT collection, with a series of unique variations of the character. The project was never released.", link: "nft-unicorns" },
             { file: "03-nft.gif" } ] },
    { full: { file: "03-app.jpg" } },
    { full: { file: "04-uft.jpg" } },
    { title: "One Unicorn, Many Worlds", statement: "The unicorn travels between worlds through portals. Each world, or each campaign and event, gives him a new form, style and mood, yet he always stays recognisably himself. This turned the mascot from a single static image into an open creative platform that could grow with the brand." },
    { full: { video: "uni-run.webm", play: "auto" } },
    { full: { file: "05-mountain.jpg" } },
    { full: { file: "06-snow.jpg" } },
    { full: { file: "07-gotham.jpg" } },
    { row: [ { file: "08-without-ai.svg" },
             { title: "Without AI", text: "All illustrations and animations were created by hand, with no generative AI." } ] }
  ]
};
