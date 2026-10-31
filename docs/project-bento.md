# Project bento

`ProjectBento` follows `Capabilities` and precedes the footer in `HomeSections`. It supplements the existing folder portfolio rather than replacing it.

## Content

The section reuses the six existing concept projects from `lib/site-content.ts`, and the image assignments and creative directions from `lib/portfolio-content.ts`. Each tile links to its existing `/work/[slug]` page. The heading and project names use the shared guided-reading `Heading` component.

No delivered client work, locations or performance metrics have been supplied for this grid. The section therefore identifies its content as concept previews in the introduction, on every tile and in the closing note. Do not change these labels to delivered projects until the content is replaced with confirmed client work.

## Composition

- Wide desktop: one full-width feature, a seven/five-column pair, then three four-column tiles.
- Tablet: a wide feature, two pairs, and a final wide tile.
- Phone: six full-width cards in reading order.

The lead card presents a CSS storefront/laptop composition. Home/living and audio concepts add phone and tablet compositions. The remaining cards use full photographic scenes. The frames are decorative and contain no additional controls; the whole tile is one named link. Titles, sectors and quiet text actions remain over a dark scrim. The shared homepage spacing separates the section and its introduction from adjacent content.

## Motion and loading

GSAP moves each photographic layer only three percent in either direction as the card passes through the viewport. Hover adds a small photo scale change. All motion is disabled with reduced-motion preferences. Animation and ScrollTrigger instances are owned by a scoped matchMedia context and cleaned up on unmount.

No new image files or renderers are added. The six scenes share the two existing WebP sheets already used by the folder portfolio. The new device frames are HTML/CSS, so they do not require models, video or a separate image transformation.

## Verification limits

Build/type checks and HTTP checks establish valid compilation, section order, links and served styles. They do not verify real browser appearance or touch/scroll smoothness; review those in the running preview.
