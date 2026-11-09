# Agency page system

The reference was inspected on 2026-11-01: https://wecanflyagency.com/, its services index, five service categories, Shopify Plus detail page, industry page, About, Blog and Contact. The structure informed this implementation: category-specific introduction, benefits, detailed capability, process, relevant work, questions and a project conversation. Claraverse uses original copy, existing artwork, its own facts and its established interface.

## Routes

| Area | Routes | Content |
| --- | --- | --- |
| Service directory | `/services` | Five disciplines and links to all 23 individual services |
| Service hubs | `/services/[slug]` | Five category stories, capabilities, process, relevant concept and FAQ |
| Specific services | `/services/[slug]/[offering]` | 23 dedicated pages, each with specific signals, deliverables and discovery inputs |
| Industry directory | `/industries` | Four sector-specific entries |
| Industry details | `/industries/[slug]` | Four complete sector stories: context, concepts where available, interactive journeys, solutions, services, delivery and sector FAQs |
| Studio | `/about` | Reference-led studio story, owner-supplied metrics, six principles, three process phases, four specialisms and engagement options |
| Editorial | `/insights`, `/insights/[slug]` | Featured note, topic/search filters, three original articles, takeaways and related capabilities |
| Conversation | `/quote`, `/contact` | Published Cora quote form with service context |
| Questions | `/faq` | The existing agency FAQ in a dedicated page |
| Discovery | `/sitemap.xml` | Canonical public page catalogue |

The static site uses canonical page paths and retains service category hash anchors. Contact uses the quote page as its canonical URL. The shared footer links to the primary destinations, service hubs and sectors.

## Content and truthfulness

No competitor clients, case-study results, team headcounts, certification badges, addresses, staff identities or biographies are copied. Related work uses the clearly labelled Claraverse concepts. The About counters use owner-supplied 24+ projects, 92% satisfaction and four years of experience, alongside the four industry specialisms confirmed on 2026-11-01.

Enquiries use the published Cora quote form and submit to the workspace. No public podcast, career listing, policy or account-specific tool is fabricated to fill an unsupported content slot.

## Components and data

- `Interior.tsx`: hero, section title, operating flow, benefits, process, concept preview and final CTA.
- `ServicePages.tsx`: service directory, category and specific-service composition.
- `service-pages.ts`: 23 specific briefs and five category directions.
- `IndustryPages.tsx` / `industry-pages.ts`: four editorial sector stories, specific requirements and explicit cross-links.
- `IndustryJourney.tsx` / `IndustryMotion.tsx`: accessible customer/operation exploration and scoped decorative parallax; see `docs/industry-stories.md`.
- `PageFAQ.tsx`: native disclosure answers with scoped layout refresh.
- `InsightsIndex.tsx` / `editorial.ts`: topic/search selection, actual text-based reading estimates and article direction.
- `ContactContent.tsx`: shared quote/contact content and a build-time Cora form schema.
- `AboutPage.tsx`, `AboutPageMotion.tsx` / `studio-story.ts`: the reference-led studio page; see `docs/about-story.md`.

Most page content is server-rendered. Interactive filters, FAQ refresh, existing counters and the enquiry form are small client components. All new visuals reuse the existing lightweight sculptures and portfolio WebP sheets. No added WebGL scene, remote tracking or video is required.

Mobile uses stacked content, readable input text, 44px or larger controls, bounded visuals and normal page scrolling. No new sticky chapter navigation is introduced. The existing olive header, hero docking and bento Works pages are retained.

## Validation

The production build succeeds. `scripts/check-page-catalog.mjs` validates the 23 briefs, category/industry mappings and editorial data. Existing service catalog, navigation contrast and header visibility checks remain available.

`docs/audits/page-coverage-2026-11-01.json` records the production HTTP audit: 53 public pages; valid internal links, fragments and ARIA controls; one h1 and unique IDs per page; 30 correct specific-service enquiry preselection combinations; expected 404s and rejection of a mismatched service/offering submission without saving it.

These are compilation, data and HTTP checks. Live visual, filter interaction, hover and touch review were unavailable in this session.

## Current focus

The owner confirmed exclusive focus on Beauty, Fashion, Wellness and Petcare on 2026-11-01. Unrelated home, coffee, audio and outdoor concepts are retained as drafts in the content source, omitted from public collections and the sitemap. Beauty and Fashion remain the two public concepts; Wellness and Petcare pages do not invent client proof.
