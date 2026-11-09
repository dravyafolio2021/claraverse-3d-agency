# Portfolio stories

Every `/work/[slug]` route uses `ProjectStory`, with project-specific narrative in `lib/project-stories.ts`. The public collection contains the Beauty and Fashion concepts. Four unrelated drafts are retained in the source but hidden from public routes and collections. Client identities, deployed technology, project timelines, quotes and commercial results are not invented.

## Story sequence

1. Project identity, concept status and scope, followed by a photographic storefront composition.
2. The brief: customer question, context, approach and intended shift.
3. The decisions: a visual direction board and three design rationales.
4. The experience: four selectable customer moments in an illustrative storefront preview.
5. The operation: a proposed relationship map tailored to the project.
6. The next step: validation questions, the guiding idea and a project enquiry link.
7. A visual next-project link, wrapping to the first concept after the last.

There is no chapter menu, sticky subnavigation or reading-progress bar. Existing section IDs remain available for deep links. The shared header tucks away while reading down.

## Responsive presentation

Mobile and desktop share the story order, with tighter editorial spacing and bounded visual compositions. Phone openings show relevant scope before the concept note. Secondary metadata remains in the desktop view. Body text stays readable while padding, unnecessary labels and decorative navigation are reduced.

`ProjectJourney` uses a slim four-step selector with at least 44px tap targets. On phones, the selected content precedes the supporting image so that changes appear near the tapped control. Desktop pairs image and content. Decorative browser details are omitted on phones, and fixed empty content heights are removed. The preview is labelled illustrative and is not a live shop.

## Interaction and motion

Journey tabs support touch, clicks, Left/Right, Home and End. One tab is in the keyboard sequence; its focusable panel is labelled and updated when selected. Decorative frames and imagery contain no fake interactive actions.

`ProjectStoryMotion` owns three-percent photo parallax. Its GSAP matchMedia context is scoped and cleaned up. A project-slug key resets motion and journey state between routes. Reduced-motion preferences disable parallax and transitions while explicit tab selection remains available. No nested scrolling viewport, pinned story section or scroll capture is introduced.

## Real case-study replacement

Replace concepts with approved project assets and narrative. Add execution evidence and attributable outcomes only when supplied. Current validation questions describe what would be tested, not measured results; the proposed operation is not a claim of a deployed integration.

## Performance and checks

Photos reuse the existing two WebP sheets. Frames, palette specimens and the relationship map are HTML/CSS, with no additional model or video. Most narrative renders on the server; journey selection and parallax are client components.

Build and served-markup checks cover routes, heading hierarchy, removed chapter controls, tab relationships and next-project links. Browser appearance, touch behaviour and perceived motion smoothness require live review when browser access is available.
