/* Внутренняя страница «AI Production Workflows» — по скриншоту.
   Картинки: assets/projects/ai-workflows/<file>. Блок 04 — до/после с ползунком (плохое / хорошее качество). */
PAGES["ai-workflows"] = {
  heading: "AI Production<br>Workflows",
  text: [
    "Off-the-shelf AI tools were too unpredictable for a brand to rely on. I built my own ComfyUI workflows for image restoration, upscaling and on-brand visuals, and connected Claude Code via MCP to our Figma design system.",
    "The result: less manual work, faster turnaround, and content that stays on-brand by default."
  ],
  meta: [
    { label: "Role", value: ["Workflow Design", "AI Pipelines"] }
  ],
  blocks: [
    { full: { file: "01-claude-design-system.jpg" } },
    { statement: "Using Claude Code connected via MCP to our Figma design system, I set up a workflow where AI worked directly with real brand tokens: colours, typography and UI components. Presentations and landing pages were generated on top of the actual design system, so every output stayed on-brand by default rather than being fixed afterwards." },
    { full: { file: "02-claude-mcp.jpg" } },
    { statement: "I designed my own ComfyUI pipelines for production tasks. Photo restoration: a custom pipeline that rebuilds low-quality images, such as video frames and screenshots, without altering people’s faces. This turned unusable material into assets ready for marketing." },
    { full: { file: "03-figma-weavy.jpg" } },
    { statement: "Executive portraits: a complete workflow for generating consistent, on-brand imagery of company leadership." },
    { compare: { before: "04-portrait-before.jpg", after: "04-portrait-after.jpg" } },
    { full: { file: "05-comfyui-upscale.jpg" } },
    { full: { file: "06-comfyui-lora.jpg" } }
  ]
};
