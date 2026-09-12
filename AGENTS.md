# AGENTS.md

## Commands

- `npm install` installs dependencies.
- `npm run dev` starts the Next.js development server.
- `npm run build` creates the static export in `out/`.
- `npm run preview` serves `out/` for production-style validation.
- No test script is currently configured; do not assume Jest or Vitest is available.

## Architecture

- This is a Next.js 15 App Router application configured for static export in `next.config.mjs`.
- `app/page.jsx` is the application entrypoint and mounts `components/game/Game.jsx`.
- `Game.jsx` is client-only and owns the state machine for `intro`, `pAvatar`, `pMapa`, `pNivel`, and `final`.
- All editable game content — voices, level definitions, codes, and every UI string (texts, modals, canvas, ayuda) — lives in `lib/mensajes.js` as a serializable dictionary (`MENSAJES`), with access helpers `t()`, `aviso()`, and the `Rich` renderer for `**bold**` / `` `code` `` / `\n` tokens.
- `lib/data.js` holds only logic and constants (`SEGUNDOS`, `PTS`, `BONO`, `ESTILOS`, `norm`, `rnd`, `urlAvatar`) and re-exports `VOCES`/`NIVELES` from `lib/mensajes.js` for compatibility.
- `app/styles/globals.scss` is the main Sass entry point importing 15 partials (`_variables`, `_base`, `_buttons`, etc.). Preserve `.pantalla` and `.pantalla.on` in `_screens.scss`, which control screen visibility.

## Browser-only behavior

- `lib/sfx.js`, `lib/musica.js`, and `lib/voz.js` use browser APIs and must remain client-only.
- Background music must stay at or below `0.07` volume; while Leo speaks it ducks to `0.03` and restores gradually.
- Level validation requires both a compressed evidence photo and a normalized access code.
- Image processing, audio playback, speech synthesis, canvas downloads, and game state all run in the browser.

## Assets

- Static assets belong in `public/`.
- Optional voice files use `public/voces/<id>.mp3`; missing files fall back to Spanish Speech Synthesis.
- Music uses `public/canciones/revolution.mp3` and the fallback paths defined in `lib/musica.js`.
- `public/final/jesus.png` is optional; the final screen displays a placeholder when it is absent.
- Avatars use DiceBear and must retain the initials fallback when the remote image fails.

## Documentation and safety

- `FLOWS.md` describes the five-screen navigation and level rules.
- `MESSAGES.md` documents editable voice and level content.
- `GUARDRAILS.md` describes the original game invariants; preserve them when changing behavior.
- `README.md` still describes the previous monolithic HTML version; use `package.json`, `next.config.mjs`, `app/`, `components/`, and `lib/` as the current implementation sources of truth.
- `opencode.json` contains sensitive local configuration; never expose, copy, or commit its secrets.
