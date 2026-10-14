# JUNKBOT

A playable third-person scavenging game built with Three.js, JavaScript ES modules, and Vite. Unit 07 explores a rusted city, collects salvage, discovers blueprints, and crafts modules to reach its abandoned archive. The orange robot, scrap towers, neon signage, floating reactor, warm light, atmospheric dust, puddles, and bloom take their visual direction from the supplied reference. All models, textures, and sounds are original and generated in code; no external asset downloads or services are used at runtime.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local URL Vite prints (normally http://localhost:5173). After dependencies are installed, development and production run offline. Use `npm run build` then `npm run preview` to serve the production build. ES modules require a local HTTP server; opening index.html as a file will not work.

On Windows, you can also double-click `Run-Junkbot.cmd` after installing dependencies.

## Play

At the workshop, choose **Prepare expedition** and launch into the Rustlands. Walk to glowing piles and press E to collect. Cyan data terminals unlock recipes. Return to the green extraction ring near the starting area and press E to return home. The workshop repairs all damage and recharges your battery. Crafting automatically equips permanent modules. Destinations and the logbook are workshop tabs.

Progression: craft cargo expansion → reach Copperworks; discover the scanner blueprint in the Rustlands → craft a scanner → collect buried quantum cores; discover the cutter blueprint in Copperworks → craft the cutter → reach Furnace District → interact with the archive at its far end → return home.

Each expedition refreshes finite piles. Cargo is shared across expeditions and capacity is 30 items before upgrades. If a pile exceeds free space, only the quantity that fits is collected and its remainder stays in the world. Emergency recovery preserves cargo when durability reaches zero. Recovery can also be called from the pause panel. No combat is required.

## Controls

| Input | Action |
| --- | --- |
| WASD | Move relative to camera |
| Mouse drag | Orbit camera |
| Shift | Sprint; consumes rechargeable charge |
| Space | Jump |
| E | Collect, download blueprint, use station, extract, restore archive |
| Tab | Cargo and installed modules |
| B | Open workshop while home |
| Esc | Pause / close panel |
| Touch joystick | Move |
| Swipe scene | Orbit camera |
| Touch buttons | Jump, interact, cargo |

The music-note button toggles procedural ambient audio. Audio begins after user interaction. Panels pause the simulation. Switching tabs or losing focus pauses the game.

## Recipes

| Module | Materials | Discovery / prerequisite | Effect |
| --- | --- | --- | --- |
| Cargo expansion | 8 metal, 3 wire | Available initially | +20 cargo; Copperworks unlock |
| Long-life battery | 6 metal, 3 battery cells | Available initially | Sprint uses 45% less charge |
| Servo boosters | 10 metal, 4 parts, 3 wire | Rustlands terminal; battery | +30% movement speed |
| Reinforced shell | 12 metal, 4 parts | Available initially | +50 durability; 35% damage reduction |
| Salvage scanner | 6 wire, 3 battery cells, 3 parts | Rustlands terminal; cargo expansion | Reveals hidden cores in every zone |
| Plasma cutter | 15 metal, 5 wire, 2 cores | Copperworks terminal; scanner | Furnace District unlock |

Electrical fields pulse and can be jumped. Sentries detect within 6 meters and chase at 2.7 m/s (normal movement is 4.1 m/s). Rotating machinery damages only along its sweeping arm. Copperworks and Furnace District have unstable plates that wobble for half a second before dropping after 1.1 seconds. Damage has a 1.3-second cooldown. The workshop is hazard-free.

## Saving

Versioned localStorage key: `junkbot.save.v1`. Inventory, discoveries, installed upgrades, unlocked districts, completion, and recent expedition history save after meaningful actions and before leaving. Reload starts safely at the workshop with full durability. Temporary enemies, position, damage, and depleted piles are intentionally not persisted. Malformed or incompatible saves recover to a new state; unknown items are rejected and quantities validated. Storage failures show a notice. To reset intentionally, remove this key in your browser’s developer tools.

## Development and checks

```sh
npm test
npm run build
npx playwright test
```

Architecture: `items.js` defines resources, recipes, and zones; `inventory.js` validates transactions; `persistence.js` validates saves; `world.js` builds procedural environments; `player.js` handles motion, collisions, and animation; `camera.js` follows the player; `threats.js` controls enemies and hazards; `ui.js` renders panels and HUD; `audio.js` synthesizes sound; `main.js` connects the game loop and input. Scrap towers use instancing, materials are shared, render resolution is capped, and shadows cover the gameplay corridor. Node tests cover inventory and progression; browser tests cover actual keyboard/touch interaction, rendering, extraction, and reload behavior.

Browser tests use installed Google Chrome at its standard Windows location. Set `JUNKBOT_BROWSER` to another Chromium executable path if needed. Touch tests use real emulated touch events through Chrome DevTools Protocol. The test inspection API exposes read-only snapshots and does not provide gameplay cheats.

This first release uses compact procedural environments and stylized geometry; it follows the reference’s art direction rather than reproducing its pre-rendered photographic detail. It requires WebGL and modern browsers. All game assets are original; Three.js is MIT licensed and Vite is MIT licensed (their dependency licenses are included in installed packages).
