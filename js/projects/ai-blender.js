/* Внутренняя страница «AI in Blender» — по скриншоту.
   Картинки: assets/projects/ai-blender/<file>. .webm — анимации (автоплей, без звука, по кругу). */
PAGES["ai-blender"] = {
  heading: "AI in Blender",
  text: [
    "I connect LLMs to Blender via MCP and Python scripts to build scenes from a text brief. It turns hours of setup into minutes: blocking out a draft scene, automating routine tasks, and building 3D layouts that serve as motion control for AI video generation."
  ],
  meta: [],
  blocks: [
    { row: [ { file: "01-neuron-blender.jpg" }, { file: "02-neuron-render.jpg" } ] },
    { statement: "On Apple’s iPhone Duo launch day, we showed our website running on the new device. To make it in time, I built a fully functional 3D model with Claude and Blender MCP: the screen texture bends along the fold, with parallax as the device opens." },
    { row: [ { file: "03-duo-blender.jpg" }, { video: "duo.webm", play: "auto" } ] },
    { statement: "A few more projects made with AI in the loop." },
    { row: [ { file: "04-map-nodes.jpg" }, { file: "05-spider-web.jpg" } ] },
    { row: [ { video: "window.webm", play: "auto" }, { file: "06-interior-nodes.jpg" } ] }
  ]
};
