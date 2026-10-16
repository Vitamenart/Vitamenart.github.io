/* Внутренняя страница «Custom Figma Tools» — по скриншоту.
   Картинки: assets/projects/figma-tools/<file>. .svg — анимированный SVG. */
PAGES["figma-tools"] = {
  heading: "Custom Figma Tools",
  text: [
    "During the 1inch rebrand in 2025, I started building my own Figma plugins instead of waiting for tools that didn’t exist. Using AI to write and adapt the code, I turned brand rules into working instruments, so designers could produce on-brand assets in seconds rather than hours, with no third-party services involved. Built specifically around the 1inch identity, the plugins were never meant for public release. Instead, they were shared internally and used across the design team."
  ],
  meta: [],
  blocks: [
    { full: { file: "01-ascii-plugin.svg" } },
    { title: "ASCII Plugin", statement: "The new 1inch identity leaned on ASCII-style imagery, but no existing tool could produce it the way the brand needed. I built a plugin that converts any image into ASCII art and outputs it as clean, editable vectors directly inside Figma. A wide set of controls covers character sets, density, contrast, scale and more, so the result can be tuned to match the brand style exactly and stays fully editable afterwards." },
    { row: [ { file: "02-qr-plugin.jpg" }, { file: "03-qr-unicorn.jpg" } ] },
    { title: "QR Code Plugin", statement: "A QR generator that runs entirely inside Figma, with no external services and no tracking links. Beyond the standard settings, including error correction levels, it lets you change the shape and structure of the modules to match the brand’s illustration style. The result is a QR code that sits naturally inside flyers, posters and merch as part of the design." }
  ]
};
