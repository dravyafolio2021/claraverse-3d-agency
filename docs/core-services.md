# Shopify service system

The user-supplied service references now define five areas and 23 offerings:

| Area | Offerings | Route |
| --- | ---: | --- |
| Development | 8 | /services/development |
| Design | 3 | /services/design |
| Integrations | 3 | /services/integrations |
| Migration | 4 | /services/migration |
| Growth | 5 | /services/growth |

`lib/services.ts` owns the category names, business-focused descriptions, offering slugs and descriptions, artwork assignments, delivery steps and compatibility aliases. Homepage scenes, the header menu, services directory, detail pages, enquiry choices and API validation all use this catalog.

## Homepage experience

The homepage uses a cinematic, scroll-driven service selector. Five large service names sit over changing sculpture backgrounds. Scrolling advances the service, hovering previews it, and clicking selects it and seeks its scroll interval on desktop. Each scene has a short business-focused description and links to its category page and the complete directory. All 23 offerings remain available on the directory and category pages.

Narrow and short viewports use normal document flow and tap-to-select without a pinned spacer. Reduced motion disables automatic scene changes and animation while keeping explicit selection available. Native tab semantics and keyboard navigation accompany pointer interactions. See `docs/service-cinema.md` for motion, layout and verification details.

## Pages and enquiry routing

The directory lists 23 offerings under five areas, each with a dedicated page and enquiry link. Service and offering query parameters provide context beside the published Cora form. Visitors can include the named capability in their project details.

The static export serves canonical page paths. Legacy service slugs still resolve in enquiry query parameters, and category anchors remain available on the canonical service pages.

## Artwork and verification

The existing five selected sculptures are preserved. Optimised 720px transparent WebP copies live beside the PNG originals in `public/services/`; the homepage only mounts the open chapter's lazy-loaded artwork. No new WebGL renderer or external dependency was added.

Run `node --experimental-strip-types scripts/check-service-catalog.mjs` for catalog completeness, category/offering pairing, compatibility aliases and artwork checks. Run `npm run lint` and `CLARAVERSE_STATIC_EXPORT=1 npm run build` for type/build verification. The original performance report remains a historical snapshot; its HTTP audit script now recognises the five-area catalog and writes to a separate latest report by default.

Browser visual and interaction checks are unavailable in this session. Code, static HTML, route and enquiry-selection checks do not establish observed mobile layout, animation smoothness or browser performance.

## Dedicated pages

Each catalogue offering now has a real `/services/[category]/[offering]` route. Category pages retain their offering IDs for existing hash links, while the directory links directly to the dedicated detail pages. The full page map, shared components and reference notes are documented in `docs/agency-pages.md`.
