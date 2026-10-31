# Claraverse local website

This is the persistent Next.js project for the complete Claraverse agency website.

- Continue developing this checkout; do not generate separate section downloads or replacement projects.
- Keep the local development server running between iterations. Reuse http://localhost:3000 and its preview tab when available.
- Run `npm run dev -- --port 3000` to start the server if it is stopped.
- Do not deploy or register hosting unless the user explicitly requests it.
- Preserve lowercase Unbounded at weights 400–500, the near-black/acid-lime palette, the supporting descriptor `Shopify Studio`, and the CSS favicon.
- Preserve the Three.js globe, animated demo order routes, and the scroll transition of the wordmark into the sticky header.
- Keep `Shopify Studio` beneath the hero wordmark and beneath the header wordmark after scrolling.
- Reuse `TechnologyLogos` for Shopify, ChatGPT, and Claude across relevant body sections. Keep these logos out of the header; the header uses Work, Services, Industries, About and Insights navigation.
- Keep the order receipt solid acid-lime with dark text and the standalone Shopify shopping-bag icon; do not restore transparent backgrounds or the full Shopify wordmark in this card.
- Keep globe interactions (drag, destination selection, pause/play and reset) synchronized with `lib/order-events.ts`; explain routes as store-to-customer orders.
- Order events are demonstration data. Keep them identified as demo activity.
- Continue the complete site in this checkout: homepage, Work concepts, Services, Industries, About, Insights, and Quote. The menu must link to real pages. Do not invent client projects, testimonials, certifications, or performance results.
- Verify changes using TypeScript and browser checks appropriate to the change. Keep dependency resolution in package-lock.json.

The initial source was recovered from `/Users/shrutian/Downloads/claraverse-site-v1.zip` on 2026-10-20.

- Keep outline and filled header wordmarks in the exact same grid cell. The hero docks into that position, then a scroll-driven liquid edge fills the outline from bottom to top. Keep Get Quote at the right edge.
- Use GSAP with scoped cleanup and reduced-motion support. Keep order routes close to the globe, country labels tied to the actual destination coordinates, and Natural Earth geometry in public/globe-land.json.
- Quote requests are saved in ignored .data/quotes.jsonl during local development. Do not claim email delivery or CRM integration.

- The globe includes the complete official Shopify bag + S asset on a curved spherical surface. Preserve its true silhouette, horizon occlusion and rotation; never replace it with random points or a flat overlay.
- Position Claraverse as a premium ecommerce intelligence agency: commerce architecture, operations, integrations, automation and decision support. Storefront development is one part of the operation.
- Keep headings, globe, order journey and market controls in separate bounded areas. Mobile uses a compact order summary below the globe.
- The illustrative network spans domestic US, European and Indian routes plus cross-market routes. Keep market selection, play/pause and next-order controls accessible; do not imply these sample nodes are live clients.
