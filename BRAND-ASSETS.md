# Technology marks

These identify the commerce and AI tools featured in the site. They do not imply endorsement or partnership. Marks belong to their respective owners.

- Shopify inverted primary logo: https://www.shopify.com/brand-assets
- ChatGPT/OpenAI blossom symbol: https://commons.wikimedia.org/wiki/File:OpenAI_logo_2025_(symbol).svg — OpenAI mark, monochrome display. Guidelines: https://openai.com/brand/
- Claude wordmark and symbol: SVG from https://claude.com/ — white wordmark on dark backgrounds, with original terracotta symbol.

`components/TechnologyLogos.tsx` supplies the shared hero and footer signature. The header uses `SiteMenu` with Work, Services, Industries, About and Insights. All assets are served locally from `public/`.

`public/shopify-bag.svg` is Shopify's official full-color shopping-bag asset, downloaded from the brand-assets page. Use this standalone symbol in the solid lime order receipt.

# Globe demonstration

`lib/order-events.ts` is the single source for the order cards, destinations, geographical endpoints and route selection. Store names and amounts are fictional demo events, explicitly labelled in the interface. Real client store activity requires a future server-side data connection.

The globe supports horizontal pointer/touch dragging, mouse vertical tilting, arrow keys, Home/reset, endpoint selection, destination buttons and play/pause. Exploring a destination or rotating pauses the feed. Mobile vertical swipes remain available for page scrolling.
