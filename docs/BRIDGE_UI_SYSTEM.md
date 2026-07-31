# BRIDGE UI System

This document records the approved July 2026 interface direction. It is the visual source of truth for the Homepage, Authentication, Collection, Journey Card stack, and full Journey Card lesson.

## Experience principles

1. **Calm, not gamified.** Progress should feel motivating without neon, badges everywhere, or gaming-style effects.
2. **Premium but practical.** Editorial typography and cinematic imagery must coexist with clear controls and readable content.
3. **The bridge has meaning.** Journey Cards visually complete the gap between the bridge sides. It is a product metaphor, not decorative stock imagery.
4. **Content remains approachable.** Beginner content uses plain language, short reading widths, and predictable section order.
5. **One system everywhere.** Authentication, Collections, Resources, and lessons share the same night palette and spacing rhythm.

## Design tokens

| Token | Value | Use |
|---|---:|---|
| Night | `#06111F` | Page background |
| Deep navy | `#0A1C31` | Panels and inputs |
| Raised surface | `#10283E` | Cards and lesson callouts |
| Border | `#24445E` | Quiet dividers |
| Strong border | `#315C78` | Interactive and raised surfaces |
| Bridge blue | `#2D78B7` | Primary actions |
| Ice blue | `#8DBAD3` | Secondary accents |
| White | `#F2F7FA` | Primary text |
| Muted copy | `#9FB2C2` | Body and supporting copy |
| Success green | `#55B88A` | Completion and progress only |

The runtime variables live in `src/BridgeRevamp.css` and use the `--br-*` prefix.

## Typography

- Display: Bricolage Grotesque, light-to-regular weights
- Interface and body: Inter
- Headings use tight tracking but must not exceed the approved responsive clamps.
- Avoid all-bold pages. Weight creates hierarchy only when used selectively.

## Shape and depth

- Standard radius: 6–10px
- Avoid pill-shaped containers except status metadata where necessary.
- Shadows are reserved for the Journey Card deck and authentication panel.
- Borders and surface contrast should establish most hierarchy.

## Screen rules

### Homepage

- Hero uses the shared `public/bridge-night-hero.png` asset.
- Exactly eight interactive Journey Cards span the bridge.
- Desktop keeps the card arc to the right of the hero copy.
- Mobile keeps all eight cards visible in a compact row.
- The learning path, Continue Learning, and streak modules follow immediately after the hero.

### Authentication

- Desktop uses a two-column story/form composition.
- Mobile stacks the brand story above the form.
- Authentication logic remains in `AuthPage.jsx`, `AuthContext.jsx`, and Supabase—not in styling components.

### Collection

- Desktop centers the card deck between Collection Overview and Your Journey panels.
- The eight-collection module bar is horizontally scrollable when space is limited.
- Mobile hides supporting side panels and keeps the deck centered.

### Journey Card stack

- Four cards are visible to communicate depth.
- Pointer movement supplies restrained 3D tilt; touch gestures move between cards.
- Previous/Next controls remain available for accessibility.

### Journey Card lesson

- Hero is compact and uses the same bridge background.
- Desktop uses a sticky outline and a focused reading column.
- Mobile converts the outline into a horizontal scroller.
- Practice Labs remain dark, readable, and visually consistent with the lesson.

## Responsive breakpoints

- `1180px`: supporting Collection index may collapse.
- `900px`: primary navigation simplifies; layouts become single-column.
- `620px`: compact mobile cards, buttons, typography, and form spacing.

No viewport should introduce horizontal page overflow. Internal navigation rails may scroll horizontally when required.

## Backend boundary

The visual revamp must not change:

- Supabase client credentials or authentication calls
- `AuthContext` session behavior
- Curriculum records in `src/data`
- Practice Lab local-storage keys
- Completion local-storage keys
- Route paths

Future account syncing should replace the storage adapter behind these interfaces rather than coupling Supabase queries directly to visual components.
