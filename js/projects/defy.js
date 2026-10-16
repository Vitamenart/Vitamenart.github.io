/* Внутренняя страница «DEFY» — по скриншоту.
   Картинки: assets/projects/defy/<file>.
   What People Say — 2 твита (данные скачаны один раз, картинки с серверов X), без карусели. */
PAGES["defy"] = {
  heading: "DEFY",
  text: [
    "DEFY is a play on two words at once: DeFi and OBEY. The visual language nods to one of the most recognisable icons of street art, the stark black-and-white portrait with a bold red label, and flips its message. Where the original commanded obedience, ours invited people to defy the old financial system."
  ],
  meta: [
    { label: "Role", value: ["Concept", "Art Direction", "Illustration"] },
    { label: "Year", value: ["2022"] }
  ],
  blocks: [
    { full: { file: "01-built-to-defy.jpg" } },
    { row: [ { file: "02-tshirt.jpg" }, { file: "03-stickers.jpg" } ] },
    { tweets: { title: "What People Say", items: [
      { url: "https://x.com/aestimi/status/1517867735757246464",
        name: "tim", handle: "aestimi",
        avatar: "assets/avatars/aestimi.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1517867675829035008/pu/img/6Rs4oIoEutZOEXeL.jpg?name=medium",
        video: true,
        text: "The first useful ad at Amsterdam’s subway today. Great job, 1inch" },
      { url: "https://x.com/viktorfischer/status/1517964752386990081",
        name: "Viktor | RockawayX", handle: "viktorfischer",
        avatar: "assets/avatars/viktorfischer.jpg",
        photo: "https://pbs.twimg.com/media/FRDk4-eXoAA6czc.jpg?name=medium",
        text: "@aestimi @1inch Also - finally interesting sidewalks @deacix @k06a 😁" }
    ] } }
  ]
};
