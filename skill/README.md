# BB AI Design-Kit Skills — shareable (masterclass) edition

A set of four Claude skills for building website design kits with Beaver Builder AI (BB AI).
These are the vanilla, fork-friendly versions: no client data, no private hosting or
infrastructure, no personal identifiers. Fork them, adapt them, make them your own.

## What's in the set

The three design skills form a pipeline, with a fourth that governs the copy:

1. **bb-design-brief** — Turn a folder of raw client materials into a portable, kit-ready
   design brief (a distilled brief plus carried-through assets and a paste-ready prompt).
   Stops at the brief; it doesn't design anything.
2. **bb-design-kit-creator** — The builder. Design, deslop and audit a complete design kit
   (a design system plus seed pages) that imports into WordPress as a BB AI design system.
   Carries the house de-slop rules, a creative-direction engine that pushes every kit to
   look different, a neutral starter kit, and a mechanical audit script.
3. **add-bb-design-kit-page** — Add a new page to a site that already has a kit deployed,
   reusing the live design system so the new page matches everything else.
4. **content-deslop-engine** — A content-only pass that makes copy read like a person wrote
   it. `bb-design-kit-creator` and `add-bb-design-kit-page` call it to de-slop page copy.

## They work as a set

The skills reference each other, so distribute them together:

- `add-bb-design-kit-page` and `bb-design-brief` both point back to `bb-design-kit-creator`
  as the builder.
- `add-bb-design-kit-page` uses `content-deslop-engine` for copy.

## Installing

Each `.skill` file is a zip of the skill folder (a `SKILL.md` plus its `references/`,
`assets/` and `scripts/`). Add them the same way you add any Claude skill — import the
`.skill` file, or unzip the folder into your skills directory — then the skill triggers
from its description.

## Forking notes

- `bb-design-kit-creator` ships a **neutral** starter kit: every colour is a `#TODO` and
  every font is a `TODO` placeholder. Nothing about the look is baked in — the point is
  that no two kits should come out looking the same. The type scale, spacing, radii and
  container width in the starter are a starting point to diverge from, not a house constant.
- The house de-slop rules are opinions, not laws. Keep the ones that help; change the rest.
- `scripts/audit_kit.py` is a standalone Python checker (`python3 audit_kit.py <kit-folder>`)
  with no third-party dependencies. Point it at any folder of HTML/CSS.
