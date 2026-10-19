/* Внутренняя страница «1inch × Times Square» — по скриншоту.
   Картинки: assets/projects/times-square/<file>. .gif — гифка.
   Seen Around the World — твиты (данные скачаны один раз, обложки видео с серверов X), тёмный вариант блока.
   Первый блок — ролик Vimeo: автовоспроизведение без звука и без кнопок, по кругу (play: "auto"). */
PAGES["times-square"] = {
  heading: "1inch × Times<br>Square",
  text: [
    "An animated campaign for one of the most watched screens in the world",
    "1inch took over a large-format digital billboard in Times Square, New York. I designed the campaign end to end, from concept and key visuals to the animated sequences that ran on screen.",
    "The story is built around the brand’s unicorn, who travels between worlds through portals. On the billboard, he gallops through a cosmic landscape of planets and neon light, then bursts out into the city, set against bold typography that reads instantly from the street. Every frame was designed for scale and motion: high contrast, large type and a deep purple palette that holds its own among the brightest screens in Times Square."
  ],
  meta: [
    { label: "Role", value: ["Concept", "Art Direction", "Key Visuals", "Motion"] },
    { label: "Location", value: ["Times Square, New York"] },
    { label: "Year", value: ["2022"] }
  ],
  blocks: [
    { full: { video: "https://vimeo.com/1234167483", play: "auto" } },
    { row: [ { file: "02-billboard.jpg" }, { file: "03-billboard-2.jpg" } ] },
    { full: { file: "04-cosmic.gif" } },
    { row: [ { file: "05-crowd.jpg" }, { file: "06-street.jpg" } ] },
    { tweets: { title: "Seen Around the World", dark: true, items: [
      { url: "https://x.com/1inch/status/1559442561886031872",
        name: "1inch", handle: "1inch",
        avatar: "assets/avatars/1inch.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1559441573829660672/pu/img/J3_xcHn3f-OzD-6T.jpg?name=medium", video: true,
        text: "Look at this beautiful billboard! 😱<br><br>👀 Can anyone guess its exact location?<br><br>#1inch #DeFi #crypto" },
      { url: "https://x.com/1inch/status/1588866812401573888",
        name: "1inch", handle: "1inch",
        avatar: "assets/avatars/1inch.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1588866440022687749/pu/img/h7oYk-_WLMqKiIaM.jpg?name=medium", video: true,
        text: "🏙 Times Square, NYC cabs, Seoul… Where else to place #1inch promo? 🤔<br><br>Hmm, how about subway and train stations in #Lisbon during the #WebSummit event? 😏 Yeaaah, said and done!<br><br>Maybe someone knows where this ad is placed? 📍<br><br>#DeFi #crypto" },
      { url: "https://x.com/k06a/status/1541032154691506177",
        name: "Anton Bukov (e/acc)🦇🔊", handle: "k06a",
        avatar: "assets/avatars/k06a.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1541032102388531202/pu/img/kSjwUAj8uPQUdSyP.jpg?name=medium", video: true,
        text: "#DeFi is taking over the world, @1inch at a time!" },
      { url: "https://x.com/1inch/status/1540296326721814528",
        name: "1inch", handle: "1inch",
        avatar: "assets/avatars/1inch.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1540291592849850374/pu/img/Dg4gY1sxeLRp5tzs.jpg?name=medium", video: true,
        text: "🦄 #1inch is in #TimesSquare!<br><br>Such a memorable day 🥰<br><br>#NYC #NewYorkCity #DeFi @TimesSquareNYC" },
      { url: "https://x.com/1inch/status/1572954043676299264",
        name: "1inch", handle: "1inch",
        avatar: "assets/avatars/1inch.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1572953780643151874/pu/img/1WDYccX8iC2QXNJv.jpg?name=medium", video: true,
        text: "👀<br><br>#1inch #NewYork #DeFi" },
      { url: "https://x.com/1inch/status/1600127415287631873",
        name: "1inch", handle: "1inch",
        avatar: "assets/avatars/1inch.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1600126200655003650/pu/img/_Wf_8MDjLvTU3V_5.jpg?name=medium", video: true,
        text: "Not only smartphones and laptops can be foldable, but also #1inch’s recent ad at 🇻🇳 @eth_vietnam!<br><br>🤔 Who do you think would come first in a race: motorcyclists or a cyber unicorn?<br><br>#Vietnam #DeFi #crypto" },
      { url: "https://x.com/Vitamenart/status/1792193161072160989",
        name: "Vitaliy Menshenin", handle: "Vitamenart",
        avatar: "assets/avatars/vitamenart.jpg",
        photo: "https://pbs.twimg.com/ext_tw_video_thumb/1792193143175045120/pu/img/rdcpOfsBYyb2yMv2.jpg?name=medium", video: true,
        text: "Congratulations to the @1inch on its 5th anniversary! I'm thrilled to be part of this amazing team! #1inch5Years" }
    ] } }
  ]
};
