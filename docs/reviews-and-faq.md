# Client reviews and FAQ

The homepage order after Services is project bento → client reviews → FAQ → footer. Both new sections share the existing spacing tokens, near-black/olive/lime palette and guided-reading display headings.

## Reviews

`lib/client-reviews.ts` contains three layout slots. No real client review text, attribution, star rating, logo or headshot has been supplied. Every slot is therefore empty and marked `approved: false`; the preview explicitly says that approved quotes and attribution will follow. Placeholder content is not rendered as a testimonial blockquote.

To add an actual review, provide its quote, name, company, optional role and permission to publish, then set `approved: true`. `isApprovedReview` also requires non-empty quote/name/company fields. If any approved reviews exist, only those appear; incomplete preview slots are excluded. No Review/AggregateRating structured data is emitted.

The featured panel has category selection and previous/next buttons with 44px touch targets. Only user actions change the review; there is no auto-advance. Changes are announced politely, animations respect reduced motion, and the layout stacks on phones. There are no external assets or new dependencies.

## FAQ

`lib/home-faqs.ts` owns eight questions and answers covering scope, existing Shopify stores, migration, integrations, B2B/international work, timings/budget, ongoing care and getting started. Links use the existing service and enquiry routes. Copy makes no fixed-price, delivery-time, support-SLA or performance guarantees.

Native `details`/`summary` elements provide keyboard and no-JavaScript operation. The shared `name` groups disclosures in supporting browsers; the first answer is open initially. Older browsers can still open more than one answer. A small client handler schedules one ScrollTrigger refresh after toggles to keep later heading positions correct. Display headings use `Heading`; question headings remain stable inside native summary controls.

## Verification

Type/build, catalog/content and HTTP checks can verify compilation, section ordering, placeholder state, native disclosure markup and destination routes. Actual browser layout, screen-reader behaviour and scroll feel require visual/interaction review in the preview browser.
