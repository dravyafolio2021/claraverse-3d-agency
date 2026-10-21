# Claraverse

The Claraverse marketing site, built with Next.js App Router, React, TypeScript and Three.js.

## Local development

Use Node.js 22, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run build`, then `npm start`.

## Structure

- `app/`: homepage, service routes, approach, insights, privacy and enquiry pages; metadata, sitemap and robots.
- `components/commerce-experience.tsx`: scroll choreography and accessible globe controls.
- `components/hero-scene.tsx`: lazy-loaded Three.js globe.
- `components/site-header.tsx` and `site-footer.tsx`: shared navigation.
- `components/service-template.tsx`: consistent service-page layout.
- `lib/services.ts`: service copy and delivery scope.
- `lib/markets.ts` and `components/market-context.tsx`: regional examples with a visitor override.
- `components/contact-form.tsx`: local enquiry-brief preparation.
- `app/globals.css`: shared design tokens, layouts and responsive styles.

## Repository and preview

Use this checkout at `/Users/shrutian/Desktop/Claraverse`. It retains the existing Git history and `origin` repository: `https://github.com/dravyafolio2021/claraverse-3d-agency`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for branches, commits, checks and preview conventions. Current globe work lives on `feat/continuous-commerce-globe`. Pull requests run the quality workflow; development stays local unless publication is requested.

## Continuous commerce globe

The hero opens with an oversized earth that contracts to the centre on scroll. Its orientation is independent of scroll and survives pause, zoom and pointer interaction. One persistent rotation state replaces competing globe/camera rotation.

The illustrative network has 36 geographic nodes and 42 routes, with frequent domestic traffic, longer cross-market journeys, tapered moving trails and pulses on arrival. Shared geography keeps dots and trails on the same spherical coordinates. The Shopify bag sits in the scene background. No order cards or labels cover the earth.

The Natural Earth geography asset was reused from the earlier local Claraverse hero. `lib/commerce-network.ts` owns the sample locations and routes. The network is generated locally and does not fetch real orders.

## Content and lead handling

The globe is an illustrative connected-commerce experience, not a live client-order feed. Do not publish invented results or imply direct client relationships for agency-partnership work.

The enquiry form prepares a draft for the visitor to send to `hello@claraverse.in`; it does not store or automatically deliver submissions. A production capture integration needs an approved destination and end-to-end delivery verification before claiming automatic capture.
