# claraverse — Shopify Studio

The persistent local Next.js project for the Claraverse Shopify and Shopify Plus agency website. Initial hero source recovered from `/Users/shrutian/Downloads/claraverse-site-v1.zip`.

## Local development

```sh
npm ci --ignore-scripts
cp .env.example .env.local
npm run dev -- --port 3000
```

Add the Cora secret and publishable keys to the ignored .env.local file before starting the local preview at http://localhost:3000. Cora builds the configured GitHub branch as a static site.

## Website

- GSAP ScrollTrigger choreography: outline header wordmark, filled hero wordmark moving into place, globe rising into the center.
- Three.js geographic point-cloud globe, destination-country outlines, low surface-following order routes and matching country/order labels.
- Interactive destination selection, dragging, keyboard rotation, reset and play/pause. Reduced-motion support.
- Shopify bag monogram woven into the globe with spherical dot geometry and a low-contrast emissive impression; it rotates and occludes with the earth.
- Solid lime order receipt and shared animated card borders.
- Responsive navigation and Get Quote CTA.
- Work concept studies, services and service details, industries and industry details, about, insights and original articles, quote form.

All showcased projects are explicitly labelled concept studies. Order events in `lib/order-events.ts` are fictional demo events. No client stores are connected.

## Quote requests

The build reads the published Request a Quote schema using the Cora SDK. The browser submits to Cora with the publishable key. The server key belongs in the build environment. Preserve any historical records in the ignored `.data/quotes.jsonl` file.

## Verification

`npm run lint` checks types. Stop the development server and run `CLARAVERSE_STATIC_EXPORT=1 npm run build` to reproduce the Cora export. Verify that `out/index.html` exists before pushing.

Dependencies are locked in `package-lock.json`. The PostCSS override keeps the recovered Next.js major version on a patched compatible PostCSS version.

## Geography and marks

Country geometry: Natural Earth 1:110m administrative boundaries, from the Natural Earth vector repository, reduced to rounded outer polygon coordinates in `public/globe-land.json`. This is an illustrative geographic visualization, not a source of precise borders or addresses. Small countries may use their destination point instead of a visible outline.

Brand assets and their sources are documented in `BRAND-ASSETS.md`.

## Commerce operations direction

Claraverse is a premium ecommerce intelligence agency. Lead with commerce architecture, connected operations, integrations, automation and decision support. The hero network illustrates domestic US, European and Indian order flows, plus cross-market routes. All events are sample data.

The complete Shopify bag + S is mapped onto a curved sphere patch. The globe, heading, order summary and controls occupy separate responsive areas. Visitors can choose a market, drag the globe, play/pause and advance an order. Mobile rendering is capped at 30 fps, pixel ratio at 1.25, and rendering pauses when the globe leaves view. Reduced-motion users start with routes paused and can explicitly play them.
