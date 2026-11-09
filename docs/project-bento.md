# Project bento

`ProjectBento` follows `Capabilities` on the homepage, before reviews and FAQ. It supplements the existing folder portfolio rather than replacing it. The Works route also renders this same component with `variant="page"`, so both views share card markup, scenes, device compositions, responsive layout and motion.

The page variant supplies a single `Featured Stores` h1, h2 project titles, page-specific spacing and a `Discuss your project` link to `/quote`. The homepage keeps its existing h2/h3 hierarchy and collection link to `/work`. Section and description IDs are distinct between variants. Works has no separate bordered PageIntro or duplicate grid.

## Content

The section reuses the current public concept selection from `lib/site-content.ts`, and the image assignments and creative directions from `lib/portfolio-content.ts`. Each tile links to its existing `/work/[slug]` page. The heading and project names use the shared guided-reading `Heading` component.

No delivered client work, locations or performance metrics have been supplied for this grid. The section therefore identifies its content as concept previews in the introduction, on every tile and in the closing note. Do not change these labels to delivered projects until the content is replaced with confirmed client work.

## Composition

- Current two-project desktop selection: a seven/five-column pair.
- Current tablet selection: two equal columns.
- Phone: the two public concepts stacked in reading order.

The lead card presents a CSS storefront/laptop composition. Home/living and audio concepts add phone and tablet compositions. The remaining cards use full photographic scenes. The frames are decorative and contain no additional controls; the whole tile is one named link. Titles, sectors and quiet text actions remain over a dark scrim. The shared homepage spacing separates the section and its introduction from adjacent content.

## Motion and loading

GSAP moves each photographic layer only three percent in either direction as the card passes through the viewport. Hover adds a small photo scale change. All motion is disabled with reduced-motion preferences. Animation and ScrollTrigger instances are owned by a scoped matchMedia context and cleaned up on unmount.

No new image files or renderers are added. The six scenes share the two existing WebP sheets already used by the folder portfolio. The new device frames are HTML/CSS, so they do not require models, video or a separate image transformation.

## Verification limits

Build/type checks and HTTP checks establish valid compilation, section order, links and served styles. They do not verify real browser appearance or touch/scroll smoothness; review those in the running preview.

The owner requested the unrelated home, coffee, audio and outdoor concepts be hidden on 2026-11-01. The folder choices are centred as a two-column selection and the bento fills its row without empty columns. Existing larger-collection rules remain available when more approved, relevant concepts are supplied.
