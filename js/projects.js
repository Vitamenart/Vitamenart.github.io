/*
 * ЕДИНСТВЕННОЕ место, где описаны проекты.
 *
 * Обложки: assets/covers-web/<cover>  — JPEG 2560×1440, сжатые копии PNG-оригиналов 3840×2160 (оригиналы — в бэкапе).
 * Новую обложку: сделать JPEG-копию из PNG:
 *   sips -s format jpeg -s formatOptions 82 -Z 2560 NN.png --out assets/covers-web/NN.jpg
 * Один файл используется везде: барабан, большие карточки, сетка вкладок,
 * шапка страницы проекта, «Other Works». Если файла нет — рисуется заглушка
 * с названием, так что можно класть картинки постепенно.
 *
 * category: products | campaigns | designops   (фильтры на странице Work; designops — «AI & Tools»)
 * home:     порядковый номер большой карточки на главной (нет поля — не показываем)
 * links:    кнопки под описанием проекта [{ label, href, style: "solid" | "outline" }]
 *           (если у страницы в js/projects/<id>.js свои links — берутся они)
 * Внутренняя страница: js/projects/<id>.js, описание типов блоков — в js/project.js
 */
window.COVERS_DIR = "assets/covers-web/";
window.MEDIA_DIR  = "assets/projects/";   // картинки внутренних страниц: assets/projects/<id>/...

/* Пункты шапки. Активный: index → overview; work → work; about → about; на странице проекта — ни один */
window.NAV = [
  { id: "overview", label: "Overview", href: "index.html" },
  { id: "work",     label: "Work",     href: "work.html" },
  { id: "about",    label: "About",    href: "about.html" }
];

/* Фильтры на странице Work (work.html?cat=...). Первый — все проекты.
   text — на сайте не показывается, идёт только в llms.txt (tools/build.rb) */
window.CATEGORIES = [
  { id: "all",       label: "All work",   href: "work.html" },
  { id: "products",  label: "Products",   href: "work.html?cat=products",
    text: "Digital products and devices designed from the ground up: interfaces, design systems and brands that people use every day." },
  { id: "campaigns", label: "Campaigns",  href: "work.html?cat=campaigns",
    text: "Campaigns, events and brand moments built to be noticed, remembered and shared." },
  { id: "designops", label: "AI & Tools", href: "work.html?cat=designops",
    text: "Tools, scripts and workflows I built to help teams create faster and keep every output on-brand." }
];

