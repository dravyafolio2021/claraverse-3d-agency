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

## Publishing

The existing Vercel project is `claraverse-3d-agency`. `vercel.json` selects the Next.js framework and build output. Verify the linked project before deploying. Local documents, environment files and generated caches are excluded from uploads.

## Content and lead handling

The globe is an illustrative connected-commerce experience, not a live client-order feed. Do not publish invented results or imply direct client relationships for agency-partnership work.

The enquiry form prepares a draft for the visitor to send to `hello@claraverse.in`; it does not store or automatically deliver submissions. A production capture integration needs an approved destination and end-to-end delivery verification before claiming automatic capture.
