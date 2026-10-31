# Shopify service system

The user-supplied service references now define five areas and 30 offerings:

| Area | Offerings | Route |
| --- | ---: | --- |
| Development | 9 | /services/development |
| Design | 3 | /services/design |
| Integrations | 7 | /services/integrations |
| Migration | 5 | /services/migration |
| Growth | 6 | /services/growth |

`lib/services.ts` owns the category names, business-focused descriptions, offering slugs and descriptions, artwork assignments, delivery steps and compatibility aliases. Homepage scenes, the header menu, services directory, detail pages, enquiry choices and API validation all use this catalog.

## Homepage experience

The homepage uses a cinematic, scroll-driven service selector. Five large service names sit over changing sculpture backgrounds. Scrolling advances the service, hovering previews it, and clicking selects it and seeks its scroll interval on desktop. Each scene has a short business-focused description and links to its category page and the complete directory. All 30 offerings remain available on the directory and category pages.

Narrow and short viewports use normal document flow and tap-to-select without a pinned spacer. Reduced motion disables automatic scene changes and animation while keeping explicit selection available. Native tab semantics and keyboard navigation accompany pointer interactions. See `docs/service-cinema.md` for motion, layout and verification details.

## Pages and enquiry routing

The directory lists all 30 offerings under their five areas. Every offering has a stable section anchor, a plain-language description and a specific enquiry link. Enquiry links include both `service` and `offering`. Changing the category clears a previously selected offering. The API rejects an offering that does not belong to its category and saves valid selections in the existing local JSONL record. This does not send email or create a CRM lead.

Older service pages redirect permanently:

- shopify-plus → development
- experience-design → design
- replatforming → migration
- international-b2b → development (B2B is listed here; expansion consulting is under Growth)
- performance → growth

The integrations URL remains unchanged. Old enquiry category values are also normalised through the same aliases.

## Artwork and verification

The existing five selected sculptures are preserved. Optimised 720px transparent WebP copies live beside the PNG originals in `public/services/`; the homepage only mounts the open chapter's lazy-loaded artwork. No new WebGL renderer or external dependency was added.

Run `node --experimental-strip-types scripts/check-service-catalog.mjs` for catalog completeness, category/offering pairing, compatibility aliases and artwork checks. Run `npm run lint` and `CLARAVERSE_BUILD_DIR=.next-check npm run build` for type/build verification. The original performance report remains a historical snapshot; its HTTP audit script now recognises the five-area catalog and writes to a separate latest report by default.

Browser visual and interaction checks are unavailable in this session. Code, static HTML, route and enquiry-selection checks do not establish observed mobile layout, animation smoothness or browser performance.
