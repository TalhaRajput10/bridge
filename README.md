# BRIDGE CST

**Every great support interaction builds a bridge.**

BRIDGE CST (BRIDGE Customer Support Training) is a free, interactive career platform for aspiring and early-career customer support professionals. Built in Pakistan with a global outlook, it combines 64 concise Journey Cards, realistic Practice Labs, interview preparation, progress tracking, and eight skill collections in a responsive React experience.

## Core experience

- Eight learning collections and 64 Journey Cards
- Practical scenarios, model answers, and saved Practice Lab responses
- Completion progress and device-based learning streaks
- Supabase email authentication
- Responsive desktop and mobile layouts
- Accessible keyboard navigation, visible focus states, and reduced-motion support

## Technology

- React 19
- React Router
- Vite
- Supabase authentication
- Plain CSS design system
- Cloudflare deployment

## Local development

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite.

## Quality checks

```powershell
npm.cmd run lint
npm.cmd run build
```

## Environment variables

Create `.env.local` and provide the public Supabase project values used by `src/lib/supabase.js`:

```text
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Never commit private service-role keys.

## Project structure

```text
src/
  components/     Shared navigation and Journey Card components
  context/        Authentication session context
  data/           Curriculum, resources, examples, and card content
  lib/            External client configuration
  pages/          Route-level views
  utils/          Practice Lab evaluation helpers
  BridgeRevamp.css Approved cross-page visual system
```

The presentation layer is intentionally separate from curriculum data and authentication. UI work should not mutate files in `src/data`, `src/context`, or `src/lib` unless a feature explicitly requires a data or backend change.

See [docs/BRIDGE_UI_SYSTEM.md](docs/BRIDGE_UI_SYSTEM.md) for the approved visual language and responsive rules.

## Product ownership

BRIDGE CST is an original concept and product led by Talha Rajput. AI tools, including ChatGPT/Codex, have been used as implementation and production assistants; product direction, audience, content strategy, and core ideas remain the creator's.
