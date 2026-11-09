# Industry stories

Built on 2026-11-01 for the four confirmed specialisms: Beauty, Fashion, Wellness and Petcare.

## Reference and adaptation

Inspected https://wecanflyagency.com/industries/beauty and https://wecanflyagency.com/industries/fashion. Their sequence informs the pages: sector introduction, relevant work, business needs, solutions, relevant services, a project conversation, implementation and questions. Claraverse uses original copy, its own olive/near-black/lime system, and the existing shared word-by-word reading headings.

No competitor prose, client identities, project results, team biographies, partner certification claims or platform adoption statistics are reproduced. The 24+ projects, 92% satisfaction and four years refer to the studio as a whole and are labelled accordingly. Ritual and Form remain clearly labelled concepts. Wellness and Petcare do not display invented case studies.

## Composition

- Industry hero: sector-specific heading, business introduction, enquiry link and bounded existing artwork.
- Perspective: the sector's buying decisions and operating context.
- Relevant concept: Ritual for Beauty, Form for Fashion; omitted for the other sectors.
- Studio facts: sourced from `studio-metrics.ts`, explicitly agency-wide.
- Opportunities: three sector-specific priorities.
- Interactive journey: Discover, Understand, Choose and Return. Each exposes the customer experience, the operating responsibility and the connection between them.
- Solutions: four open editorial rows, with original sector-specific requirements.
- Expertise: four direct service links with sector-specific context.
- Conversation: a clear studio enquiry without a fictional staff profile.
- Delivery: four practical stages and sector-specific handover considerations.
- Questions: five distinct FAQs per sector.
- Other industries: links to the remaining three specialisms, then a closing enquiry.

The `/industries` directory uses the same visual directions and links to all four stories. Titles, descriptions and canonical URLs are sector-specific.

## Interaction and performance

`IndustryJourney` is a small client component receiving only the current page's four steps. It uses native buttons with tab semantics, arrow/Home/End navigation, one labelled panel and visible focus. Content and links outside the interaction remain server-rendered.

`IndustryMotion` owns a scoped GSAP context. Only decorative hero artwork moves slightly, only above 760px, and only without reduced-motion preference. Copy is never pinned or displaced. Match-media changes and unmount revert the animation. Phones use the normal document scroll, stacked perspectives and a compact four-button journey selector; no chapter menu or nested scrolling is introduced.

All art references are existing local portfolio WebP sheets or existing sculpture WebPs. No newly generated imagery is included, per the owner's request. No new image library, WebGL scene, video, remote font or dependency is added.

## Verification boundary

Run the production build and page catalog checks; validate all four pages over HTTP, including headings, unique IDs, tab controls, image references and service destinations. These checks do not establish live visual or touch verification. Browser automation remains unavailable in this session.
