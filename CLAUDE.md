# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page + login for "Gym Dragón" (a gym in Venezuela). React 18 + Vite 6, plain JavaScript (JSX), plain CSS. No backend yet, no router, no test runner, no linter. All UI text, identifiers, comments and file names are in **Spanish** — keep new code consistent with that (e.g. `irA`, `alElegir`, `cerrar`, `es-activo`).

## Commands

```bash
npm install
npm run dev      # Vite dev server, opens http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built dist/
```

## Architecture

- **Navigation is hash-based, no router.** `src/App.jsx` renders `<Login />` when `location.hash === '#login'`, otherwise `<Landing />`, and on returning to the landing it scrolls to the element whose id matches the hash (`#planes`, `#entrenadores`, `#registro`, `#inicio`). Section anchors and the login view share the same hash mechanism, so new sections just need an `id`.
- **Static data lives in `src/data/gimnasio.js`** (`planes`, `entrenadores`). It stands in for a future backend. Trainer entries are placeholders flagged `ejemplo: true` (both trainer and `rutina`), which the UI shows as "Perfil de ejemplo" / "Ejemplo" badges. Optional fields drive conditional UI: `valoracion: null` hides stars, empty `whatsapp` hides the WhatsApp button.
- **Trainer photos auto-load by id**: `CarruselEntrenadores.jsx` uses `import.meta.glob('../assets/entrenadores/*.{jpg,jpeg,png,webp}')`, matching the file name to the trainer `id`. No component changes are needed to add a photo; missing photo → silhouette. See `src/assets/entrenadores/LEEME.txt` for photo specs (4:5, transparent background).
- **Auth is a stub** in `src/services/auth.js`: `MODO_DEMO = true` accepts only `DR12345678` / `Dragon2026`. Usernames are `"DR" + cédula`; `normalizarUsuario` turns input like `"dr 27.123.456"` or `"V27123456"` into `DR27123456`. The real API call (`POST /api/auth/login`) is commented out there. `Registro.jsx` only validates client-side; the intended backend flow (`POST /api/socios`, create DR user, email a password-setup link valid 24h, bcrypt) is documented in README and comments — never send the password in the email.
- **Shared Landing state**: `Landing.jsx` owns the selected `plan`/`entrenador` and passes them to the carousels and `Registro`, so choosing a plan in the carousel preselects it in the form and scrolls/focuses the form.
- **Carousels** share `src/hooks/useCarrusel.js` (scroll-snap track ref, active index via scroll measurement, arrows/dots/keyboard). `modo: 'centro'` centers the active card (plans); `modo: 'inicio'` left-aligns it (trainers).
- **`Revelar`** wraps sections for scroll-in animation via IntersectionObserver.
- **Accessibility conventions** used throughout: `prefers-reduced-motion` is checked before any smooth scroll/animation, `localStorage` access is wrapped in try/catch, carousels use `aria-roledescription`, form errors use `aria-invalid`/`aria-describedby`. Follow these patterns.

## Styling

- Plain CSS per page: `src/pages/Landing.css` (color variables at the top) and `src/pages/Login.css`. Class names use a BEM-like `gd-` prefix (`gd-plan__precio`, `gd-btn--grande`) with `es-*` state modifiers (`es-activo`, `es-solido`).
- Fonts (Saira, Barlow) come from Google Fonts in `index.html`. `public/fondo-gym-pc.jpg` is served from the root; other images are imported from `src/assets/`.
