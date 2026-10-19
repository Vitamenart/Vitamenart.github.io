/* Внутренняя страница «Hardwallet» — Figma: Hardwallet (272:14144).
   Кнопки (сайт ERA Wallet + X) — в js/projects.js (links). Картинки: assets/projects/hardwallet/<file>.
   .svg — анимированные SVG. */
PAGES["hardwallet"] = {
  heading: "Hardwallet",
  text: [
    "Industrial design, UI/UX and packaging for an air-gapped crypto wallet. Every touchpoint designed end to end.",
    "A cold wallet the size of a bank card: no buttons, no cables, no connection to the internet. Data moves only through QR codes and NFC, and every action happens on a 2.7″ E-Ink touchscreen. Announced by 1inch in 2023, the device later launched independently as ERA Wallet.",
    "As the sole designer on the project, I shaped the product from the object outward. I designed the device itself, from its proportions, frame and finishes to the full range of colourways, aiming for something that feels closer to a premium phone than a security gadget."
  ],
  meta: [
    { label: "Role", value: ["Industrial Design", "UI/UX", "Interaction &amp; Motion", "Type Design",
                                       "Iconography", "Packaging", "3D Visualisation"] },
    { label: "Year", value: ["2023"] }
  ],
  blocks: [
    { metrics: [
      { value: "1bit",  label: "pure B&amp;W interface" },
      { value: "100+",  label: "custom pixel icons" },
      { value: "250+",  label: "UI screens designed" },
      { value: "4.6",   label: "on Trustpilot" }
    ] },
    { full: { file: "01-devices.jpg" } },
    { full: { file: "02-screens.jpg" } },
    { full: { file: "03-colorways.jpg" } },
    { full: { file: "04-components.jpg" } },
    { statement: "Every screen was designed with security in mind. On a device that protects people’s assets, a single unclear step can cost real money, so each flow was tested and refined until every action felt clear, deliberate and impossible to misread." },
    { full: { file: "05-ui-screens.jpg" } },
    { row: [ { file: "06-keypad.jpg" },
             { title: "E-Ink panel", text: [
               "The interface was the hardest part. The E-Ink panel rendered strictly 1-bit: pure black and pure white, with no shades of grey in between. Without anti-aliasing, even a rounded corner or a diagonal line had to be built pixel by pixel, and nothing could be borrowed from standard UI practice. I designed a complete interaction system within those limits.",
               "I drew custom pixel-perfect typefaces and a dedicated icon set so every glyph lands exactly on the grid, and designed animations that work with E-Ink refresh rather than against it."
             ] } ] },
    { row: [ { file: "07-type.svg" }, { file: "08-icons.jpg" } ] },
    { statement: "The work extended to the packaging, built as a layered unboxing that introduces the device step by step." },
    { row: [ { file: "09-packaging-layers.svg" }, { file: "10-packaging.jpg" } ] },
    { title: "Concept &amp; Prototypes",
      statement: "The amount of work behind this stage was enormous. I even printed the interface on paper at 1:1 scale to test whether the on-screen keyboard would be comfortable to use in real life." },
    { row: [ { file: "11-paper-prototype.jpg" }, { file: "12-prototypes.png" } ] }
  ]
};