window.PROJECTS = [
  /* ---------- Products ---------- */
  { id: "1inch-brand", category: "products", home: 2, cover: "03-1inch-network.jpg",
    title: "1inch Brand", homeTitle: "1inch Brand",
    summary: "The original 1inch identity, built from scratch. Logo, mascot, colours, type and a single visual system across the website, dApp, wallet and beyond." },
  { id: "wallet", category: "products", home: 4, cover: "06-wallet-app.jpg", focus: "50% 40%",
    title: "1inch Wallet",
    summary: "A mobile crypto wallet designed from a blank page, balancing the power of DeFi with the clarity and trust of a banking app." },
  { id: "dapp", category: "products", cover: "11-dapp.jpg",
    title: "1inch dApp",
    summary: "The interface of one of DeFi's largest aggregators, from the first version to scale." },
  { id: "rebrand-concept", category: "products", home: 5, cover: "02-1inch-rebranding.jpg",
    title: "1inch Rebrand: an unreleased concept", homeTitle: "1inch Rebrand Concept", skillTitle: "1inch Rebrand Concept",
    summary: "An in-house evolution of the 1inch identity that showed the brand needed a full rebirth rather than a refresh." },
  { id: "rebranding-2025", category: "products", home: 3, cover: "01-1inch-wordmark.jpg",
    title: "1inch Rebranding",
    summary: "A new identity for a DeFi brand that grew up. Art-directed on the 1inch side in collaboration with Shuka Brand Bureau." },
  { id: "hardwallet", category: "products", home: 1, cover: "04-hardwallet.jpg", focus: "50% 60%",
    title: "Hardware Wallet", homeTitle: "HardWallet",
    summary: "Every touchpoint of an air-gapped hardware wallet, designed solo: the device, a strictly black-and-white E-Ink interface with custom pixel type and icons, motion and packaging.",
    links: [ { label: "ERA Wallet", href: "https://era-wallet.com/" },
             { label: "ERA Wallet on X", href: "https://x.com/era_wallet", style: "outline" } ] },
  { id: "nft-unicorns", category: "products", cover: "05-nft-card.jpg",
    title: "NFT Unicorns",
    summary: "An unreleased generative NFT collection with 64 million possible unicorns that evolve with their owners." },
  { id: "gear-face", category: "products", cover: "21-gear-face.jpg",
    title: "Gear Face",
    summary: "Custom watch faces for Samsung Gear, designed as a personal playground for interfaces on a tiny round screen." },

  /* ---------- Campaigns ---------- */
  { id: "book", category: "campaigns", cover: "07-defi-book.jpg",
    title: "Book: reDeFine Money",
    summary: "Cover and data visualisation for 1inch's oral history of DeFi.",
    links: [ { label: "Read the news", href: "https://www.thestreet.com/crypto/innovation/1inch-releases-redefine-money-the-first-book-to-tell-defis-story" } ] },
  { id: "defy", category: "campaigns", cover: "09-defy-stickers.jpg",
    title: "DEFY",
    summary: "A street-art inspired conference campaign built on a double meaning: DeFi and defy." },
  { id: "toy", category: "campaigns", cover: "08-unicorn-plush.jpg",
    title: "Toy: Sir Inchalot",
    summary: "A plush unicorn for 1inch's conference giveaways, taken from first sketches to production-ready 3D." },
  { id: "merch", category: "campaigns", cover: "12-merch.jpg",
    title: "1inch Merch",
    summary: "Illustrated merch for a brand that travels: a unicorn adapted to every event, and shirts people lined up for." },
  { id: "times-square", category: "campaigns", cover: "13-times-square.jpg",
    title: "1inch × Times Square",
    summary: "A full animated campaign for a Times Square billboard, designed end to end, from concept to the final motion on screen." },
  { id: "crypto-quest", category: "campaigns", cover: "14-crypto-quest.jpg",
    title: "Crypto Quest 2025",
    summary: "A year in crypto, reimagined as a retro RPG: personal stats, low-bit heroes and shareable cards for 1inch Wallet users." },
  { id: "bruce-lee", category: "campaigns", cover: "15-bruce-lee.jpg",
    title: "1inch × Bruce Lee",
    summary: "The first global 1inch campaign, made in partnership with the Bruce Lee Family Company. Art-directed on the 1inch side.",
    links: [ { label: "News", href: "https://www.adobomagazine.com/campaign-spotlight/bruce-lee-returns-to-urge-you-to-take-crypto-seriouslee-in-first-global-campaign-for-1inch-defi-platform/" },
             { label: "Cointelegraph", href: "https://cointelegraph.com/news/1inch-bruce-lee-family-defi-adoption-seriouslee-campaign", style: "outline" } ] },
  { id: "mascot", category: "campaigns", cover: "16-mascot.jpg",
    title: "1inch Mascot",
    summary: "A fast, bold unicorn who travels between worlds, changing his look in every one while staying himself." },
  { id: "aviasales", category: "campaigns", cover: "17-aviasales.jpg",
    title: "Aviasales New Year",
    summary: "A New Year campaign for Aviasales: an illustrated world inspired by hand-painted Soviet greeting cards." },

  /* ---------- AI & Tools ---------- */
  { id: "ai-workflows", category: "designops", cover: "18-ai-workflows.jpg",
    title: "AI Production Workflows",
    summary: "Custom ComfyUI pipelines and a Claude Code + MCP setup that turned AI into a reliable, on-brand production tool." },
  { id: "figma-tools", category: "designops", cover: "19-figma-tools.jpg",
    title: "Custom Figma Tools",
    summary: "AI-assisted Figma plugins that turned brand rules into tools: an ASCII image converter and an on-brand QR generator." },
  { id: "motion-automation", category: "designops", cover: "20-motion-automation.jpg",
    title: "Motion Automation",
    summary: "After Effects scripts that made animation four times faster to build and ten times lighter to ship." },
  { id: "ai-blender", category: "designops", cover: "22-ai-blender.jpg",
    title: "AI in Blender",
    summary: "LLMs connected to Blender via MCP and Python scripts: 3D scenes built from a text brief in minutes instead of hours." }
];

/* Главная, блок «This is What I Do»: категории-аккордеон и проекты в них (id из PROJECTS, порядок = порядок в списке).
   Один проект может стоять в нескольких категориях. Название пункта — homeTitle или title проекта. */
window.SKILLS = [
  { name: "Art Direction",       projects: ["bruce-lee", "rebranding-2025", "book", "aviasales", "mascot"] },
  { name: "Brand Identity",      projects: ["1inch-brand", "rebranding-2025", "rebrand-concept", "hardwallet"] },
  { name: "Product & UI",        projects: ["wallet", "dapp", "hardwallet", "gear-face", "crypto-quest"] },
  { name: "3D & Motion",         projects: ["toy", "times-square", "ai-blender", "motion-automation"] },
  { name: "Campaigns & Events",  projects: ["bruce-lee", "times-square", "defy", "nft-unicorns", "merch", "crypto-quest"] },
  { name: "Design Systems",      projects: ["1inch-brand", "dapp", "wallet"] },
  { name: "AI & Creative Tools", projects: ["figma-tools", "ai-workflows", "ai-blender", "motion-automation"] }
];

window.CONTACTS = {
  email: "vitalik06smile@gmail.com",
  showreel: "https://vimeo.com/1236877620",   // по клику, со звуком
  cv: "assets/cv/Vitalii-Menshenin-CV.pdf",   // кнопка Download CV в about
  links: [                                   // порядок = порядок в футере
    { label: "Telegram",  short: "tg", href: "https://t.me/vitamenart" },
    { label: "Twitter",   short: "x",  href: "https://x.com/vitamenart" },
    { label: "LinkedIn",  short: "in", href: "https://www.linkedin.com/in/vitamenart" },
    { label: "Instagram", short: "ig", href: "https://www.instagram.com/vitamenart" }
  ]
};
window.PAGES = {};   // наполняются из js/projects/<id>.js
